const express=require('express')
const router=express.Router()
const controller=require('../controller/cart')
const authAdmin=require('../middlware/authAdmin')
const authCustomer=require('../middlware/authCustomer')

router.post('/newCart',authCustomer,controller.createCart)
router.post('/addItem/:cartId',authCustomer,controller.AddItemToCart)
router.put('/DeleteItem/:cartId/:itemId',authCustomer,controller.deleteItem)

router.put('/deleteItem/:id',authAdmin,authCustomer,controller.deleteItemInCart)
router.put('/UpdateQuantity/:cartId/:itemId',authCustomer,controller.changeQuantityItem)
router.put('/deleteAllItems/:cartId', authCustomer, controller.deleteAllItems )


router.get('/itemsDeletedtCustomer',authAdmin,authCustomer,controller.getItemDeletedInCustomer)
router.get('/allPrdocuctsDeleted',authAdmin,controller.getProductsDeleted)
router.get('/getCart/:nameStore',authCustomer,controller.getCartCustomer)

module.exports=router