const mongoose = require('mongoose');  
const ApiError = require('../api-error.js');
const util = require("../utils/index.js");
const service = require("../services/index.js"); // Import đúng `service`
const model = require('../models/index.js'); // Đảm bảo import model đúng đường dẫn

// Xử lý thông tin chi tiết của từng TempoList
exports.extractTempolist = async (tempolist) => {
    const product = await service.Product.getById(tempolist.productId); // Lấy thông tin product
    if (!product) {
        throw new ApiError(400, "Product not found");
    }
    tempolist.productId = product;

    const imageUrl = util.handleImg.renderImageUrl(
        product.imageId.contentType,
        product.imageId.data
    );
    product.imageId.imageUrl = imageUrl;

    tempolist.quantity = Math.min(tempolist.quantity, product.quantity);

    // Nếu số lượng bằng 0, xóa TempoList
    if (tempolist.quantity === 0) {
        await service.TempoList.delete({
            userId: tempolist.userId,
            productId: tempolist.productId._id,
        });
        return null;
    }

    return tempolist;
};

// Lấy tất cả TempoList theo `userId`
exports.getAll = async (req, res, next) => {
    const { userId } = req.params;
    try {
        if (!util.isObjectId(userId)) {
            throw new ApiError(400, "Invalid User ID");
        }

        let tempolists = await service.TempoList.getAll(userId);

        tempolists = await Promise.all(
            tempolists.map(async (tempolist) => {
                return this.extractTempolist(tempolist);
            })
        );

        // Lọc bỏ các tempoList không hợp lệ
        tempolists = tempolists.filter((tempolist) => tempolist !== null);

        res.status(200).json({
            message: "Get all TempoList successfully",
            data: tempolists,
        });
    } catch (err) {
        next(err);
    }
};

// Lấy chi tiết TempoList theo `id`
exports.getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid TempoList ID");
        }
        console.log("Searching for TempoList with id:", id);

        // Gọi trực tiếp findById của model Mongoose
        const tempolist = await model.TempoList.findById(id); // Sử dụng Mongoose findById

        if (!tempolist) {
            throw new ApiError(400, "TempoList not found");
        }

        res.status(200).json({
            message: "Get TempoList successfully",
            data: tempolist,
        });
    } catch (err) {
        next(err);
    }
};

exports.add = async (req, res, next) => {
    const { userId, productId } = req.params;

    try {
        // Kiểm tra định dạng ID
        if (!util.isObjectId(userId) || !util.isObjectId(productId)) {
            throw new ApiError(400, "Invalid User ID or Product ID");
        }

        // Kiểm tra sản phẩm có tồn tại không
        const product = await service.Product.getById(productId);
        if (!product) {
            throw new ApiError(400, "Product not found");
        }

        // Lấy TempoList theo userId và productId
        let tempolist = await service.TempoList.getById({ userId, productId });
        if (!tempolist) {
            // Tạo mới TempoList nếu chưa tồn tại
            tempolist = await service.TempoList.create({
                userId,
                productId,
                quantity: 0,
            });
        }

        // Tính toán số lượng cập nhật
        const quantity = Math.min(
            req.body.quantity + tempolist.quantity,
            product.quantity
        );

        // Cập nhật TempoList
        const result = await service.TempoList.update(userId, productId, { quantity });

        res.status(200).json({
            message: "Add to TempoList successfully",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};


// Cập nhật số lượng sản phẩm trong TempoList
exports.update = async (req, res, next) => {
    const { userId, productId } = req.params;

    try {
        if (!util.isObjectId(userId) || !util.isObjectId(productId)) {
            throw new ApiError(400, "Invalid User ID or Product ID");
        }

        const product = await service.Product.getById(productId);
        if (!product) {
            throw new ApiError(400, "Product not found");
        }

        let tempolist = await service.TempoList.getById({ userId, productId });
        if (!tempolist) {
            tempolist = await service.TempoList.create({
                userId,
                productId,
                quantity: 0,
            });
        }

        const quantity = Math.min(req.body.quantity, product.quantity);

        if (quantity === 0) {
            const result = await service.TempoList.delete({ userId, productId });
            res.status(200).json({
                message: "Delete TempoList successfully",
                data: result,
            });
        } else {
            const result = await service.TempoList.update(userId, productId, { quantity });
            res.status(200).json({
                message: "Update TempoList successfully",
                data: result,
            });
        }
    } catch (err) {
        next(err);
    }
};

// Xóa sản phẩm khỏi TempoList
exports.delete = async (req, res, next) => {
    const { userId, productId } = req.params;

    try {
        if (!util.isObjectId(userId) || !util.isObjectId(productId)) {
            throw new ApiError(400, "Invalid User ID or Product ID");
        }

        const result = await service.TempoList.delete({ userId, productId });

        if (result.deletedCount > 0) {
            res.status(200).json({
                message: "Delete TempoList successfully",
                data: result,
            });
        } else {
            res.status(400).json({
                message: "TempoList not found",
                data: result,
            });

        }
    } catch (err) {
        next(err);
    }
};
