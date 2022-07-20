import knex from 'knex';

export const knexSQLite = knex({
    client: 'sqlite3',
    connection: {
        filename: "./src/DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
});
