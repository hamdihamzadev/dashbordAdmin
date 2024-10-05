const modelproduct = require('../models/product')
const modelCategory=require('../models/categoryProduct')

// create product
exports.createProduct = async (req, res) => {
    try {
        const {
            category,
            name,
            price,
            quantity,
            description,
            shipping,
            promotion,
            imgs
        } = req.body

        const newProduct = new modelproduct({
            admin: req.authAdmin.adminId,
            category,
            name,
            price,
            quantity,
            description,
            shipping,
            promotion,
            imgs: imgs.map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`),
            visibility: true,
            delete: false,
            date: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()

        })

        const saveProduct = await newProduct()
        if (!saveProduct) {
            return res.status(400).json({
                message: 'product is not created'
            })
        }
        res.status(201).json({
            message: 'product is created with success',
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
        const fields = ['category', 'name', 'price', 'quantity', 'description', 'shipping', 'promotion', 'imgs', 'visibility', 'delete']
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

        // create object  product update
        const update = {}

        fields.forEach(field => {
            if (req.body[field]) {
                if (field === 'imgs') {
                    update[field] = req.body[field].map(file => `${req.protocol}://${req.get('host')}/images/${file.filename}`);
                } else {
                    update[field] = req.body[field];
                }
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
            message: 'product is delete with success',
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}

// get one product
exports.getOneProduct = async (req,res) => {
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

// get products the category
exports.getProductsCategory=async(req,res)=>{
    try{
        // get variables
        const idCategory= req.params.id
        const admin=req.authAdmin.adminId

         // find category
        const findCategory=await modelCategory.findOne({_id:idCategory,admin,delete:false}).select('-admin')
        if(!findCategory){
            res.status(404).json({
                message: 'category is not found or deleted'
            })
        }

        // find products
        const findProducts=await modelproduct.find({admin,category:idCategory,delete:false}).select('-admin')
        if(!findProducts){
            res.status(404).json({
                message: 'products is not found or deleted'
            })
        }

        // send products the category
        res.status(200).json({
            message:'products is get with succefule',
            products:findProducts
        })
    }
    
    catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}

// get all products
exports.getAllProducts=async (req,res)=>{
    try{

        // GET ID ADMIN
        const admin=req.authAdmin.adminId

        // GET ALL PRODUCTS
        const getProducts=await modelproduct.find({admin}).select('-admin')
        if(!getProducts){
            return res.status(404).json({message:'no products found'})
        }

        // SEND PRODUCTS
        res.status(200).json({products:getProducts})

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}


