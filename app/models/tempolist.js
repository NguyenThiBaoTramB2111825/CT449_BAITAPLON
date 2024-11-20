const mongoose = require('mongoose');

const TempoListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('TempoList', TempoListSchema);