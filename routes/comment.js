const router = require('express').Router();
const CommentController = require('../app/controllers/CommentController')
const auth = require('../app/middlewares/authMiddleware')


router.post('/store/:blogId', auth, CommentController.store)


module.exports = router