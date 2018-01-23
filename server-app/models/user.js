const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fisrtName: String,
    lastName: String,
    email: String,
    password: String
})

const User = mongoose.model('user', UserSchema)

module.exports = User