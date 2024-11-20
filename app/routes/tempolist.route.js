const express = require('express');
// const controller = require('../controllers/index.js');
// const middleware = require('../middleware/index.js')
const TempoListController = require("../controllers/tempolist.controller.js");
const router = express.Router();

router.route("/:userId")
 //   .get(middleware.auth.userAuth, controller.Cart.getAll)
    .get(TempoListController.getAll)

router.route("/cart/:id")
    .get(TempoListController.getById)
    // .get(middleware.auth.userAuth, controller.Cart.getById)

router.route("/add-tempolist/:userId/:productId")
//    .post(middleware.auth.userAuth, controller.Cart.add)
    .post(TempoListController.add)

router.route("/:userId/:productId")
    // .post(middleware.auth.userAuth, controller.Cart.update)
    // .delete(middleware.auth.userAuth, controller.Cart.delete)
    .post(TempoListController.update)
    .delete(TempoListController.delete)

module.exports = router