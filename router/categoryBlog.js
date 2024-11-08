const express=require('express')
const router=express.Router()
const authAdmin=require('../middlware/authAdmin')
const controller=require('../controller/categoryBlog')
const multer=require('../middlware/multer').uploadSingle

router.post('/newCategory',authAdmin,multer,controller.createCategory)
router.get('/categories',authAdmin,controller.getAllCategories)
router.put('/category/:id',authAdmin,multer,controller.updateCategory)

module.exports=router