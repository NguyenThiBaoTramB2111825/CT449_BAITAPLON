const Publishing = require("../models/Publishing");
const ApiError = require("../api-error");
const mongoose = require('mongoose');
const {ObjectId} = require("mongodb");

class PublishingMiddleware {
    async create(req, res, next) {
        try {
            const { name, address, books } = req.body;

            if (!address || !name) {
                return res.status(400).json(new ApiError(400, "Dữ liệu là rỗng"));
            }

            let existPublishing = await Publishing.findOne({ name: name });
            if (existPublishing) {
                return res.status(409).json(new ApiError(409, `${name} đã tồn tại`));
            }

            next();
        } catch (e) {
            console.log(e.message);
        }
    }

    async update(req, res, next) {
        try {
            const { name, address, books } = req.body;
            const id = req.params.id;

            const publishing = await Publishing.findOne({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            })
            if (!publishing) {
                return res.status(404).json(new ApiError(404, `Khong tim thay boi ${id}`));
            }

            if (!name || !address) {
                return res.status(400).json(new ApiError(400, "Dữ liệu là rỗng"));
            }

            let existPublishing = await Publishing.findOne({ name: name, _id: { $ne: id } });
            if (existPublishing) {
                return res.status(409).json(new ApiError(409, `${name} đã tồn tại`));
            }

            next();
        } catch (e) {
            console.log(e.message);
        }
    }

    async get(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json(new ApiError(400, "Dữ liệu là rỗng"));
            }
            const publishing = await Publishing.findOne({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            })

            if (!publishing) {
                return res.status(404).json(new ApiError(404, `Khong tim thay boi ${id}`));
            }

            next();
        } catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = PublishingMiddleware;
