const modelCategory = require('../models/categoryBlog')
const modelBlog = require('../models/blog')

// create new blog
exports.createBlog = async (req, res) => {
    try {

        // get fields
        const admin = req.authAdmin.adminId
        const {
            nameStore,
            title,
            subtitle,
            description,
            category,
            visibilty
        } = req.body


        // create new blog
        const newBlog = new modelBlog({
            admin,
            nameStore,
            title,
            subtitle,
            description,
            img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            category,
            visibilty,
            delete: false,
            date: `${new Date().getDate()}-${new Date().getMonth() }-${new Date().getFullYear()}` 
        })
        if (!newBlog) {
            return res.status(400).json({
                message: 'blog is not created'
            })
        }

        // save blog
        const saveBlog = await newBlog.save()


        return res.status(201).json({
            message: 'blog created with successful',
            newBlog:saveBlog

        })

    } catch (error) {
        res.status(500).json({
            error: error.message,

        })
    }
}

// update  blog fot delete / visibility and another fields
exports.updateBlog = async (req, res) => {
    try {

        // get fields
        const admin = req.authAdmin.adminId
        const idBlog = req.params.id
        const fields = ['title', 'subtitle', 'description', 'img', 'category', 'visibilty', 'delete']

        // find blog
        const findBlog = await modelBlog.findOne({
            admin,
            _id: idBlog
        })
        if (!findBlog) {
            return res.status(404).json({
                message: 'blog is not found'
            })
        }

        // create new objet for blog update
        const update = {}
        fields.forEach(field => {
            if (req.body[field]) {
                if (field === 'img') {
                    update[field] = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } else {
                    update[field] = req.body[field]
                }
            }
        })

        // Update the product in the database
        const updateBlog = await modelBlog.findByIdAndUpdate(
            idBlog, 
            {
                $set: update
            }, 
            {
                new: true,
                runValidators: true
            }
        )

        // Check if the update was successful
        if (!updateProduct) {
            return res.status(400).json({
                message: 'blog is not update'
            })
        }

        // Send successful response
        res.status(200).json({
            message: 'blgo is delete with success',
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// get one blog
exports.getOneBlog=async(req,res)=>{
    try{

        // VARIABLES
        const admin=req.authAdmin.adminId
        const idBlog=req.params.id

        // FIND BLOG
        const findBlog=await modelBlog.findOne({admin,_id:idBlog}).select('-admin')
        if(!findBlog){
           return res.status(404).json({
                message: 'blog is not found',
            })
        }

        // SEND BLOG
        res.status(200).json({message:'blog is found with successful', blog:findBlog })

    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// get blogs of one category
exports.getBlogsCategory=async(req,res)=>{
    try{

        // VARIABLES
        const admin=req.authAdmin.adminId
        const idCategory=req.params.id

        // FIND CATEGORY
        const findCategory=await modelCategory.findOne({admin,_id:idCategory})
        if(!findCategory){
            return res.status(404).json({message:'category blog is not found'})
        }

        // FIND BLOGS THE CATEGORY
        const findBlogs=await modelBlog.find({admin,category:idCategory}).select('-admin')
        if(!findBlogs){
            return res.status(404).json({message:'blogs is not found'})
        }

        // SEND BLOGS THE CATEGORY
        res.status(200).json({
            message:'blogs category is get with successful',
            blogs:findBlogs
        })
        
    }

    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET ALL BLOGS
exports.getAllBlogs=async(req,res)=>{
    try{

        // GET ID ADMIN
        const admin=req.authAdmin.adminId

        // GET BLOGS
        const getBlogs=await modelBlog.find({admin}).select('-admin')
        if(!getBlogs){
            return res.status(404).json({message:'no blogs found'})
        }

        // SEND BLOGS
        res.status(200).json({blogs:getBlogs})
    }

    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
    
}