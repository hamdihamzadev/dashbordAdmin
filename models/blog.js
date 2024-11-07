const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    nameStore:{
        type:String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'categoryPsot',
        required: true
    },
    visibilty: {
        type: Boolean,
        required: true
    },
    delete: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },

})

module.exports = mongoose.model('blog', blogSchema)