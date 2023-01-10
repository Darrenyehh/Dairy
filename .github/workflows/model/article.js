const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    markdown : {
        type : String,
        required : true
    },
    createdAt: {
        type : Date,
        default : () => Date.now()
    },
    passCode: {
        type : String
    }
})

module.exports = mongoose.model('Article', articleSchema)