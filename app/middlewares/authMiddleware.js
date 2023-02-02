const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../../config/env')

const protect = asyncHandler( async (req, res, next) => {
    //check auth header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {

            //get token from header
            const token = req.headers.authorization.split(' ')[1]
            
            //decode the token to get userId
            const userId = jwt.verify(token, config.APP_KEY).id

            //find the user
            req.user = await User.findById(userId)

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Unauthorized')
        }
    }else{
        res.status(401)
        throw new Error('no auth token found, un authorized')
    }
})


module.exports = protect