const express = require('express');
const employeeController = require("../controllers/employee.controller");
// const controller = require('../controllers/index.js');
// const middleware = require('../middleware/index.js')

const router = express.Router();

// router.route('/')
//     .get(middleware.auth.adminAuth, controller.Employee.getAll)
//     .post(middleware.auth.adminAuth, controller.Employee.create)

// router.route('/:id')
//     .get(middleware.auth.adminAuth, controller.Employee.getById)
//     .put(middleware.auth.adminAuth, controller.Employee.update)
//     .delete(middleware.auth.adminAuth, controller.Employee.delete)

router.route('/')
    .get(employeeController.getAll)
    .post( employeeController.create)

router.route('/:id')
    .get(employeeController.getById)
    .put(employeeController.update)
    .delete(employeeController.delete)

module.exports = router;