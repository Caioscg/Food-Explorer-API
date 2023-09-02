class OrderController {
    async create(req, res) {
        const { meals } = req.body


        return res.status(201).json(meals.length) // inicialmente, só a quantidade de pratos importa
    }
}

module.exports = OrderController;