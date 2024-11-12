const modelCategory = require('../models/categoryBlog')

// create category
exports.createCategory = async (req, res) => {
    try {
        const admin = req.authAdmin.adminId
        const {
            nameStore,
            name,
            visibility
        } = req.body
        const newCategory = new modelCategory({
            admin,
            nameStore,
            name,
            img: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            visibility,
            delete: false,
            date: `${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()} `
        })

        const saveCategory = await newCategory.save()
        res.status(201).json({
            message: 'category created with success',
            category: saveCategory
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const admin = req.authAdmin.adminId
        const getCategories = await modelCategory.find({
            admin
        }).select('-admin')
        if (!getCategories) {
            return res.status(404).json({
                message: 'No categories found'
            })
        }
        res.status(200).json({
            categories: getCategories
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// update category
exports.updateCategory = async (req, res) => {
    try {

        // variables
        const admin = req.authAdmin.adminId
        const idCategory = req.params.id

        // FIELDS
        const fields = ['name', 'visibility', 'delete']

        // find category
        const findCategory = await modelCategory.find({
            admin,
            _id: idCategory
        })

        if (!findCategory) {
            res.status(404).json({
                message: 'category not found'
            })
        }

        // create objet the all prop as changed
        const newUpdate = {}

        fields.forEach(field => {
            if (req.body[field]) {
                newUpdate[field] = req.body[field]
            }
        })

        if(req.file){
            newUpdate.img=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    

        // Update the category in the database
        const updateCategory = await modelCategory.findByIdAndUpdate(
            idCategory, {
                $set: newUpdate
            }, {
                new: true,
                runValidators: true
            }
        )


        res.status(200).json({
            message: 'category post  update with successful',
            updateCategory
        })


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}