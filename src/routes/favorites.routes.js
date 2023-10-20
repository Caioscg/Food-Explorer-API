const { Router } = require("express")

const FavoritesController = require("../controller/FavoritesController")

const ensureAuth = require("../middlewares/ensureAuth")

const favoritesController = new FavoritesController()

const favoritesRoutes = Router()

favoritesRoutes.post("/:meal_id", ensureAuth, favoritesController.create)
favoritesRoutes.delete("/:meal_id", ensureAuth, favoritesController.delete)
favoritesRoutes.get("/", ensureAuth, favoritesController.index)

module.exports = favoritesRoutes