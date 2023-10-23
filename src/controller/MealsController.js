const AppError = require("../utils/AppError")
const knex = require("../database/knex")

const DiskStorage = require("../providers/DiskStorage")

class MealsController {
    async create(req, res) {
        
        const { name, category, ingredients, price, description } = req.body

        if (!name) throw new AppError("O nome é obrigatório!")
        
        if (!category) throw new AppError("Adicione uma categoria ao prato!")
        
        if (!ingredients) throw new AppError("Os ingredientes são obrigatórios!")
        
        if (!price) throw new AppError("O preço é obrigatório!")
        
        if (!description) throw new AppError("Adicione uma descrição ao prato!")

        const [checkIfMealExists] = await knex("meals").where({ name })
        
        if (checkIfMealExists) {
            throw new AppError("Erro! Este prato já foi criado!")
        }

        const [meal_id] = await knex("meals").insert({
            name,
            category,
            price,
            description
        })

        if (ingredients.length > 0) {
            const ingredientsInsert = ingredients.map(ingredient => {
                return {
                    meal_id,
                    name: ingredient
                }
            })
            
            await knex("ingredients").insert(ingredientsInsert)
        }
        
        return res.status(201).json()
    }

    async update(req, res) {
        const { name, category, ingredients, price, description } = req.body
        const { id } = req.params
        
        const [ meal ] = await knex("meals").where({ id })

        if (!meal) {
            throw new AppError("Prato não encontrado!")
        }

        if (name) {
            const [checkIfMealExists] = await knex("meals").where({ name })

            if (checkIfMealExists && checkIfMealExists.id != id) {
                throw new AppError("Erro! Este prato já foi criado!")
            }
        }

        meal.name = name ?? meal.name
        meal.category = category ?? meal.category
        meal.price = price ?? meal.price
        meal.description = description ?? meal.description

        await knex("meals")
        .where({ id })
        .update({
            name,
            category,
            price,
            description
        })

        const checkIngredients = await knex("ingredients").select("meal_id","name").where({ meal_id: id })

        if (ingredients.length > 0) {
            const ingredientsUpdate = ingredients.map(ingredient => {
                return {
                    meal_id: Number(id),
                    name: ingredient
                }
            })

            if (JSON.stringify(checkIngredients) === JSON.stringify(ingredientsUpdate)) {
                return res.status(201).json()
            }
            else {
                await knex("ingredients").where({ meal_id: id }).delete()
                await knex("ingredients").insert(ingredientsUpdate)
                return res.status(201).json()
            }
        }
    }

    async delete(req, res) {
        const { id } = req.params
        const diskStorage = new DiskStorage()

        const meal = await knex("meals").where({ id }).first()
        await diskStorage.deleteFile(meal.avatar)
        
        await knex("meals").where({ id }).delete()

        return res.json()
    }

    async show(req, res) {
        const { id } = req.params

        const meal = await knex("meals").where({ id }).first()
        const ingredients = await knex("ingredients").where({ meal_id: id }).orderBy("id")

        return res.json({
            ...meal,
            ingredients
        })
    }

    async index(req, res) {
        let { name } = req.query
            
        const mealsByIngredients = await knex("ingredients")
            .select([
                "meals.id",
                "meals.name",
                "meals.category",
                "meals.price",
                "meals.description",
                "meals.avatar"
            ])
            .whereLike("ingredients.name", `%${name}%`)       // busca por ingredientes
            .innerJoin("meals", "meals.id", "ingredients.meal_id") // une as tabelas
            .groupBy("meals.id")    // não repete
            .orderBy("meals.name")  // ordem alfabética


        const mealsByName = await knex("meals")
            .whereLike("name", `%${name}%`)
            .orderBy("name")
            
        const concatMeals = mealsByIngredients.concat(mealsByName)

        const meals_id = concatMeals.map(meal => (
            meal.id
        ))

        const noRepMeals = meals_id.filter((este, i) => meals_id.indexOf(este) === i)
        
        const meals = concatMeals.filter((meal, index) => (
            meal.id == noRepMeals[index]
            ))

        const ingredientsList = await knex("ingredients")
        const mealsWithIngredients = meals.map(meal => {
            const mealIngredients = ingredientsList.filter(ing => ing.meal_id === meal.id)

            return {
                ...meal,
                ingredients: mealIngredients
            }
        })

        return res.json(mealsWithIngredients)
    }
}

module.exports = MealsController;