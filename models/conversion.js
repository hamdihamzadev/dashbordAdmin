const mongoose=require('mongoose')

const conversionSchema=mongoose.Schema({
    admin:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    nameStore:{
        type:String,
        required: true
    },

    status:{
        type:String,
        required:true
    },

    date:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Conversion',conversionSchema)