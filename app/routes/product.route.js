const express = require('express');
// const controller = require('../controllers/index.js');
const util = require('../utils/index.js');
const middleware = require('../middlewares/uploadFile.js');

const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.route('/')
    .get(middleware, ProductController.getAll)
    .post(ProductController.create)

// router.route("/admin")
//     .get(UserController.getAll)

router.route('/:id')
    .get(ProductController.getById)
    .put(ProductController.update)
    .delete(ProductController.delete)

// router.route('/')
//     .get(controller.Product.getAll)
//     .post(middleware.auth.adminAuth, controller.Product.create)

// router.route("/admin")
//     .get(middleware.auth.adminAuth, controller.Product.getAll)

// router.route('/:id')
//     .get(controller.Product.getById)
//     .put(middleware.auth.adminAuth, controller.Product.update)
//     .delete(middleware.auth.adminAuth, controller.Product.delete)

module.exports = router;