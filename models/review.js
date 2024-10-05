const mongoose=require('mongoose')

const reviewSchema=mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref:'Admin',
        required: true
    },
    customer:{
        type:mongoose.Types.ObjectId,
        ref:'Customer',
        required: true
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required: true
    },
    comment:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        required: true
    },
    
})

module.exports=mongoose.model('Review',reviewSchema)