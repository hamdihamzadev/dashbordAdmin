const mongoose=require('mongoose')


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
    contry:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    adress:{
        type:String,
        required: true
    },
    discount:{
        type:Number,
        required: false
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
    orderItem:[{
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
        total:{
            type:Number,
            required: true
        },
    }],
    date:{
        type:Date,
        required:true
    }
})


module.exports=mongoose.model('Order',orderSchema)