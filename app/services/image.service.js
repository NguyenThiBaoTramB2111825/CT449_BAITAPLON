const model = require("../models/index")

const ImageService = {
    create : async (data) => {
        const result = await model.Image.create(data);
        return result;
    },

    getAll: async () => {
        const result = await model.Image.find({});
        return result;
    },

    getById:  async (id) => {
        const result = await model.Image.findOne({ _id: id });
        return result;
    },

    delete:  async (id) => {
        const result = await model.Image.deleteOne({ _id: id });
        return result;
    },

    update : async ({id, data}) => {
        const isExist = await this.getById(id);
        let result = null;
        if (!isExist)
            result = await this.create(data);
        else
            result = await model.Image.findOneAndUpdate({ _id: id }, data);
        return result;
    },
}

module.exports = ImageService;