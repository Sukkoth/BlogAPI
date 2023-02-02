const asyncHandler = require('express-async-handler')
const User = require('./../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('./../../config/env')


//@desc Register User
//@route POST /users/register
//@access Public 
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(422)
        throw new Error('Make sure to provide all the fields')
    }
    
    //check email
    const userCheck = await User.findOne({email})
    if(userCheck){
        res.status(422)
        throw new Error('Email already taken')
    }

    //hash password

    const hashedPassword = await bcrypt.hash(password, 10)

    //register user 
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if(!user){
        res.status(500)
        throw new Error('Failed to register user')
    }

    res.json({message: 'User registered', user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
    }, token: generateAuthToken(user._id)})
})


//@desc Login User
//@route POST /users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    //check fields
    if(!email || !password){
        res.status(422)
        throw new Error('Please provide email and password fields')
    }
    //check email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({token: generateAuthToken(user._id)})
    }else{
        res.status(402)
        throw new Error('Invalid credentials')
    }
   
})

//@desc Display User details
//@route GET /users/me
//@access Private
const userInfo = asyncHandler(async(req, res) => {
    res.json(req.user)
})





//@desc Generate auth tokens for user
const generateAuthToken = (id) => {

   const token = jwt.sign({id}, config.APP_KEY, {
    expiresIn: '3d'
   })

   return token
}


module.exports = {
    registerUser,
    loginUser,
    userInfo
}