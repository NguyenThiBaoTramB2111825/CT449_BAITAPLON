const model = require("../models/index.js")

const UserService = {
    create: async (user) => {
        const result = await model.User.create(user);
        return result;
    },

    getAll:  async () => {
        const result = await model.User.find({});
        return result;
    },

    getById: async (id) => {
        const result = await model.User.findOne({ _id: id });
        return result;
    },

    getByEmail: async (email) => {
        const result = await model.User.findOne({ email });
        return result;
    },

    delete: async (id) => {
        const result = await model.User.deleteOne({ _id: id });
        return result;
    },

    update: async ({id, data}) => {
        const isExist = await  model.User.findOne({ _id: id });
        let result = await model.User.findOneAndUpdate({ _id: id }, data);
        return result;
    },

}
module.exports = UserService; 
