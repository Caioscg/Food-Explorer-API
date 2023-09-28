const { Router } = require("express")

const MealsController = require("../controller/MealsController")
const ensureAuth = require("../middlewares/ensureAuth")

const mealsController = new MealsController()

const mealsRoutes = Router()

mealsRoutes.post("/", ensureAuth, mealsController.create)
mealsRoutes.put("/:id", ensureAuth, mealsController.update)
mealsRoutes.delete("/:id", ensureAuth, mealsController.delete)
mealsRoutes.get("/:id", mealsController.show)
mealsRoutes.get("/", mealsController.index)
mealsRoutes.patch("/:meal_id", ensureAuth, mealsController.user_update)

module.exports = mealsRoutes