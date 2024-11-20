const PublishingService = require("../services/publishing.service");
const publishingService = new PublishingService();

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        let result = await publishingService.create(req.body);
        res.status(201).json({
            message: "Create publisher successfully",
            data: result,
        });
    } catch (e) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};


exports.findAll = async (req, res, next) => {
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


exports.findOne = async (req, res, next ) => {
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
        if (!id)
            throw new ApiError(400, "Publisher id is not valid");
        let result = await publishingService.update(id, req.body);
        res.status(200).json({
            message: "Update publisher successfully",
            data: result,
        });
    } catch (e) {
        next(e);
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

