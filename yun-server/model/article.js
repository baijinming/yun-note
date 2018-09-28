const mongoose = require('mongoose')

const article = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: String,
    content: String,
    contentText: String,
    looknums: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Array
    },
    tag: String
},{versionKey: false, timestamps: {createAt: "createTime", updateAt: "updateTime"}})

module.exports = mongoose.model('article',article)