const express=require('express')
const router=express.Router()
const controller=require('../controller/order')
const authAdmin=require('../middlware/authAdmin')
const authCustomer=require('../middlware/authCustomer')

router.post('/addOrderbyCustomer',authCustomer,controller.createOrderByCustomer)
router.post('/addOrderByAdmin/:id',authAdmin,controller.createOrderByAdmin)

router.get('/ordersCustomer',authAdmin,authCustomer,controller.getOrdersCustomer)
router.get('/ordersCustomerByadmin/:id',authAdmin,controller.getOrdersCustomerForAdmin)
router.get('/allOrders',authAdmin,controller.getAllOrders)

module.exports=router