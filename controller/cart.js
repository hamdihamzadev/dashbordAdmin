const modelCart = require('../models/cart')
const modelAdmin = require('../models/admin')
const modelProduct = require('../models/product')


// CREATE CART IN SIGN UP
exports.createCart = async (req, res) => {
    try {
        // GET ID  CUSTOMER AND NAME STORE AND ID CUSTOMER
        const nameStore = req.body.nameStore
        const customer = req.authCustomer.customerId

        const dataAdmin = await modelAdmin.findOne({
            nameStore
        })

        if (!dataAdmin) {
            return res.status(404).json({
                message: 'Store not found'
            });
        }

        const idAdmin = dataAdmin._id

        // CREATE NEW CART 
        const cart = await modelCart.findOne({
            nameStore,
            admin: idAdmin,
            customer
        })


        if (!cart) {
            const newCart = new modelCart({
                customer,
                admin: idAdmin,
                nameStore,
                items: [],
                date: `${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`
            })

            const saveCart = await newCart.save()
            // SEND CART
            res.status(201).json({
                message: 'Cart the customer is created with successful',
                cart: saveCart

            })
        }



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
        const nameStore = req.params.nameStore
        const customer = req.authCustomer.customerId

        // FIND CART THE CUSTOMER
        const findCart = await modelCart.findOne({
                nameStore,
                customer,
            })
            .select('-admin -customer')
            .populate('items.product')
            .lean()

        findCart.items = findCart.items.filter(ele => ele.product !== null)

        // SEND FAVORITES THE CUSTOMER
        res.status(200).json({
            cart: findCart
        })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// ADD ITEM TO CART
exports.AddItemToCart = async (req, res) => {
    try {

        //  ------------------- GET INFORMATIONS ----------------------
        // ID ADMIN AND CUSTOMER
        const cartId = req.params.cartId
        const customer = req.authCustomer.customerId
        // BODY
        const product = req.body.product
        const quantity = req.body.quantity

        // FIND PRODUCT
        const findProduct = await modelProduct.findOne({
            _id: product
        })

        //  ------------------- CHECK PRODUCT IF ALREADY EXIST IN CART ----------------------
        const cartForCheck=await modelCart.findOne({
            _id: cartId,
            customer
        })
        .lean()
        
        const checkProduct= cartForCheck.items.find(ele=>ele.product===product)
        console.log(checkProduct)


        // CHECK AVAIBILITY
        if (!findProduct || findProduct.visibility === false || findProduct.delete === true) {
            return res.status(404).json({
                message: 'The product is no longer available in the store'
            })
            // CHECK STOCK
        } else if (findProduct.quantity === 0) {
            return res.status(404).json({
                message: 'stock out',
                newCart: cartCustomer,
            })
            // CHECK QUANTITE COMMANDE
        } else if (findProduct.quantity < quantity) {
            return res.status(404).json({
                message: `Only ${findProduct.quantity} items are left in stock; please reduce the quantity.`,
                newCart: cartCustomer,
            })
        }


        // FIND CART CUSTOMER
        const cartCustomer = await modelCart.findOne({
            _id: cartId,
            customer
        })

        // PUSH ITEM IN ITEMS CART
        cartCustomer.items.push({
            product,
            quantity,
            delete: false,
            date: `${new Date().getDate()} - ${new Date().getMonth()} - ${new Date().getFullYear()}`
        })

        // SAVE CART
        await cartCustomer.save()

        const updateCart = await modelCart
            .findOne({
                _id: cartId,
                customer
            })
            .populate('items.product')
            .select('-admin -customer')

        res.status(201).json({
            message: 'item is add in cart with successful',
            updateCart
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// CHANGE QUANTITY ITEM
exports.changeQuantityItem = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const itemId = req.params.itemId;
        const newQuantity = req.body.newQuantity;

        // FIND CART
        const cartUser = await modelCart.findOne({
            _id: cartId
        }).select('-admin -customer').populate('items.product')

        // FIND PRODUCT
        const findProduct = await modelCart
            .findOne({
                _id: cartId,
                "items._id": itemId
            }, {
                "items.$": 1
            })
            .populate('items.product')

        const product = findProduct.items[0].product
        if (product.quantity === 0) {
            return res.status(404).json({
                message: 'Stock out',
                cartUser
            })
        } else if (product.delete === true || product.visibility === false) {
            return res.status(404).json({
                message: 'The product is no longer available in the store'
            })
        } else if (newQuantity > product.quantity) {
            console.log(cartUser)
            return res.status(404).json({
                message: `Only ${product.quantity} items are left in stock; please reduce the quantity.`,
                cartUser
            })
        }

        const updateItem = await modelCart.findOneAndUpdate({
                _id: cartId,
                "items._id": itemId
            }, {
                $set: {
                    "items.$.quantity": newQuantity
                }
            }, {
                new: true,
                runValidators: true
            })
            .select('-admin -customer')
            .populate('items.product')
            .lean()

        updateItem.items = updateItem.items.filter(ele => ele.product !== null)

        res.status(200).json({
            message: 'Quantity changed successfully',
            cartUpdate: updateItem,
        })

    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

// DELETE ITEM
exports.deleteItem = async (req, res) => {
    try {
        const cartId = req.params.cartId
        const itemId = req.params.itemId
        const customer = req.authCustomer.customerId

        const deleteItem = await modelCart.findOneAndUpdate({
                _id: cartId,
                customer,
                "items._id": itemId
            }, {
                $set: {
                    "items.$.delete": true
                }
            }, {
                new: true
            })
            .select('-admin -customer')
            .populate('items.product')
            .lean()

        deleteItem.items = deleteItem.items.filter(ele => ele.product !== null)

        if (!deleteItem) {
            return res.status(404).json({
                message: 'item is not deleted please try again'
            })
        }

        res.status(200).json({
            cartAfterDeleteItem: deleteItem,
            message: 'item is deleted with success',
        })

    } catch (error) {
        return res.status(error)
            .json({
                error
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
exports.getItemDeletedInCustomer = async (req, res) => {
    try {
        // ID ADMIN AND CUSTOMER
        const admin = req.authAdmin.adminId
        const customer = req.params.idCustomer

        // FIND CART CUSTOMER
        const cartCustomer = await modelCart.findOne({
            admin,
            customer
        }).select('-admin -customer')
        if (!cartCustomer) {
            return res.status(404).json({
                message: 'customer dont have cart'
            })
        }

        // GET PRODUCT DELETED
        const getProductsDeleted = cartCustomer.items.filter(ele => ele.delete === true)
        res.status(200).json({
            products: getProductsDeleted
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


/**
 * on click if ==> not login ==+> modal login 
 * if login ==> post data to backend ==> if product not visible or delete or product delete ===> 
 */