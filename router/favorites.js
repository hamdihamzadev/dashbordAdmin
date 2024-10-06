const express=require('express')
const router=express.Router()
const controller=require('../controller/favorites')
const authAdmin=require('../middlware/authAdmin')
const authCustomer=require('../middlware/authCustomer')

router.post('/create',authAdmin,authCustomer,controller.CreateFavorites)
router.get('/favoriteCustomer',authAdmin,authCustomer,controller.GetFavoriteCustomer)
router.post('/addItem',authAdmin,authCustomer,controller.AddItemToFavorites)
router.put('/deleteItem',authAdmin,authCustomer,controller.deleteItem)
router.get('/AllProductsDeleted',authAdmin,authCustomer,controller.getProductsDeleted)

module.exports=router