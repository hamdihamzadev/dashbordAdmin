const modelOrder = require('../models/order')

exports.createOrder = async (req, res) => {
    try {

        // GET AUTH ADMIN
        const admin = req.authAdmin.adminId
        const customer=req.authCustomer.customerId

        // FIELDS 
        const {
            adressDelivery,
            discount,
            total,
            stutsInSuivi,
            stutsInTable,
            notes,
            orderItem
        } = req.body

        // CREATE ORDER
        const newOrder = new modelOrder({
            admin,
            customer,
            adressDelivery,
            discount,
            total,
            stutsInSuivi,
            stutsInTable,
            notes,
            orderItem,
            date: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()

        })

        if (!newOrder) {
            return res.status(400).json({
                message: 'error in created order'
            })
        }

        res.status(201).json({
            message: 'order is created with successful'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// CREATE ORDER BY ADMIN
exports.createOrderByAdmin=async(req,res)=>{
    try {

        // GET AUTH ADMIN
        const admin = req.authAdmin.adminId
        const customer=req.params.id

        console.log(customer,'customer')
        console.log(req.body)

        // FIELDS 
        const {
            contry,
            city,
            adress,
            discount,
            total,
            notes,
            orderItem,
        } = req.body

        // CREATE ORDER
        const newOrder = new modelOrder({
            admin,
            customer,
            contry,
            city,
            adress,
            discount,
            total,
            stutsInSuivi:'New',
            stutsInTable:'Not treat',
            notes,
            orderItem,
            date: `${new Date().getDate()}-${new Date().getMonth() }-${new Date().getFullYear()}`

        })

        const saveOrder=await newOrder.save()

        res.status(201).json({
            message: 'order is created with successful',
            order:saveOrder
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET ORDERS CUSTOMERS IN STORE
exports.getOrdersCustomer = async (req, res) => {
    try {

        // GET AUTH
        const admin = req.authAdmin.adminId
        const customerId = req.authCustomer.customerId

        // GET ORDERS 
        const getOrders = await modelOrder.find({
            admin,
            customer: customerId
        }).select('-admin')
        if (!getOrders) {
            return res.status(404).json({
                message: 'customer dont have any order'
            })
        }

        // SEND ORDERS
        res.status(200).json({
            orders: getOrders
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET ORDERS CUSTOMERS FOR ADMIN
exports.getOrdersCustomerForAdmin = async (req, res) => {
    try {
        // GET AUTH ADMIN AND ID CUSTOMER
        const admin = req.authAdmin.adminId
        const customerId = req.params.id

        // GET ORDERS 
        const getOrders = await modelOrder.find({
            admin,
            customer: customerId
        }).select('-admin')
        if (!getOrders) {
            return res.status(404).json({
                message: 'customer dont have any order'
            })
        }

        // SEND ORDERS
        res.status(200).json({
            orders: getOrders
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET ALL ORDERS FOR ADMIN
exports.getAllOrders = async (req, res) => {
    try {

        // GET AUTH ADMIN
        const admin=req.authAdmin.adminId

        // GET ALL ORDERS
        const getOrders=await modelOrder.find({admin})
        if(!getOrders){
            return res.status(500).json({
                message: 'There is no order'
            })
        }

        // SEND ORDERS
        res.status(200).json({
            orders: getOrders
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}

