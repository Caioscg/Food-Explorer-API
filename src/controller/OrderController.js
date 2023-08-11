const AppError = require("../utils/AppError")

class OrderController {
    async create(req, res) {
        const { meal, amount } = req.body


        return res.status(201).json()
    }
}

module.exports = OrderController;