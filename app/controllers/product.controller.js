const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const ProductService = require('../services/product.service.js')
const service = require("../services/index.js")
const util = require("../utils/handleImg.js")

exports.getAll = async (req, res, next) => {
    try {
        let products = await ProductService.getAll();
        products = await Promise.all(products.map(async (product) => {
            //render image url
            const imageUrl = util.renderImageUrl(product.imageId.contenType, product.imageId.data);
            product._doc.imageId._doc.imageUrl = imageUrl;
            return product;
        }));

        res.status(200).json({
            message: "Get all book successfully",
            data: products,
        });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Book id is not valid");
        }
        const product = await ProductService.getById(id);
        if (!product)
            throw new ApiError(400, "Book not exist");
        const imageUrl = util.renderImageUrl(product.imageId.contenType, product.imageId.data);
        product._doc.imageId._doc.imageUrl = imageUrl;
        res.status(200).json({
            message: "Get book successfully",
            data: product,
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await ProductService.create(data);
        res.status(201).json({
            message: "Create book successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Book id is not valid");
        }

        const product = await ProductService.getById(id);

        //delete product
        const result = await ProductService.delete(product._id);

        //delete image
        await service.Image.delete(product.imageId);

        if (result.deletedCount)
            res.status(200).json({
                message: "Delete product successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "Delete product failed!",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "Book id is not valid");
        }
        const data = req.body;
        const result = await ProductService.update({ id: id, data });
        res.status(200).json({
            message: "Update book successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};