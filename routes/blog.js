const router = require('express').Router();
const { indexOfBlogs, showBlog, updateBlog, deleteBlog, storeBlog } = require('./../app/controllers/BlogController')


router.get('/', indexOfBlogs)
router.post('/store', storeBlog)
router.get('/show/:blogId', showBlog)
router.put('/update/:blogId', updateBlog)
router.delete('/delete/:blogId', deleteBlog)

module.exports = router