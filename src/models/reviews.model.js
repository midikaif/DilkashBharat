const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    body: String,
    rating: Number
},{
    timestamps: true
});

module.exports = mongoose.model('reviews',reviewSchema);