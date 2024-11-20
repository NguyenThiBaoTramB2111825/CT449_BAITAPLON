const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publishingSchema = new Schema(
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
        books: [{
            type: String,
            required: true,
            unique: true,
            
            // Tham chiếu đến tài liệu trong colection khác, giống như khóa ngoại
            // type: Schema.Types.ObjectId,
            // ref: 'Book'
        }]
    },
    { timestamps: true }
    // Chức năng: Tự động thêm hai trường createdAt và updatedAt vào mỗi tài liệu trong collection Publishing.
);

module.exports = mongoose.model("Publishing", publishingSchema);
