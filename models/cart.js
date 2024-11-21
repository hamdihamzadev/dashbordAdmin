const mongoose = require('mongoose')


const cartSchema = mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    nameStore:{
        type:String,
        required: true
    },
    items: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: false
        },
        quantity: {
            type: Number,
            required: false
        },
        total: {
            type: Number,
            required: false
        },
        delete:{
            type: Boolean,
            required: false
        },
        date: {
            type: Date,
            required: false
        },
    }],

    date:{
        type:String,
        required: true
    }
})

module.exports=mongoose.model('Cart',cartSchema)