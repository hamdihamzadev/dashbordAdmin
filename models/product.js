
const mongoose = require('mongoose')

const ProductsSchema = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    promotion: {
        priceAfter: {
            type: Number,
            required: true
        },
        percentage:{
            type:Number,
            required: true
        }
    },
    imgs: {
        type: [String],
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

module.exports = mongoose.model('Product', ProductsSchema)