const mongoose=require('mongoose')


const itemsSchema=mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
})

const favoritesSchema=mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref:'Admin',
        required: true
    },
    items:[itemsSchema]
})

module.exports=mongoose.model('Favorites',favoritesSchema)