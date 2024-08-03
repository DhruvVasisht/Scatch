const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true, 
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
    },
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
        required: false, 
        min: 0, 
    },
    picture: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('User', userSchema);