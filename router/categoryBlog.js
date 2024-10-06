const express=require('express')
const router=express.Router()
const authAdmin=require('../middlware/authAdmin')
const controller=require('../controller/categoryBlog')

router.post('/newCategory',authAdmin,controller.createCategory)
router.get('/categor',authAdmin,controller.getAllCategories)
router.put('/category/:id',authAdmin,controller.updateCategory)

module.exports=router