const AppError = require("../utils/AppError")

class MealsController {
    async create(req, res) {
        const { name, category, ingredients, price, description } = req.body


        return res.status(201).json()
    }
}

module.exports = MealsController;