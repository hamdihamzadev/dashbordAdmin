const express=require('express')
const router=express.Router()
const controller=require('../controller/blog')
const authAdmin = require('../middlware/authAdmin')
const multer=require('../middlware/multer').uploadSingle

router.post('/createBlog',authAdmin,multer,controller.createBlog)
router.put('/blog/:id',authAdmin,controller.updateBlog)
router.get('/blog/:id',authAdmin,controller.getOneBlog)
router.get('blogsOneCategory/:id',authAdmin,controller.getBlogsCategory)
router.get('/allBlogs',authAdmin,controller.getAllBlogs)

module.exports=router