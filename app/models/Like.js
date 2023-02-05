const mongoose = require('mongoose')

const LikeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User id required'],
        ref: 'User'
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Blog id required'],
        ref: 'Blog'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Like', LikeSchema)
