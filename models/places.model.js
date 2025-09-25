const mongoose = require('mongoose');

const places = new mongoose.Schema({
    title: String,
    location: String,
    description: String,
},{
    timestamps: true
});

module.exports = mongoose.model('places', places);