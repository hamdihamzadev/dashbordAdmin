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
    nameStore:{
        type:String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone:{
        type:Number,
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
    total:{
        type:Number,
        required:true,
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

        shipping:{
            type:Number,
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

        status:[
            {
                type: {
                    type: mongoose.Schema.Types.String,
                    ref: 'Status',
                    required: true
                },
                date: {
                    type: String,
                    required: true
                }
            }
        ],

        delete:{
            type:Boolean,
            required: true
        },

    }],

    status:[
        {
            type: {
                type: mongoose.Schema.Types.String,
                ref: 'Status',
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }
    ],
   
    returnDeadline:{
        type:String,
        required:true
    },

    returnedProducts: [{
        type: {
            type: String,
            enum: ['product', 'order'],
            required: true
        },
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: function(){
                return this.type==='product'
            }
        },
        reason: {
            type: String,
            required: true
        },
        images: [{
            type: String,
            required: true
        }],
        adminResponse:{
            type:Boolean,
            required: false
        },
        adminComment:{
            type:String,
            required: false
        }
    }],

    delete:{
        type:Boolean,
        required: true
    },

    date:{
        type:Date,
        required:true
    }
})


module.exports=mongoose.model('Order',orderSchema)