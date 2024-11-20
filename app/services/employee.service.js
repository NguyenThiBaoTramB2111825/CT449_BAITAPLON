const model = require("../models/index");

const EmployeeService = {
    create: async (employee) => {
        const result = await model.Employee.create(employee);
        return result;
    },

    getAll: async () => {
        const result = await model.Employee.find({});
        return result;
    },

    getById: async (id) => {
        const result = await model.Employee.findOne({ _id: id });
        return result;
    },

    getByEmail: async (email) => {
        const result = await model.Employee.findOne({ email });
        return result;
    },

    delete: async (id) => {
        const result = await model.Employee.deleteOne({ _id: id });
        return result;
    },

    update: async ({id, data}) => {
        const isExist = await model.Employee.findOne({_id: id});
        let result = null;
        if (!isExist)
            result = await model.Employee.create(data);
        else
            result = await model.Employee.findOneAndUpdate({ _id: id }, data, {new: true});
        return result;
    }
};

module.exports = EmployeeService;  // Xuất đối tượng EmployeeService
