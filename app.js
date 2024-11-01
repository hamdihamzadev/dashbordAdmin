const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
require('dotenv').config()

// router
const routerAdmin=require('./router/admin')
const routerCategoryProduct=require('./router/categoryProducts')
const routerProduct=require('./router/product')
const routerCategoryBlog=require('./router/categoryBlog')
const routerBlog=require('./router/blog')
const routerCustomer=require('./router/customer')
const routerOrder=require('./router/order')
const routerCart=require('./router/cart')
const routerFavorites=require('./router/favorites')
const routerReviews=require('./router/reviews')


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

// autorisation
app.use(cors())

//traiter les données JSON
app.use(express.json())

 // use api
app.use('/api/admin',routerAdmin)
app.use('/api/categoryProduct',routerCategoryProduct)
app.use('/api/product',routerProduct)
app.use('/api/categoryBlog',routerCategoryBlog)
app.use('/api/blog',routerBlog)
app.use('/api/customer',routerCustomer)
app.use('/api/order',routerOrder)
app.use('/api/cart',routerCart)
app.use('/api/favorites',routerFavorites)
app.use('/api/reviews',routerReviews)
app.use('/images', express.static('images'));



module.exports=app