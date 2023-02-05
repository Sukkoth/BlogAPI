const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Blog = require('../models/Blog')
const config = require('./../../config/env')
const Like = require('../models/Like')


//PRIVATE ROUTES

/** 
 * @desc store blog
 * @route POST blogs/store
 * @access Private
*/
const storeBlog = asyncHandler(async(req, res)=>{
    //check body
    const { title, sub_title, text } = req.body
    if(!title || !sub_title || !text){
        res.status(422)
        throw new Error('Make sure you have provided all the necessary fieilds')
    }

    const blog = await Blog.create({
        title: title,
        sub_title: sub_title,
        text: text,
        user: req.user._id
    })

    if(blog){
        res.status(201).json({
            message: 'Blog created',
            blog
        })
    }else{
        res.status(500)
        throw new Error('Failed to create blog')
    }
})

/** 
 * @desc Show blogs of logged users
 * @route GET blogs/mine
 * @access Private
*/
const indexOfMyBlogs = asyncHandler(async(req, res)=>{

    const blogs = await Blog.find({user: req.user._id})
    
    res.json({blogs, count: blogs.length})
    
})

/** 
 * @desc Show blog detail to logged users
 * @route GET blogs/mine/show/:blogId
 * @access Private
*/
const showMyBlog = asyncHandler(async(req, res)=>{

    const blog = await Blog.findOne({_id: req.params.blogId, user: req.user._id})

    if(!blog){
        res.status(500)
        throw new Error('Failed to fetch blog')
    }
        
    res.json({blog})
    
})




/**
 * @desc update blog
 * @route PUT blogs/mine/update/:blogId
 * @access Private
*/
const updateBlog = asyncHandler(async(req, res)=>{

    const blog = await Blog.findOne({_id: req.params.blogId, user: req.user._id})

    if(!blog){
        res.status(403)
        throw new Error('Blog not found')
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.blogId, req.body)

    if(!updatedBlog){
        res.status(500)
        throw new Error('Failed to update blog')
    }

    res.json({message: 'Blog updated', blog: updatedBlog})
})


/**
 * @desc delete blog
 * @route DELETE blogs/mine/delete/:blogId
 * @access Private
*/
const deleteBlog = asyncHandler(async(req, res)=>{

    const blog = await Blog.findOne({_id: req.params.blogId, user: req.user._id})

    if(!blog){
        res.status(403)
        throw new Error('Blog not found')
    }

    blog.remove()

    res.json({message: `Delete blog ${req.params.blogId}`})
})



//PUBLIC (NO AUTH) ROUTES

/**
 * @desc List blogs
 * @route GET blogs/
 * @access Public
*/
const indexOfBlogs = asyncHandler(async(req, res)=>{
    const blogs = await Blog.find({})
    
    res.json({blogs, count: blogs.length})
})

/**  
 * @desc Show blog detail to logged users
 * @route GET blogs/show/:blogId
 * @access Public     
*/
const showBlog = asyncHandler(async(req, res)=>{
    const blog = await Blog.findById(req.params.blogId)
    if(!blog){
        res.status(403)
        throw new Error('Blog not found')
    }

    const author = await User.findById(blog.user).select('-password -createdAt -updatedAt')

    res.json({blog, author})
})

//PUBLIC (AUTH) ROUTES
/**  
 * @desc Like or unlike blog
 * @route GET blogs/like/:blogId
 * @access Public/Auth     
*/
const likeBlog = asyncHandler(async(req, res)=>{
    const blog = await Blog.findById(req.params.blogId)
    if(!blog){
        res.status(403)
        throw new Error('Blog not found')
    }

    const previousLike = await Like.findOne({user: req.user._id, blog: req.params.blogId})

    if(previousLike){
        previousLike.remove()
        res.json({message: 'Unliked', like: false, id: req.params.blogId})
    }else{
        const liked = await Like.create({
            user: req.user._id,
            blog: blog._id
        })
    
        if(!liked){
            res.status(500)
            throw new Error('Error liking the blog')
        }
    
        res.json({message: 'liked', like: true, id: liked._id})
    }
})





module.exports = {
    indexOfBlogs,
    showBlog,


    storeBlog,
    indexOfMyBlogs,
    showMyBlog,
    updateBlog,
    deleteBlog,


    likeBlog
}