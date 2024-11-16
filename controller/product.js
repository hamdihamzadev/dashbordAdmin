const modelproduct = require('../models/product')
const modelCategory = require('../models/categoryProduct')
const modelOrders = require('../models/order')
const modelreview = require('../models/review')

// create product
exports.createProduct = async (req, res) => {
    try {
        const {
            category,
            nameStore,
            name,
            price,
            quantity,
            description,
            shipping,
            promotion,
        } = req.body
        const parsePromotion = JSON.parse(promotion)
        const newProduct = new modelproduct({
            admin: req.authAdmin.adminId,
            category,
            nameStore,
            name,
            price,
            quantity,
            description,
            shipping,
            promotion: parsePromotion,
            imgs: req.files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`),
            visibility: true,
            delete: false,
            date: `${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`
        })

        const saveProduct = await newProduct.save()

        res.status(201).json({
            product: saveProduct
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// for delete for visibility for another data
exports.updateProduct = async (req, res) => {
    try {
        const fields = ['category', 'name', 'price', 'quantity', 'description', 'shipping', 'visibility', 'delete']
        const idProduct = req.params.id

        // find product
        const findProduct = await modelproduct.findOne({
            _id: idProduct,
            admin: req.authAdmin.adminId
        })

        // verification product
        if (!findProduct) {
            return res.status(404).json({
                error: 'product not found'
            })
        }

        // create object product update
        const update = {}
        if (req.files && req.files.length > 0) {
            update.imgs = req.files.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`)
        }

        if (req.body.promotion) {
            update.promotion = JSON.parse(req.body.promotion)
        }

        fields.forEach(field => {
            if (req.body[field]) {
                update[field] = req.body[field]
            }
        });

        // Update the product in the database
        const updateProduct = await modelproduct.findByIdAndUpdate(
            idProduct, {
                $set: update
            }, {
                new: true,
                runValidators: true
            }
        )

        // Check if the update was successful
        if (!updateProduct) {
            return res.status(400).json({
                message: 'product is not update'
            })
        }

        // Send successful response
        res.status(200).json({
            message: 'product is update with success',
            updateProduct: updateProduct
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}

// get one product
exports.getOneProduct = async (req, res) => {
    try {
        const findProduct = await modelproduct.findOne({
            _id: req.params.id,
            admin: req.authAdmin.adminId,
        }).select('-admin')

        if (!findProduct) {
            return res.status(404).json({
                error: 'product not found'
            })
        }
        res.status(200).json({
            product: findProduct
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


// get all products
exports.getAllProducts = async (req, res) => {
    try {

        // GET ID ADMIN
        const admin = req.authAdmin.adminId

        // GET ALL PRODUCTS
        const getProducts = await modelproduct.find({
            admin
        }).select('-admin')
        if (!getProducts) {
            return res.status(404).json({
                message: 'no products found'
            })
        }

        // SEND PRODUCTS
        res.status(200).json({
            products: getProducts
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// get products the category
exports.getProductsCategoryForStore = async (req, res) => {
    try {
        // get variables
        const idCategory = req.params.id
        const nameStore = req.params.nameStore

        // FIND PRODUCTS
        const findProducts = await modelproduct.find({
            nameStore,
            category: idCategory,
            visibility: true,
            delete: false
        }).select('-admin').lean()

        if (!findProducts) {
            res.status(404).json({
                message: 'products is not found or deleted/invisibile'
            })
        }

        // FIND ORDERS
        const getOrders = await modelOrders.find({
            nameStore
        }).select('-admin')

        if (!getOrders) {
            res.status(404).json({
                message: 'orders is not found'
            })
        }

        // FIND REVIEWS
        const getReviews=await modelreview.find({
            nameStore,
        }).select('-admin')


        //  UPDATE TABLE PRODUCTS
        const updatedProducts = findProducts.map(product=>({
            ...product,
            orders:getOrders.filter(order => order.product === product._id).length,
            reviews:getReviews.filter(review => review.product === product._id ).length
        }))
            


        // send products the category
        res.status(200).json({
            message: 'products is get with succefule',
            products: updatedProducts
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}