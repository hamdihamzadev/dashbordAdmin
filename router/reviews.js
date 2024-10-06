const express=require('express')
const router=express.Router()
const controller=require('../controller/review')
const authAdmin=require('../middlware/authAdmin')
const authCustomer=require('../middlware/authCustomer')

router.post('/newReview',authAdmin,authCustomer,controller.addReview)
router.get('/allReviews',authAdmin,authCustomer,controller.getAllReviews)
router.get('/reviewsProduct/:id',authAdmin,controller.getReviewsOneProduct)
router.get('/reviewsCustomer',authAdmin,authCustomer,controller.GetReviewsOneCustomer)

module.exports=router