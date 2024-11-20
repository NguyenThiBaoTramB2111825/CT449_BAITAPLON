const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    position: {
        type: String,
        default: "Customer care staff",
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    }
}, {versionKey: false});

module.exports = mongoose.model("Employee", EmployeeSchema);
