const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = requier('bcrypt')
const SALT_FACTOR = 10

const UserSchema = new Schema({
    fisrtName: {
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

UserSchema.pre('save', (next) => {
    
    const user = this

    if (this.isModified('password')) return next()

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

UserSchema.comparePassword = (newPas, cb) => {
    bcrypt.compare(newPas, this.password, (err, isMatch) => {
        if (err) return cb(err)
        
        cb(null, isMatch)
    })
}

UserSchema.statics.getAuthenticated = (username, pass, cb) => {
    this.findOne({ username }, (err, user) => {
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