const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_FACTOR = 10

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

})

UserSchema.pre('save', function (next) {
    
    const user = this

    if (this.isModified('password')) return next()

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            console.log(hash)
            next()
        })

    })

})

UserSchema.methods.comparePassword = function (newPas, cb) {
    
    bcrypt.compare(newPas, this.password, (err, isMatch) => {
        if (err) return cb(err)
        
        cb(null, isMatch)
    })
}

UserSchema.statics.getAuthenticated = function (email, pass, cb) {

    this.findOne({ email }, (err, user) => {
        if (err) return cb(err)
        
        if (!user) return cb(null, null, 0)
        
        user.comparePassword(pass, (err, isMatch) => {
            if (err) return cb(err)
            
            if (isMatch) return cb(null, user)
        })
    })
}

const User = mongoose.model('user', UserSchema)

module.exports = User