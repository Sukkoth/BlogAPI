const asyncHandler = require('express-async-handler')
const User = require('./../models/User')
const config = require('./../../config/env')


//PRIVATE ROUTES

/** 
 * @desc store blog
 * @route POST blogs/store
 * @access Private
*/
const storeBlog = asyncHandler(async(req, res)=>{
    res.json({message: 'Store blog'})
})


/** 
 * @desc Show blog detail to logged users
 * @route GET blogs/show/:blogId
 * @access Private
*/
const showMyBlog = asyncHandler(async(req, res)=>{
    res.json({message: `Show blog ${req.params.blogId}`})
})


/**
 * @desc update blog
 * @route PUT blogs/update/:blogId
 * @access Private
*/
const updateBlog = asyncHandler(async(req, res)=>{
    res.json({message: `Update blog ${req.params.blogId}`})
})


/**
 * @desc delete blog
 * @route DELETE blogs/store
 * @access Private
*/
const deleteBlog = asyncHandler(async(req, res)=>{
    res.json({message: `Delete blog ${req.params.blogId}`})
})



//PUBLIC (NO AUTH) ROUTES

/**
 * @desc List blogs
 * @route GET blogs/
 * @access Public
*/
const indexOfBlogs = asyncHandler(async(req, res)=>{
    res.json({message: 'Blog index'})
})


//PUBLIC (AUTH) ROUTES


/**  
 * @desc Show blog detail to logged users
 * @route GET blogs/show/:blogId
 * @access Public/Auth     
*/
const showBlog = asyncHandler(async(req, res)=>{
    res.json({message: `Show blog ${req.params.blogId}`})
})



module.exports = {
    indexOfBlogs,
    storeBlog,
    showBlog,
    updateBlog,
    deleteBlog
}