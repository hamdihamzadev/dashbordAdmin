const express=require('express')
const router=express.Router()
const controller=require('../controller/admin')
const authAdmin=require('../middlware/authAdmin')

router.post('/signup',controller.SignUp)
router.post('/login',controller.Login)
router.get('/getAdmin',authAdmin,controller.getAdmin)
