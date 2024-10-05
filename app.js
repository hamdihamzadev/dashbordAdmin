const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()

// connecte to mongoDB
const url='mongodb+srv://dashbord:zJMQf3JDoXZLRMY3@cluster0.ebekyjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDB=async()=>{
    try{
        await mongoose.connect(url)
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