const express=require('express')
const router=express.Router()
const controller=require('../controller/categoryProduct')
const authAdmin=require('../middlware/authAdmin')
const multer=require('../middlware/multer')

router.post('/newCategory',authAdmin,multer,controller.createCategory)
router.get('/category',authAdmin,controller.GetAllCategories )
router.put('/category/:id',authAdmin,controller.updateCategory)

module.exports=router