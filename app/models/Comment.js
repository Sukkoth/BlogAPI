const mongoose = require('mongoose')

const CommentSchema  = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Comment text required']
    },
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


module.exports = mongoose.model('Comment', CommentSchema)