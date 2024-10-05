const express=require('express')
const router=express.Router()
const authAdmin=require('../middlware/authAdmin')
const controller=require('../controller/categoryBlog')

router.post('/categorBlog',authAdmin,controller.createCategory)