const { Router } = require("express")

const MealsController = require("../controller/MealsController")
const mealsController = new MealsController()


const mealsRoutes = Router()

mealsRoutes.post("/", mealsController.create)

module.exports = mealsRoutes