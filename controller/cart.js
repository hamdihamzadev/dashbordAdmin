const modelCart = require('../models/cart')

// CREATE CART IN SIGN UP
exports.createCart = async (req, res) => {
    try {
        // GET ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // CREATE NEW CART
        const newCart = new modelCart({
            admin,
            customer,
            items: []
        })

        // SAVE Cart
        const saveCart = await newCart.save()
        if (!saveCart) {
            return res.status(400).json({
                message: 'cart the customer is not created'
            })
        }

        // SEND CART
        res.status(201).json({
            message: 'Cart the customer is created with successful',

        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

// GET CART CUSTOMER
exports.getCartCustomer = async (req, res) => {
    try {
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // FIND CART THE CUSTOMER
        const findCart = await modelCart.findOne({
            admin,
            customer
        }).select('-admin')

        if (!findCart) {
            return res.status(404).json({
                message: 'Customer dont have Cart'
            })
        }

        // SEND FAVORITES THE CUSTOMER
        res.status(200).json({
            cart: findCart
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// ADD ITEM TO CART
exports.AddItemToCart = async (req, res) => {
    try {
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // NEW ITEM
        const newItem = req.body.item

        // FIND CUSTOMER
        const cartCustomer = await modelCart.findOne({
            admin,
            customer
        })

        if (!cartCustomer) {
            return res.status(404).json({
                message: 'customer dont have any favorites'
            })
        }

        // PUSH ITEM IN ITEMS CART
        cartCustomer.items.push(newItem)

        // SAVE CART
        const saveCart = await cartCustomer.save()

        if (!saveCart) {
            res.status(400).json({
                message: 'item is not save in cart'
            })
        }

        res.status(201).json({
            message: 'item is add in cart with successful',
            newItem
        })


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// DELETE ITEM IN CART 
exports.deleteItemInCart = async (req, res) => {
    try {

        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.authCustomer.customerId

        // ID PRODUCT 
        const idItem = req.body.idItem

        // GET CART CUSTOMER
        const cartCustomer = await modelCart.findOne({
            admin,
            customer
        })
        if (!cartCustomer) {
            return res.status(500).json({
                message: 'customer dont have any cart'
            })
        }

        // DELETE ITEM IN TABLE ITEMS
        cartCustomer.items.forEach(ele => ele._id === idItem ? ele.delete = true : '')

        // SAVE CART CUSTOMER
        const saveCart = await modelCart.save()
        if (!saveCart) {
            return res.status(400).json({
                message: 'delete item is not finish with successful'
            })
        }

        res.status(200).json({
            message: 'delete product in cart with successful'
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
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId

        // GET ALL CARTS THE ADMIN 
        const findAllCarts = await modelCart.find({
            admin
        })
        if (!findAllCarts) {
            return res.status(404).json({
                message: 'you dont have any customer have here carts'
            })
        }

        // GET PRODUCTS 
        const productsDeleted = []
        findAllCarts
            .map(cart => cart.items.length !== 0 ? favor.items : '')
            .forEach(itemsCustomer => itemsCustomer
            .forEach(item => item.delete === true ? productsDeleted.push(item.product) : ''))


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


// GET NUMBERS ITEM DELETED IN CUSTOMER
exports.getItemDeletedInCustomer=async(req,res)=>{
    try{
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.params.idCustomer

        // FIND CART CUSTOMER
        const cartCustomer=await modelCart.findOne({
            admin,
            customer
        }).select('-admin -customer')
        if(!cartCustomer){
            return res.status(404).json({message:'customer dont have cart'})
        }

        // GET PRODUCT DELETED
        const getProductsDeleted= cartCustomer.items.filter( ele => ele.delete === true )
        res.status(200).json({products:getProductsDeleted})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}