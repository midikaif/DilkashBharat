const mongoose = require('mongoose');

const Places = new mongoose.Schema({
    title: String,
    location: String,
    description: String,
},{
    timestamps: true
});

module.exports = mongoose.model('places', Places);