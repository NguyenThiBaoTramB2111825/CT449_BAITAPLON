const publishingService = require('../services/publishing.service.js');
const ApiError = require("../api-error");
const mongoose = require('mongoose');
const util = require('../utils/index.js');

exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const isExist = await publishingService.getByEmail(data.email);
        if (isExist)
            throw new ApiError(400, "Email is already taken");
        const result = await publishingService.create(data);
        res.status(201).json({
            message: "Create publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};


exports.getAll = async (req, res, next) => {
    try {
        let result = await publishingService.getAll();
        res.status(200).json({
            message: "Get all publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};


exports.getById = async (req, res, next ) => {
    try {
        let result = await publishingService.getById(req.params.id);
        if (!result)
            throw new ApiError(400, "Publisher not exist");
        res.status(200).json({
            message: "Get publisher successfully",
            data: result,
        });
    } catch (error) {
        next(new ApiError(500, "An error retrieving contact with id= ${req.param.id}`"));
    }
};


exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(util.isObjectId(id))) {
            throw new ApiError(400, "Publisher id is not valid");
        }
        const data = req.body;
        const result = await publishingService.update({id: id, data});
        res.status(200).json({
            message: "Update publisher successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id)
        throw new ApiError(400, "Publisher id is not valid");
        let result = await publishingService.delete(id);
        res.status(200).json({
            message: "Delete publisher successfully",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

exports.deleteAll = async (req, res) => {
    try {
        let result = await publishingService.deleteAll();
        res.status(200).json({
            message: "Delete all publisher successfully",
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

