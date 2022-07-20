export const createTableProducts = async (knex, nameTable) => {
    try {
        return await knex.schema.createTableIfNotExists(nameTable, table => {
            table.increments('id').primary();
            table.timestamp('timestamp').defaultTo(knex.fn.now()).notNullable();
            table.string('nombre', 100).notNullable();
            table.string('descripcion', 255).notNullable();
            table.string('codigo', 10).notNullable();
            table.string('foto', 500).notNullable();
            table.float('precio').notNullable();
            table.integer('stock').notNullable();
        });
    } catch (error) {
        console.log(error);
    }
};