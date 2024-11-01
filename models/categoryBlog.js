const mongoose = require('mongoose')

const ctgPostSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    visibility: {
        type: Boolean,
        required: true
    },
    delete: {
        type: Boolean,
        required: true
    },
    date: {
        type: String,
        required: true
    },

})


module.exports = mongoose.model('CategoryPost', ctgPostSchema)