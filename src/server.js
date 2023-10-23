require("express-async-errors")
require("dotenv/config")

const express = require("express")
const cors = require("cors") // npm install cors

const database = require("./database/sqlite")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/uploads")

const routes = require("./routes")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

database() // roda o database (se for 1a vez, ele cria)

app.use(( error, req, res, next ) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))