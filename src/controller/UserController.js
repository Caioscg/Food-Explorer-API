const AppError = require("../utils/AppError")

class UserController {
    async create(req, res) {
        const { name, email, password } = req.body

        if (!name) throw new AppError("O nome é obrigatório!")

        if (!email) throw new AppError("O email é obrigatório!")

        if (!password) throw new AppError("A senha é obrigatória!")

        return res.status(201).json()
    }
}

module.exports = UserController;