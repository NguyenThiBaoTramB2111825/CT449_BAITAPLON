const ApiError = require("../api-error.js");
const model = require("../models/index")

const ProductService = {

    getPublisher: async (id) => {
        const product = await model.Product.findById(id).populate("publisherId").select("publisherId")
        return product.publisherId
    },

    create: async (book) => {
        const result = await model.Product.create(book);
        return result;
    },

    getAll: async () => {
        const result = await model.Product.find({}).populate("publisherId imageId");
        return result;
    },

    getById : async (id) => {
        const result = await model.Product.findOne({ _id: id }).populate("publisherId imageId");
        return result;
    },

    delete : async (id) => {
        const result = await model.Product.deleteOne({ _id: id });
        return result;
    },

    update : async ({ id, data }) => {
        const isExist = await this.getById(id);
        let result = null;
        if (!isExist)
            throw new ApiError(400, "Product is not exits")
        else
            result = await model.Product.findOneAndUpdate({ _id: id }, data, {new: true});
        return result;
    },
}

module.exports = ProductService; 
