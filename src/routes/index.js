const { Router } = require("express")

const userRoutes = require("./user.routes")
const orderRoutes = require("./order.routes")
const mealsRoutes = require("./meals.routes")
const favoritesRoutes = require("./favorites.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/orders", orderRoutes)
routes.use("/meals", mealsRoutes)
routes.use("/favorites", favoritesRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes