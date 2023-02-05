const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Blog = require('../models/Blog')
const Comment = require('../models/Like')

/**
 * 
 * @desc Make a comment
 * @route POST blogs/comment/:blogId
 * @access Public/Auth
 * 
 */
const store = asyncHandler(async(req, res)=>{
    if(!req.body.comment){
        res.status(422)
        throw new Error('Comment text required')
    }

    const blog = await Blog.findById(req.params.blogId)
    if(!blog){
        res.status(403)
        throw new Error('Blog not found')
    }

    const comment = await Comment.create({
        text: req.body.comment,
        user: req.user._id,
        blog: blog._id
    })

    if(!comment){
        res.status(500)
        throw new Error('Failed to make a comment')
    }

    res.json({comment})
})

const CommentController = {
    store,
    // edit,
    // view,
    // deleteComment
}

module.exports = CommentController