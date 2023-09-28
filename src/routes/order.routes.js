const { Router } = require("express")

const OrderController = require("../controller/OrderController")
const orderController = new OrderController()

const orderRoutes = Router()

orderRoutes.post("/:user_id", orderController.create)

module.exports = orderRoutes