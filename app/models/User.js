const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Please provide email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', UserSchema)