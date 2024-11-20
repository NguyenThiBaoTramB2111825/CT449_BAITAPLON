const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const util = require('../utils/index.js')
const ImageService = require("../services/image.service.js")
const fs = require('fs');// Thư viện để xử lý

exports.create = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            throw new ApiError(400, "Image is required");
        }
        const data = {
            data: fs.readFileSync(file.path),
            contentType: file.mimetype,
        }
        const result = await ImageService.create(data);
        res.status(200).json({
            message: "Image created successfully",
            data: result,
        });
    } catch (err) {
        next(err)
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const result = await ImageService.getAll();
        res.status(200).json({
            message: "Get all image successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};


exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await ImageService.getById(id);
        if (!result) {
            throw new ApiError(400, "Image not found");
        }
        const imageUrl = util.handleImg.renderImageUrl(result.contentType, result.data);
        res.status(200).json({
            message: "Image found",
            data: {
                ...result,
                imageUrl,
            }
        });
    } catch (err) {
        next(err)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await ImageService.delete(id);
        res.status(200).json({
            message: "Image deleted successfully",
            data: result,
        });
    } catch (err) {
        next(err)
    }
}

