exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id")
    table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE") //! se deletar o prato, os pratos vinculadas ao id do pedido tmb é deletado
    table.text("name").notNullable()
})

exports.down = knex => knex.schema.dropTable("ingredients")
