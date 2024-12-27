const modelOrder = require('../models/order')
const modelAdmin = require('../models/admin')

exports.createOrderByCustomer = async (req, res) => {
    try {

        // GET AUTH ADMIN
        const customer = req.authCustomer.customerId

        // FIELDS 
        const {
            nameStore,
            firstname,
            lastname,
            phone,
            contry,
            city,
            adress,
            total,
            notes,
            orderItem,
            status,
        } = req.body

        // GET ID ADMIN
        const admin = await modelAdmin.findOne({
            nameStore
        }).select('_id')

        if (!admin) {
            return res.status(404).json({
                message: 'store not found'
            })
        }

        // RETURN DEADLINE
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 7);
        const returnDeadline = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

        // CREATE ORDER
        const newOrder = new modelOrder({
            admin,
            customer,
            nameStore,
            firstname,
            lastname,
            phone,
            contry,
            city,
            adress,
            total,
            notes,
            orderItem,
            status,
            returnDeadline,
            delete: false,
            date: `${new Date().getDate()}-${new Date().getMonth() }-${new Date().getFullYear()}`
        })

        if (!newOrder) {
            return res.status(400).json({
                message: 'error in created order'
            })
        }

        // GET ORDERS CUSTOMER
        const getOrders = await modelOrder.find({
            admin,
            customer
        }).select('-admin -customer -nameStore')

        if (!getOrders) {
            return res.status(404).json({
                message: 'customer does not have any orders'
            })
        }

        res.status(201).json({
            orders: getOrders,
            message: 'order is created with successful'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// CREATE ORDER BY ADMIN
exports.createOrderByAdmin = async (req, res) => {
    try {

        // GET AUTH ADMIN
        const admin = req.authAdmin.adminId
        const customer = req.params.id

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
            stutsInSuivi: 'New',
            stutsInTable: 'Not treat',
            notes,
            orderItem,
            date: `${new Date().getDate()}-${new Date().getMonth() }-${new Date().getFullYear()}`

        })

        const saveOrder = await newOrder.save()

        res.status(201).json({
            message: 'order is created with successful',
            order: saveOrder
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
        const admin = req.authAdmin.adminId

        // GET ALL ORDERS
        const getOrders = await modelOrder.find({
            admin
        })
        if (!getOrders) {
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