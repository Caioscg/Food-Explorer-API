const { Router } = require("express")

const MealsController = require("../controller/MealsController")
const mealsController = new MealsController()


const mealsRoutes = Router()

mealsRoutes.post("/", mealsController.create)
mealsRoutes.put("/:id", mealsController.update)
mealsRoutes.delete("/:id", mealsController.delete)
mealsRoutes.get("/:id", mealsController.show)
mealsRoutes.get("/", mealsController.index)

module.exports = mealsRoutes