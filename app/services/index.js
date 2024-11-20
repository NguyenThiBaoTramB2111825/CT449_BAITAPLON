const User = require('./user.service.js');
const Employee = require('./employee.service.js');
const Product = require('./product.service.js')
const Publishing = require('./publishing.service.js')
const TempoList = require('./tempolist.service.js')
const Image = require('./image.service.js')  

module.exports = {
    User,
    Employee,
    Product,
    Publishing,
    TempoList,
    Image,
    // ReturnProduct: ReturnProduct.ReturnProduct,
}