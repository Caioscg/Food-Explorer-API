const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class MealsAvatarController {  // usa as funções do DiskStorage para salvar a nova foto e deletar a antiga
    async update(req, res) {
        const { meal_id } = req.params
        const avatarFilename = req.file.filename
        
        const diskStorage = new DiskStorage()

        const meal = await knex("meals").where({ id: meal_id }).first()

        if(!meal) {
            throw new AppError("Prato não encontrado!", 401)
        }
        console.log(meal.avatar)
        if(meal.avatar) {
            await diskStorage.deleteFile(meal.avatar)
        }
        
        const filename = await diskStorage.saveFile(avatarFilename)
        meal.avatar = filename

        await knex("meals").update(meal).where({ id: meal_id })

        return res.json(meal)
    }

    /*async delete(res, req) {
        //const { meal_id } = req.params
        console.log("oi")
        const diskStorage = new DiskStorage()
        
        const meal = await knex("meals").where({ id: 10 }).first()
        
        if(!meal) {
            throw new AppError("Prato não encontrado!", 401)
        }
        await diskStorage.deleteFile(meal.avatar)

        meal.avatar = null

        await knex("meals").where({ id: 10 }).delete()
        return res.json(meal)
    }*/
}

module.exports = MealsAvatarController