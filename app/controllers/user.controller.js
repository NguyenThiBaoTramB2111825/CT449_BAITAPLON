const mongoose = require('mongoose');
const ApiError = require('../api-error.js');
const UserService = require("../services/user.service");
const util =require("../utils/isObjectId.js")

exports.getAll = async (req, res, next) => {
    try {
        const result = await UserService.getAll();
        res.status(200).json({
            message: "Get all user successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!(mongoose.Types.ObjectId.isValid(id))) {
            throw new ApiError(400, "User id is not valid");
        }
        const result = await UserService.getById(id);
        if (!result)
            throw new ApiError(400, "User not exist");
        res.status(200).json({
            message: "Get user successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (await UserService.getByEmail(email))
            throw new ApiError(400, 'The user\'s email already exists.');
        const data = req.body;
        // data.password = data.password = await util.hashPassword.hashPassword({ password });
        const result = await UserService.create(data);
        res.status(201).json({
            message: "Create user successfully",
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
            throw new ApiError(400, "User id is not valid");
        }
        const result = await UserService.delete(id);
        if (result.deletedCount)
            res.status(200).json({
                message: "Delete user successfully",
                data: result,
            });
        else
            res.status(400).json({
                message: "User id not exist",
                data: result,
            });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!util.isObjectId(id)) {
            throw new ApiError(400, "User id is not valid");
        }
        if(!(await UserService.getById(id))) {
            throw new ApiError(400, "User is not exist")
        }
        const data = req.body;
        // if (data.password)
        //     data.password = await util.hashPassword.hashPassword({ password: data.password })
        const result = await UserService.update({id: id, data});
        res.status(200).json({
            message: "Update user successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};