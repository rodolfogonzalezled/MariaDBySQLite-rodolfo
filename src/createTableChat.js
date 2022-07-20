export const createTableChat = async (knex, nameTable) => {
    try {
        return await knex.schema.createTableIfNotExists(nameTable, table => {
            table.increments('id').primary();
            table.string('autor', 50).notNullable();
            table.timestamp('timestamp').defaultTo(knex.fn.now()).notNullable();
            table.string('mensaje', 255).notNullable();
        });
    } catch (error) {
        console.log(error);
    }
};