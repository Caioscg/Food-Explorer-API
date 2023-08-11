const { Router } = require("express")

const OrderController = require("../controller/OrderController")
const orderController = new OrderController()


const orderRoutes = Router()

orderRoutes.post("/", orderController.create)

module.exports = orderRoutes