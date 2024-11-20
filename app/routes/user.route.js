const express = require('express');
// const controller = require('../controllers/index.js');
// const middleware = require('../middleware/index.js')

const UserController = require("../controllers/user.controller");
const router = express.Router();

router.route('/')
    // .get(middleware.auth.adminAuth, controller.User.getAll)
    .get( UserController.getAll)
    .post(UserController.create)

router.route('/:id')
    .get(UserController.getById)
    .put(UserController.update)
    .delete(UserController.delete)

module.exports = router;