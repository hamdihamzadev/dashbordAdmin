const express=require('express')
const router=express.Router()
const controller=require('../controller/cart')
const authAdmin=require('../middlware/authAdmin')
const authCustomer=require('../middlware/authCustomer')

router.post('/newCart',authCustomer,controller.createCart)
router.get('/getCart/:nameStore',authCustomer,controller.getCartCustomer)
router.post('/addItem/:nameStore',authCustomer,controller.AddItemToCart)
router.put('/deleteItem/:id',authAdmin,authCustomer,controller.deleteItemInCart)
router.get('/itemsDeletedtCustomer',authAdmin,authCustomer,controller.getItemDeletedInCustomer)
router.get('/allPrdocuctsDeleted',authAdmin,controller.getProductsDeleted)

module.exports=router