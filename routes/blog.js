const router = require('express').Router();
const { 
    indexOfBlogs, showBlog, indexOfMyBlogs, showMyBlog, updateBlog, deleteBlog, storeBlog, likeBlog 
    } = require('./../app/controllers/BlogController')
const auth = require('../app/middlewares/authMiddleware')


//PRIVATE/Auth
router.post('/store', auth, storeBlog)
router.get('/mine', auth, indexOfMyBlogs)
router.get('/mine/show/:blogId', auth, showMyBlog)
router.put('/mine/update/:blogId', auth, updateBlog)
router.delete('/mine/delete/:blogId', auth, deleteBlog)

//PUBLIC/Auth
router.get('/', indexOfBlogs)
router.get('/show/:blogId', showBlog)
router.post('/like/:blogId', auth, likeBlog)


module.exports = router
