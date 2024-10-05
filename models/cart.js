const mongoose = require('mongoose')

const itemsSchema=mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
})


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
    items: [itemsSchema]
})

module.exports=mongoose.model('Cart',cartSchema)