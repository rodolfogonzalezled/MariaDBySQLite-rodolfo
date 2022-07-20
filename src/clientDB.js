export default class ClientDB {
    constructor(knex, nameTable) {
        this.knex = knex;
        this.nameTable = nameTable;
    };

    async add(elementos) {
        try {
            return await this.knex(this.nameTable).insert(elementos);
        } catch (error) {
            console.log(error);
        }
    };

    async getAll() {
        try {
            return await this.knex(this.nameTable).select('*');
        } catch (error) {
            console.log(error);
        }
    };

    async getById(id) {
        try {
            let result = await this.knex(this.nameTable).select('*').where('id', id);
            return  result.length > 0 ? result[0] : { error: 'elemento no encontrado' };
        } catch (error) {
            console.log(error);
        }
    };

    async deleteById(id) {
        try {
            return await this.knex.from(this.nameTable).where('id', id).del() == 0 && { error: 'elemento no encontrado' };
        } catch (error) {
            console.log(error);
        }
    };

    async updateStock(stock, id) {
        try {
            return await this.knex.from(this.nameTable).where('id', id).update({ stock: stock });
        } catch (error) {
            console.log(error);
        }
    };

    async put(id, elemento) {
        try {
            return await this.knex.from(this.nameTable).where('id', id).update({
                nombre: elemento.nombre,
                descripcion: elemento.descripcion,
                codigo: elemento.codigo,
                foto: elemento.foto,
                precio: elemento.precio,
                stock: elemento.stock
            }) == 0 && { error: 'elemento no encontrado' };
        } catch (error) {
            console.log(error);
        }
    };

    async deleteByAutor(autor) {
        try {
            return await this.knex.from(this.nameTable).where('autor', autor).del();
        } catch (error) {
            console.log(error);
        }
    };

    async close() {
        await this.knex.destroy();
    };
};
