# Desafio Base de Datos - MariaDB y SQLite3 - eCommerce Backend #

## _Autor: Rodolfo Gonzalez - Curso: Backend_

- Se implemento un servidor basado en plataforma Node.js y modulo express. Donde se presenta un canal de websocket que permite representar por debajo del formulario de ingreso de productos, una lista de productos agregados en tiempo real. Al agregar un producto permite crear un archivo de persistencia.

```
Se presentan la ruta:
'api/productos'' 
```

# Para su prueba en front:
1.	Clonar el repositorio ( git clone https://github.com/rodolfogonzalezled/backend-pre-entrega-rodolfo.git)
2.	Obtener node_modules ( npm install )
    - Para la vista se aplico el motor de plantilla EJS (npm install ejs)
    - Se instala los modulos via npm:
        - npm init -y
        - npm install express socket.io
        - npm install knex mysql
        - npm install knex sqlite3
3.	Iniciar la app desde la terminal en la carpeta del proyecto a revisar. ( node server.js )
4.	El proyecto se ejecutará en el navegador en ( http://localhost:9090 )
5.  Para usar la base de datos de MariaDB debe estar previamente creada una base de datos llamada: ecommerce
6.  Al iniciar el 'server.js' en caso de que no existan las tablas 'productos' y 'mensajes' se crean automaticamente.   


# Vistas:
- Formulario para cargar un producto, listar productos y centro de mensajes.


# Para su prueba en Postman:
- Para crear un producto la estructura es la siguiente:
```{
    "nombre": "",
    "descripcion": "",
    "codigo": "",
    "foto": "",
    "precio": "",
    "stock": ""
}
```

#### Nota: "En la carpeta Middleware se creo el archivo isAdmin.js donde se creo una variable booleana 'administrador', si la variable no es true, no va a dejar entrar a las rutas para ejecutar los metodos post, put y delete".