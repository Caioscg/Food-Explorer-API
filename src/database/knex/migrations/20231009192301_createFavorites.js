//TODO arq criado com 'npx knex migrate:make createMeal' (precisa do migrations criado corretamente no knexfile)
//! cria tabelas de forma automatizada
exports.up = knex => knex.schema.createTable("favorites", table => {
    table.increments("id")
    table.bool("favorite").nullable()
    table.integer("user_id").references("id").inTable("users")
    table.integer("meal_id").references("id").inTable("meals")
})

exports.down = knex => knex.schema.dropTable("favorites")


//TODO 'npx knex migrate:latest' para criar a table
//TODO após criar o atalho no package.json é só rodar npm run migrate