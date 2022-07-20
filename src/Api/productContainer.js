import * as fs from 'fs';

const fsPromises = fs.promises;

export default class ProductContainer {
    constructor(name) {
        this.name = `./src/db/filesystem/${name}.json`;
    }

    async add(product) {
        let products = await this.getAll();
        let newId;

        if (products.length) {
            newId = products[products.length - 1].id + 1;
        } else {
            newId = 1;
        }

        try {
            let productAdded = { id: newId, timestamp: new Date(Date.now()).toLocaleString(), ...product };
            products.push(productAdded);
            await fsPromises.writeFile(this.name, JSON.stringify(products, null, 2));
            return newId;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        let products = await this.getAll();
        let product = products.find(product => product.id == id);
        return product ?? { error: "Producto no encontrado" };
    }

    async getAll() {
        try {
            let products = await fsPromises.readFile(this.name, 'utf8');
            if (products) {
                return JSON.parse(products);
            }
        } catch (error) {
            console.log(error)
        }
        return [];
    }

    async deleteById(id) {
        let products = await this.getAll();

        if (products.find(product => product.id == id)) {
            products = products.filter(product => product.id != id);
            try {
                await fsPromises.writeFile(this.name, JSON.stringify(products, null, 2));
            } catch (error) {
                console.log(error);
            }
        } else {
            return { error: "Producto no encontrado" };
        }
    }

    async put(id, productToUpdate) {
        let products = await this.getAll();
        let productUpdate;

        if (products.find(product => product.id == id)) {
            products.map(product => {
                if (product.id == id) {
                    product.timestamp = productToUpdate.timestamp;
                    product.nombre = productToUpdate.nombre;
                    product.descripcion = productToUpdate.descripcion;
                    product.codigo = productToUpdate.codigo;
                    product.foto = productToUpdate.foto;
                    product.precio = productToUpdate.precio;
                    product.stock = productToUpdate.stock;
                    productUpdate = product;
                }
            })
            try {
                await fsPromises.writeFile(this.name, JSON.stringify(products, null, 2))
                return productUpdate;
            } catch (error) {
                console.log(error);
            }
        } else {
            return { error: "Producto no encontrado" };
        }
    }
}