const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require("validator");


const PublishingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            unique: [true, "Email is already taken"],
            required: [true, "Email is required"],
        }
    },
    { timestamps: true }
    // Chức năng: Tự động thêm hai trường createdAt và updatedAt vào mỗi tài liệu trong collection Publishing.
);

PublishingSchema.path('email').validate({
    validator: function (value) {
        if (validator.isEmail(value))
            return true
        return false

    },
    message: function (props) {
        if (!validator.isEmail(props.value))
            return "Email is not valid"
        return "An error has occurred"
    },
})

module.exports = mongoose.model("Publishing", PublishingSchema);
