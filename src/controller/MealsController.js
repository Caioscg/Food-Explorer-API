const AppError = require("../utils/AppError")

class MealsController {
    async create(req, res) {
        const { name, category, ingredients, price, description } = req.body

        if (!name) throw new AppError("O nome é obrigatório!")

        const [ checkIfMealExists ] = await knex("meals").where({ name })

        if (checkIfMealExists.ingredients = ingredients) {
            throw new AppError("Este prato já foi criado!")
        }

        if (!category) throw new AppError("Adicione uma categoria ao prato!")

        if (!ingredients) throw new AppError("Os ingredientes são obrigatórios!")

        if (!price) throw new AppError("O preço é obrigatório!")

        if (!description) throw new AppError("Adicione uma descrição ao prato!")

        return res.status(201).json()
    }

    async update(req, res) {
        const { name, category, ingredients, price, description } = req.body 
    }
}

module.exports = MealsController;