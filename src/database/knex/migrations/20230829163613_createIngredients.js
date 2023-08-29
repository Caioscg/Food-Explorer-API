//TODO arq criado com 'npx knex migrate:make createIngredients' (precisa do migrations criado corretamente no knexfile)
exports.up = knex => knex.schema.createTable("ingredients", table => {
    table.increments("id")
    table.integer("note_id").references("id").inTable("meals").onDelete("CASCADE") //! se deletar o pedido, os pratos vinculadas ao id do pedido tmb é deletado
    table.text("name").notNullable()
})

exports.down = knex => knex.schema.dropTable("ingredients")
