const express=require('express')
const router=express.Router()
const authAdmin=require('../middlware/authAdmin')
const authCustomer=require('../middlware/authCustomer')
const controller=require('../controller/customer')

router.post('/Signin',authAdmin,controller.SigninCustomer)
router.post('/Login',authAdmin,authCustomer,controller.loginCustomer)
router.get('/Connected',authAdmin,authCustomer,controller.getCustomerConnected)
router.get('/all',authAdmin,controller.GetAllCustomers)
router.put('/update',authAdmin,authCustomer,controller.updateCustomerByUser)
router.put('/block',authAdmin,authCustomer,controller.blockCustomer)

module.exports=router