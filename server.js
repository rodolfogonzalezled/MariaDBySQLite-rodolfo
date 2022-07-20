import express from 'express';
// import ProductContainer from './src/Api/productContainer.js'; // fileSystem
import { createServer } from "http";
import { Server } from "socket.io";
import { isAdmin } from './src/middlewares/isAdmin.js';
import ClientDB from './src/clientDB.js';
import { knexMariaDB } from './src/Config/mariaDB.js';
import { createTableChat } from './src/createTableChat.js';
import { knexSQLite } from './src/Config/mySqlite3.js';
import { createTableProducts } from './src/createTableProducts.js';

const NAME_TABLE_PRODUCTS = 'productos';
const NAME_TABLE_CHAT = 'mensajes';
createTableProducts(knexMariaDB, NAME_TABLE_PRODUCTS);
createTableChat(knexSQLite, NAME_TABLE_CHAT);

const app = express()
const router = express.Router()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use('/api', router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))               // con http://localhost:8080/
// app.use('/static', express.static('public')) // con http://localhost:8080/static/

app.set("views", "./public/views");
app.set("view engine", "ejs");

// --- Conexión del Servidor ------------------------------------------------------------
const PORT = 9090;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
});
connectedServer.on("error", error => console.log(`Error en servidor ${error}`));

// ----- WEBSOCKETS ----------------------------------------------------------------------

// const products = new ProductContainer("productos"); // fileSystem
const products = new ClientDB(knexMariaDB, NAME_TABLE_PRODUCTS);
const chat = new ClientDB(knexSQLite, NAME_TABLE_CHAT);

app.get("/", (req, res) => {
    res.render("pages/index");
});

io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado ${socket.id}`);
    socket.emit("productos", await products.getAll());
    socket.on('buscarProducto', async () => {
        socket.emit("productos", await products.getAll());
    });

    socket.emit("mensajes", await chat.getAll());
    socket.on('mensajeNuevo', async data => {
        chat.add(data);
        socket.emit("mensajes", await chat.getAll());
    });

    socket.on("borrarMensajes", async (autor) => {
        chat.deleteByAutor(autor);
        socket.emit("mensajes", await chat.getAll());
    });
});

// -----Api de Productos -----------------------------------------------------------

router.get('/productos/', async (req, res) => {
    res.json(await products.getAll());
});

router.get('/productos/:id?', isAdmin, async (req, res) => {
    res.json(await products.getById(req.params.id));
});

router.post('/productos', isAdmin, async (req, res) => {
    res.json({ id: await products.add(req.body) });
});

router.put('/productos/:id', isAdmin, async (req, res) => {
    let result = await products.put(req.params.id, req.body);
    result ? res.json(result) : res.sendStatus(200);
});

router.delete('/productos/:id', isAdmin, async (req, res) => {
    let result = await products.deleteById(req.params.id);
    result ? res.json(result) : res.sendStatus(200);
});