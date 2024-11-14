const express=require('express')
const router=express.Router()
const controller=require('../controller/categoryProduct')
const authAdmin=require('../middlware/authAdmin')
const multer=require('../middlware/multer').uploadSingle

router.post('/newCategory',authAdmin,multer,controller.createCategory)
router.get('/categories',authAdmin,controller.GetAllCategories )
router.get('/getCategoriesByCustomer/:namestore',controller.getCatgegoriesByCustomer)
router.put('/category/:id',authAdmin,multer,controller.updateCategory)

module.exports=router