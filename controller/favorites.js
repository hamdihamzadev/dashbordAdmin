const modelFavorites = require('../models/favorites')

// CREATION FAVORITES FOR CUSTOMER IN SIGNUP ==> get
exports.CreateFavorites = async (req, res) => {
    try {
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // CREATE FAVORITES
        const newFavorites = new modelFavorites({
            admin,
            customer,
            items: []
        })

        // SAVE FAVORITES
        const saveFavorites = await newFavorites.save()
        if (!saveFavorites) {
            return res.status(400).json({
                message: 'favorite the customer is not created'
            })
        }

        // SEND FAVORITES
        res.status(201).json({
            message: 'favorite the customer is created with successful'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET FAVORITES CUSTOMER ==> get
exports.GetFavoriteCustomer = async (req, res) => {
    try {
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // FIND FAVORITES THE CUSTOMER
        const findFavorites = await modelFavorites.findOne({
            admin,
            customer
        }).select('-admin')

        if (!findFavorites) {
            return res.status(404).json({
                message: 'Customer dont have Favorites'
            })
        }

        // SEND FAVORITES THE CUSTOMER
        res.status(200).json({
            favorites: findFavorites
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// ADD ITEM TO FAVORITES ===> post
exports.AddItemToFavorites = async (req, res) => {
    try {
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // NEW ITEM
        const newItem = req.body.item

        // FIND CUSTOMER
        const listCustomer = await modelFavorites.findOne({
            admin,
            customer
        })
        if (!listCustomer) {
            return res.status(404).json({
                message: 'customer dont have any favorites'
            })
        }

        // PUSH ITEM TO TABLE
        listCustomer.items.push(newItem)

        // SAVE ITEM
        const saveItem = await listCustomer.save()
        if (!saveItem) {
            res.status(400).json({
                message: 'item is not save list'
            })
        }

        res.status(201).json({
            message:'item is add in cart with successful',
            newItem
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// DELETE ITEM ==> put
exports.deleteItem = async (req, res) => {
    try {
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // ID ITEM 
        const idItem= req.body.idItem

        // FIND LIST CUSTOMER
        const listCustomer = await modelFavorites.findOne({
            admin,
            customer
        })
        if (!findCustomer) {
            return res.status(404).json({
                message: 'customer dont have any favorites'
            })
        }

        // DELETE ITEM
        listCustomer.items.forEach(ele => ele._id === idItem ? ele.delete = true : '')

        // SAVE LIST CUSTOMER
        const saveList = await listCustomer.save()
        if (!saveList) {
            return res.status(400).json({
                message: 'delete item is not finish with successful'
            })
        }

        res.status(200).json({
            message: 'delete producut with successful'
        })


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET PRODUCT DELETE
exports.getProductsDeleted = async (req, res) => {
    try {
        // ID ADMIN
        const admin = req.authAdmin.adminId

        // GET ALL FAVORIRES THE ADMIN 
        const findAllFavorires = await modelFavorites.find({
            admin
        })
        if (!findAllFavorires) {
            return res.status(404).json({
                message: 'you dont have any customer have here favorites'
            })
        }

        // GET PRODUCTS 
        const productsDeleted = []
        findAllFavorires
            .map(favor => favor.items.length !== 0 ? favor.items : '')
            .forEach(itemsCustomer => itemsCustomer
            .forEach(item => item.delete === true ? productsDeleted.push(item.product) : ''))

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}