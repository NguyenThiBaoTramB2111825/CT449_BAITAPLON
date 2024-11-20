const express = require("express");
const publishingController = require("../controllers/publishing.controller");

// const TokenMiddleware = require("../middlewares/token.middleware");
// const { checkAll, checkPrivacy, checkAdmin } = new TokenMiddleware();

//const PublishingMiddleware = require("../middlewares/publishing.middleware")
//const publishingMiddleware = new PublishingMiddleware();

const router = express.Router();

// router.route("/")
//     .get(checkAdmin,publishingController.findAll)
//     .post(checkAdmin,publishingMiddleware.create,publishingController.create)
//     .delete(checkAdmin,publishingController.deleteAll);

// router.route("/:id")
//     .get(checkAdmin,publishingMiddleware.get,publishingController.findOne)
//     .put(checkAdmin,publishingController.update)
//     .delete(checkAdmin, publishingController.delete);

router.route("/")
    .get(publishingController.getAll)
    .post(publishingController.create)
    .delete(publishingController.deleteAll);

router.route("/:id")
    .get(publishingController.getById)
    .put(publishingController.update)
    .delete(publishingController.delete);

module.exports = router;
