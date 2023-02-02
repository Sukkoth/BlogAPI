const mongoose = require('mongoose');
const { DB_URL } = require('./../config/env')


mongoose.set('strictQuery', false)
mongoose.connect(DB_URL, {useNewUrlParser: true}).then(()=>{
    console.log('Connected to db')
}).catch((err)=>{
    console.log('Error connecting to db')
    console.log(err.message)
})

module.exports = mongoose