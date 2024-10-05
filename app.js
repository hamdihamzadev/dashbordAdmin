const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()

// connecte to mongoDB
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB is connected')
    }
    catch(error){
        console.log(`error connect Db is ${error}`)
    }
}

connectDB()

// traiter les données JSON 
app.use(cors())

//traiter les données JSON
app.use(express.json())


module.exports=app