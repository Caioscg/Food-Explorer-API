const { Router } = require("express")

const userRoutes = require("./user.routes")
const orderRoutes = require("./order.routes")
const mealsRoutes = require("./meals.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/order", orderRoutes)
routes.use("/meals", mealsRoutes)

module.exports = routes