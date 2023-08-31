const express = require("express")
const router = express.Router()
const controller = require("./movies.controller")
const reviewsRouter = require("../reviews/reviews.router")
const theatersRouter = require("../theaters/theaters.router")

router.use("/:movieId/reviews", reviewsRouter)
router.use("/:movieId/theaters", theatersRouter)

router.route("/:movieId")
    .get(controller.read)

router.route("/")
    .get(controller.list);

module.exports = router