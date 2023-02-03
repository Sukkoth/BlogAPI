const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({

}, {
    timestamps: true
})


module.exports = mongoose.model('BLog', BlogSchema)