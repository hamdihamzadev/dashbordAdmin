const express=require('express')
const router=express.Router()
const authAdmin=require('../middlware/authAdmin')
const authCustomer=require('../middlware/authCustomer')
const controller=require('../controller/customer')

// POST
router.post('/signup',controller.SigninCustomer)
router.post('/login',authCustomer,controller.loginCustomer)

// GET
router.get('/connected',authAdmin,authCustomer,controller.getCustomerConnected)
router.get('/all',authAdmin,controller.GetAllCustomers)

// PUT
router.put('/update/:id',authAdmin,authCustomer,controller.updateCustomerByUser)
router.put('/updateByAdmin/:id',authAdmin,controller.updateCustomerByAdmin)

module.exports=router