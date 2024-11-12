const express=require('express')
const router=express.Router()
const controller=require('../controller/blog')
const authAdmin = require('../middlware/authAdmin')
const multer=require('../middlware/multer').uploadSingle

router.post('/createBlog',authAdmin,multer,controller.createBlog)

router.put('/updateblog/:id',authAdmin,multer,controller.updateBlog)

router.get('/getblog/:id',authAdmin,controller.getOneBlog)
router.get('blogsOneCategory/:id',authAdmin,controller.getBlogsCategory)
router.get('/allBlogs',authAdmin,controller.getAllBlogs)

module.exports=router