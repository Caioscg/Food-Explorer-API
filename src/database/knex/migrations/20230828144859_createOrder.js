//TODO arq criado com 'npx knex migrate:make createOrder' (precisa do migrations criado corretamente no knexfile)
//! cria tabelas de forma automatizada
exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("id")
    table.integer("user_id").references("id").inTable("users")
    
    table.timestamp("create_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("orders")


//TODO 'npx knex migrate:latest' para criar a table
//TODO após criar o atalho no package.json é só rodar npm run migrate