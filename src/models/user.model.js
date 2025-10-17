const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    fullName:{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }
});

userSchema.plugin(passportLocalMongoose); // adds username, hash and salt fields

module.exports = mongoose.model('user', userSchema);