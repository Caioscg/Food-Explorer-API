const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class MealsController {
    async create(req, res) {
        const { name, category, ingredients, price, description } = req.body

        if (!name) throw new AppError("O nome é obrigatório!")
        
        if (!category) throw new AppError("Adicione uma categoria ao prato!")
        
        if (!ingredients) throw new AppError("Os ingredientes são obrigatórios!")
        
        if (!price) throw new AppError("O preço é obrigatório!")
        
        if (!description) throw new AppError("Adicione uma descrição ao prato!")
        
        /*const [ checkIfMealExists ] = await knex("meals").where({ name })

        if (checkIfMealExists && checkIfMealExists.ingredients == ingredients) {
            throw new AppError("Este prato já foi criado!")
        }*/

        const [meal_id] = await knex("meals").insert({
            name,
            category,
            price,
            description
        })

        if (ingredients.length > 0) {
            const ingredientsInsert = ingredients.map(ingredient => {   //**? Tabela link recebendo o note_id e o url = link
                return {                                                //**! created_at e id ele cria por contra própria
                    meal_id,
                    name: ingredient
                }
            })
    
            await knex("ingredients").insert(ingredientsInsert)
        }

        //await knex("meals").insert({name, category, ingredients, price, description})

        return res.status(201).json()
    }

    async update(req, res) {
        const { name, category, ingredients, price, description } = req.body 
    }

    async delete(req, res) {

    }
}

module.exports = MealsController;