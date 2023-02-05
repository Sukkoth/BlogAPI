const express = require('express')
const app = express()
const mongoose = require('./database/dbConfig')

const config = require('./config/env')
const errorHandler = require('./app/middlewares/errorHandler')



app.use(express.urlencoded({extended: true}))

app.use('/users', require('./routes/user'))
app.use('/blogs', require('./routes/blog'))
app.use('/blogs/comments', require('./routes/comment'))



app.use(errorHandler)
app.listen(config.APP_PORT, ()=>console.log(`Server running on port ${config.APP_PORT}`))


