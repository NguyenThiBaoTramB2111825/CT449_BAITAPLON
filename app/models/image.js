const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    contentType: {
        type: String,
        required: [true, "Content type is required"],
    },
    data: {
        type: Buffer,
        required: [true, "Image is required"],
    },
});

module.exports = mongoose.model("Image", ImageSchema);