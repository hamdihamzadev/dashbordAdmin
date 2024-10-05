const mongoose=require('mongoose')


const itemsSchema=mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    date: {
        type: Date,
        required: false
    },

    delete:{
        type:Boolean,
        require:false
    }
})

const favoritesSchema=mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref:'Admin',
        required: true
    },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    items:[itemsSchema]
})

module.exports=mongoose.model('Favorites',favoritesSchema)