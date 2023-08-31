const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");

router
  .route("/:reviewId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.route("/").get(controller.list);

module.exports = router;
