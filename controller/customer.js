const modelCustomer = require('../models/customer')
const modelAdmin=require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// CREATE CUSTOMER
exports.SigninCustomer = async (req, res) => {
    try {
        // GET FIELDS
        const {
            nameStore,
            firstName,
            lastName,
            phone,
            contry,
            email,
            password
        } = req.body


        // find id admin
        const getAdmin=await modelAdmin.findOne({nameStore})

        if (!getAdmin) {
            return res.status(404).json({
                message: 'Admin not found for the specified store'
            })
        }



        // Verify email if it has been used before
        const vfEmail = await modelCustomer.findOne({
            nameStore,
            email
        })
        if (vfEmail) {
            return res.status(404).json({
                message: 'email already used'
            })
        }

        // HASH PASSWORD
        const hashPassword = await bcrypt.hash(password, 10)

        // CREATE NEW CUSTOMER
        const newCustomer = new modelCustomer({
            admin:getAdmin._id,
            nameStore,
            firstName,
            lastName,
            phone,
            contry,
            city:'',
            adress:'',
            email,
            password: hashPassword,
            delete: false,
            block: false,
            status: false,
            date: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`

        })

        // SAVE CUSTOMER
        const saveCustomer = await newCustomer.save()
        if (!saveCustomer) {
            return res.status(400).json({
                message: 'customer is not saved'
            })
        }

        res.status(201).json({
            message: 'Your account is created with successful'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// SIGN IN CUSTOMER
exports.loginCustomer = async (req, res) => {
    try {
        const {email,password,nameStore} = req.body

        // FIND CUSTOMER
        const findCustomer = await modelCustomer.findOne({
            email,
            nameStore
        })

        console.log(req.body)

        // CHECK IF DELETED
        if (!findCustomer) {
            return res.status(400).json({
                message: 'Email is incorrecte'
            })
        } else if (findCustomer.delete === true) {
            return res.status(400).json({
                message: 'Customer is deleted'
            })
        } 

        // verification password
        const vfPassword = await bcrypt.compare(password, findCustomer.password)
        if (!vfPassword) {
            return res.status(404).json({
                message: 'Passwrod is incorrecte'
            })
        }

        res.status(200).json({
            token: jwt.sign({
                    customerId: findCustomer._id
                },
                process.env.JWT_SECRET_CUSTOMER, {
                    expiresIn: '24h'
                }
            ),
            message:'Login is finish with successful'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET CUSTOMER
exports.getCustomerConnected = async (req, res) => {
    try {

        // GET ALL AUTHS 
        const nameStore=req.params.nameStore
        // const customerId = req.authCustomer.customerId
        // console.log(req.body)

        // FIND CUSTOMER
        const findCustomer = await modelCustomer.findOne({
            nameStore,
            // _id: customerId
        }).select('-admin-_id')
        
        if (!findCustomer) {
            return res.status(404).json({
                message: 'customer is not found'
            })
        }

        // send customer
        res.status(200).json({
            customer: findCustomer
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// GET ALL CUSTOMERS
exports.GetAllCustomers = async (req, res) => {
    try {
        const admin = req.authAdmin.adminId

        // GET ALL CUSTOMERS BY ADMIN ID
        const getCustomers = await modelCustomer.find({
            admin
        }).select('-admin')
        if (!getCustomers) {
            return res.status(404).json({
                message: 'No customers found'
            })
        }

        // SEND ALL CUSTOMERS
        res.status(200).json({
            Allcustomers: getCustomers
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// UPDATE CUSTOMER
exports.updateCustomerByUser = async (req, res) => {
    try {
        // GET ALL AUTHS 
        const admin = req.authAdmin.adminId
        const customerId = req.authCustomer.adminId

        // FIELDS 
        const fields = ['firstName', 'lastName', 'phone', 'contry', 'city', 'adress', 'email', 'status']

        // FIND CUSTOMER 
        const findCustomer = await modelCustomer.findOne({
            admin,
            _id: customerId
        })
        if (!findCustomer) {
            return res.status(404).json({
                message: 'customer not found'
            })
        }

        // CREATE OBJECT UPDATE 
        const update = {}
        fields.forEach(field => {
            if (req.body[field]) {
                update[field] = req.body[field]
            }
        })

        // UPDATE CUSTOMER
        const updateCustomer = await modelCustomer.findByIdAndUpdate(
            customerId, {
                $set: update
            }, {
                new: true,
                runValidators: true
            }
        )

        if (!updateCustomer) {
            return res.status(400).json({
                message: 'customer is not update'
            })
        }

        res.status(200).json({
            message: 'customer is update with successful'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// BLOCKED OR UNBLOCKED CUSTOMER BY ADMIN
exports.updateCustomerByAdmin = async (req, res) => {
    try {
        // GET AUTH ADMIN AND ID CUSTOMER
        const admin = req.authAdmin.adminId
        const customerId = req.params.id

        // VALUES
        const deleted = req.body.delete
        const block = req.body.block

        console.log(block)

        // FIND CUSTOMER
        const findCustomer = await modelCustomer.findOne({
            admin,
            _id: customerId
        })
        if (!findCustomer) {
            return res.status(404).json({
                message: 'customer not found'
            })
        }

        const update = {}
        if (deleted !== undefined) { 
            update.delete = deleted;
        }
        if (block !== undefined) { 
            update.block = block;
        }

        // UPDATE BLOCK CUSTOMER
        const updateBlock = await modelCustomer.findByIdAndUpdate(
            customerId,
            { $set: update },
            { new: true , runValidators: true }
        )

        console.log(updateBlock)

        res.status(200).json({
            customerUpdate: updateBlock
        })


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}