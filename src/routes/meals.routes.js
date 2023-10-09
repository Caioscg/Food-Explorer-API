const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/uploads")

const MealsController = require("../controller/MealsController")
const MealsAvatarController = require("../controller/MealsAvatarController")
const ensureAuth = require("../middlewares/ensureAuth")

const mealsController = new MealsController()
const mealsAvatarController = new MealsAvatarController()

const mealsRoutes = Router()

const upload = multer(uploadConfig.MULTER)

mealsRoutes.post("/", ensureAuth, mealsController.create)
mealsRoutes.put("/:id", ensureAuth, mealsController.update)
mealsRoutes.delete("/:id", ensureAuth, mealsController.delete)
mealsRoutes.get("/:id", mealsController.show)
mealsRoutes.get("/", mealsController.index)
mealsRoutes.patch("/avatar/:meal_id", ensureAuth, upload.single("avatar"), mealsAvatarController.update)

module.exports = mealsRoutes