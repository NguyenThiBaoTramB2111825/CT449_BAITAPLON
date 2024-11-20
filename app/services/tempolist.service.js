const model = require('../models/index');

const TempoListService = {
    // Lấy thông tin TempoList theo userId và productId
    getById: async ({ userId, productId }) => {
        const result = await model.TempoList.findOne({ userId, productId });
        return result;
    },

    // Tạo mới TempoList
    create: async (data) => {
        const result = await model.TempoList.create(data);
        return result;
    },

    // Cập nhật TempoList
    update: async (userId, productId, data) => {
        const result = await model.TempoList.findOneAndUpdate(
            { userId, productId },
            { $set: data },
            { new: true }
        );
        return result;
    },

    // Xóa TempoList
    delete: async ({ userId, productId }) => {
        const result = await model.TempoList.deleteOne({ userId, productId });
        return result;
    },

    // Lấy tất cả TempoLists của user
    getAll: async (userId) => {
        const result = await model.TempoList.find({ userId }).populate('productId');
        return result;
    },
};

module.exports = TempoListService;
