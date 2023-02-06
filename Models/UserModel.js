const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type: String,
        enum : ['manager', 'customer','seller'],
        default: 'customer'
    }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = {UserModel}