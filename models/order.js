const mongoose=require('mongoose')


const orderItemSchema=mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    shipping:{
        type:Number,
        required: true
    },
    total:{
        type:Number,
        required: true
    },

})


const orderSchema=mongoose.Schema({
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
    adressDelivery:{
        type:String,
        required: true
    },
    discount:{
        type:Number,
        required: true
    },
    total:{
        type:Number,
        required:true,
    },
    stutsInSuivi:{
        type:String,
        required: true
    },
    stutsInTable:{
        type:String,
        required: true
    },
    notes:{
        type:String,
        required: false
    },
    orderItem:[orderItemSchema],
    date:{
        type:Date,
        required:true
    }
})


module.exports=mongoose.model('Order',orderSchema)