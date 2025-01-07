const mongoose=require('mongoose')
const schema=mongoose.Schema({
    nameStore:{
        type:String,
        required:true,
    },
    admin:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        required:true
    },

    backgroundColor:{
         type:String,
        required:true
    },

    color:{
         type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    delete:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('status',schema)