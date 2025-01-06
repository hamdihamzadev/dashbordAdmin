const express=require('express')
const router=express.Router()
const authAdmin=require('../middlware/authAdmin')
const controller=require('../controller/product')
const multer=require('../middlware/multer').uploadMultiple

router.post('/newproduct',authAdmin,multer,controller.createProduct)
router.get('/product/:id',authAdmin,controller.getOneProduct)

router.get('/getOneProduct/:nameStore/:id',controller.getOneProductForStore)

router.get('/getOneProductforStore/:nameStore/:id',controller.getOneProductForStore)

router.get('/productsCategory/:nameStore/:id',controller.getProductsCategoryForStore)
router.get('/allProducts',authAdmin,controller.getAllProducts)

router.put('/product/:id',authAdmin,multer,controller.updateProduct)
router.put('/changeQuantity/:nameStore',controller.changeQuantity)

module.exports=router