const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    isTempPassword: { type: Boolean, required: true },
    role: { type: String, required: true, default: 'member' },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)