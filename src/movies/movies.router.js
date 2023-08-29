const express = require("express")
const router = express.Router()
const controller = require("./movies.controller")

router.route("/")
    .get(controller.list);

module.exports = router