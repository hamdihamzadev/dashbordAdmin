const express=require('express')
const router=express.Router()
const authAdmin=require('../middlware/authAdmin')
const controller=require('../controller/product')
const multer=require('../middlware/multer').uploadMultiple

router.post('/newproduct',authAdmin,multer,controller.createProduct)
router.put('/product/:id',authAdmin,multer,controller.updateProduct)
router.get('/product/:id',authAdmin,controller.getOneProduct)
router.get('/productCategory/:id',authAdmin,controller.getProductsCategory)
router.get('/allProducts',authAdmin,controller.getAllProducts)

module.exports=router