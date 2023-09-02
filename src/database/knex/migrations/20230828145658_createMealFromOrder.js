//TODO arq criado com 'npx knex migrate:make createMealFromOrder' (precisa do migrations criado corretamente no knexfile)
exports.up = knex => knex.schema.createTable("mealsfromorder", table => {
    table.increments("id")
    table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE") //! se deletar o pedido, os pratos vinculadas ao id do pedido tmb é deletado
    table.integer("user_id").references("id").inTable("users")
    table.text("name").notNullable()
})

exports.down = knex => knex.schema.dropTable("mealsfromorder")
