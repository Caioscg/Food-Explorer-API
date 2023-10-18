const AppError = require("../utils/AppError")
const knex = require("../database/knex")

class FavoritesController {
    async create(req, res) {
        const { meal_id } = req.params
        const user_id = req.user.id

        await knex("favorites").insert({
            favorite: true,
            meal_id,
            user_id
        })

        return res.status(201).json()
    }

    async delete(req, res) {
        const { meal_id } = req.params
        const user_id = req.user.id

        await knex("favorites").where({ meal_id, user_id }).delete()

        return res.status(201).json()
    }
}

module.exports = FavoritesController