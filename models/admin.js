const mongoose=require('mongoose')
const AdminSchema=mongoose.Schema({
    firsName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date,required:true},
})

module.exports=mongoose.model('Admin',AdminSchema)