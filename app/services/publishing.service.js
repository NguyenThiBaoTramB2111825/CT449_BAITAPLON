const ApiError = require("../api-error.js");
const model = require("../models/index")

const PublishingService = {
    create:  async (user) => {
        const result = await model.Publishing.create(user);
        return result;
    },

    getAll: async () => {
        const result = await model.Publishing.find({});
        return result;
    },

    getById : async (id) => {
        const result = await model.Publishing.findOne({ _id: id });
        return result;
    },

    getByEmail:  async (email) => {
        const result = await model.Publishing.findOne({ email: email });
        return result;
    },

    delete: async (id) => {
        const result = await model.Publishing.deleteOne({ _id: id });
        return result;
    },

    update:  async ({id, data}) => {
        const isExist = await model.Employee.findOne({_id: id});
        let result = null;
        if (!isExist)
            result = await model.Employee.create(data);
        else
            result = await model.Publishing.findOneAndUpdate({ _id: id }, data);
        return result;
    },
}

module.exports = PublishingService
