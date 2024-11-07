const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    nameStore:{
        type:String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    contry: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    delete: {
        type: Boolean,
        required: true
    },
    block: {
        type: Boolean,
        required: true
    },
    status:{
        type:Boolean,
        required:true
    },
    date: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Customer', customerSchema)