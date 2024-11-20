const express = require('express');
const ImageController = require('../controllers/image.controller.js');
const middleware = require('../middlewares/uploadFile.js')

const router = express.Router();

router.route('/')
    .get(middleware,ImageController.getAll)
    .post(middleware, ImageController.create)

router.route('/:id')
    .get(ImageController.getById)
    .delete( ImageController.delete)

// router.route('/')
//     .post(middleware.auth.adminAuth, middleware.uploadFile, controller.Image.create)

// router.route('/:id')
//     .get(controller.Image.getById)
//     .delete(middleware.auth.adminAuth, controller.Image.delete)

module.exports = router