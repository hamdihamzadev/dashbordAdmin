const express=require('express')
const router= express.Router()
const authAdmin=require('../middlware/authAdmin')
const controller=require('../controller/conversion')

router.post('/conversion',authAdmin,controller.addStatus)
router.get('conversion',authAdmin,controller.getAllStatus)

export default router