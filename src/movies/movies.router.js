const express = require("express")
const router = express.Router()
const controller = require("./movies.controller")

router.route("/:movieId")
    .get(controller.read)

router.route("/")
    .get(controller.list);

module.exports = router