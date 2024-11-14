const mongoose=require('mongoose')
const AdminSchema=mongoose.Schema({
    firsName:{type:String,required:true},
    lastName:{type:String,required:true},
    nameStore:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:String,required:true},
})

module.exports=mongoose.model('Admin',AdminSchema)


/**
 * 
 *     phone:{type:Number,required:false},
    adresse:{type:String,required:false},
    socialmedia:{
        facebook:{type:String,required:false},
        instagram:{type:String,required:false},
        x:{type:String,required:false},
    },
    Description:{type:String,required:false},
    Openinghours:{type:String,required:false},
 */