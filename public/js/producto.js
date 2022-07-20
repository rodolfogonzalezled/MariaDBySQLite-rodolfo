
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const foto = document.getElementById("foto");
const descripcion = document.getElementById("descripcion");
const codigo = document.getElementById("codigo");
const stock = document.getElementById("stock");
let modificacion = null;

function guardarProducto(e) {
    e.preventDefault();

    let product = {
        nombre: nombre.value,
        precio: precio.value,
        foto: foto.value,
        descripcion: descripcion.value,
        codigo: codigo.value,
        stock: stock.value
    };

    if (modificacion) {
        fetch(`/api/productos/${modificacion}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => socket.emit("buscarProducto"))
            .catch(error => console.error('Error:', error));
    } else {
        fetch('/api/productos/', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => socket.emit("buscarProducto"))
            .catch(error => console.error('Error:', error));
    }

    nombre.value = "";
    precio.value = "";
    foto.value = "";
    descripcion.value = "";
    codigo.value = "";
    stock.value = "";
    modificacion = null;
    return false;
}

function borrarProducto(id) {
    fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => socket.emit("buscarProducto"))
        .catch(error => console.error('Error:', error));
}

function modificarProducto(id) {
    obtenerProductoPorId(id)
    .then(producto => {
        if (producto) {
            nombre.value = producto.nombre ? producto.nombre : '';
            precio.value = producto.precio ? producto.precio : '';
            foto.value = producto.foto ? producto.foto : '';
            descripcion.value = producto.descripcion ? producto.descripcion : '';
            codigo.value = producto.codigo ? producto.codigo : '';
            stock.value = producto.stock ? producto.stock : '';
            modificacion = id;
        }
    })
    .catch(error => console.error('Error:', error));
}

async function obtenerProductoPorId(id) {
    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error)
    }
}

socket.on("productos", (productos) => {
    if (productos.length > 0) {
        document.getElementById('sinProductos').style.display = 'none';
    } else {
        document.getElementById('sinProductos').style.display = 'block';
    }
    let contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = '';
    productos.map((producto) => {
        let divContenedor = document.createElement("div");
        divContenedor.classList.add("col-md-6", "col-lg-4");
        divContenedor.innerHTML = `
            <div class="card products">
                <img class="products__img" src=${producto.foto} alt=${producto.nombre}>
                <div class="card-body products__info">
                    <h4 class="card-title">${producto.nombre}</h4>
                    <div class="card-text">
                        <p><b>Precio:</b> $ ${producto.precio}</p>
                        <p><b>Descripción:</b> ${producto.descripcion}</p>
                        <p><b>Código:</b> ${producto.codigo}</p>
                        <p><b>Stock:</b> ${producto.stock}</p>
                    </div>
                    <div class="d-flex justify-content-between col-11 mx-auto">
                        <a><i id="btnAgregarCarrito${producto.id}" class="bi bi-cart-plus btn btn-secondary"></i></a>
                        <a><i id="btnBorrarProducto${producto.id}" class="bi bi-trash btn btn-secondary"></i></a>
                        <a href="#agregar"><i id="btnModificarProducto${producto.id}" class="bi bi-pencil btn btn-secondary"></i></a>
                    </div>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(divContenedor);

        let btnAgregarCarrito = document.getElementById(`btnAgregarCarrito${producto.id}`);
        btnAgregarCarrito.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        });

        let btnBorrarProducto = document.getElementById(`btnBorrarProducto${producto.id}`);
        btnBorrarProducto.addEventListener('click', () => {
            borrarProducto(producto.id)
        });

        let btnModificarProducto = document.getElementById(`btnModificarProducto${producto.id}`);
        btnModificarProducto.addEventListener('click', () => {
            modificarProducto(producto.id)
        });
    });
});