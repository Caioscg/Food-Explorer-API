const AppError = require("../utils/AppError")
const knex = require("../database/knex")
const { hash } = require("bcryptjs")

class UserController {
    async create(req, res) {
        const { name, email, password, is_admin } = req.body

        if (!name) throw new AppError("O nome é obrigatório!")

        if (!email) throw new AppError("O email é obrigatório!")

        if (!password) throw new AppError("A senha é obrigatória!")

        const [ checkIfUserExists ] = await knex("users").where({ email })

        if (checkIfUserExists) {
            throw new AppError("Este e-mail já está em uso!")
        }

        const hashedPassword = await hash(password, 8)

        await knex("users").insert({name, email, password: hashedPassword, is_admin})

        return res.status(201).json()
    }
}

module.exports = UserController;