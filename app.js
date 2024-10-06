const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()

// connecte to mongoDB
const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb+srv://dashbord:1JdVyKLYQURevLkQ@cluster0.ebekyjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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