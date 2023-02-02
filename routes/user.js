const router = require('express').Router();
const protect = require('../app/middlewares/authMiddleware')
const { 
    registerUser, 
    loginUser, 
    userInfo 
    } 
    = require('../app/controllers/UserController');


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, userInfo)


module.exports = router