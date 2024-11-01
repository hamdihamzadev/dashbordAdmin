const ModelAdmin = require('../models/admin')
const bcrypt = require('bcrypt')
const jsw = require('jsonwebtoken')
require('dotenv').config()


exports.SignUp = async (req, res) => {
    try {
        const {
            firsName,
            lastName,
            email,
            password
        } = req.body

        // Verify email if it has been used before
        const vfEmail = await ModelAdmin.findOne({
            email: email
        })
        if (vfEmail) {
            return res.status(404).json({
                message: 'email already used'
            })
        }

        // hash password for security
        const hashPassword = await bcrypt.hash(password, 10)

        // create new admine
        const newAdmin = new ModelAdmin({
            firsName,
            lastName,
            email,
            password: hashPassword,
            date: `${new Date().getDate()} - ${+ new Date().getMonth()} - ${new Date().getFullYear()}`
        })

        await newAdmin.save()

        res.status(200).json({
            message: 'Your account is created with successful'
        })


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.Login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        // verification email already registered
        const admin = await ModelAdmin.findOne({
            email: email
        })
        if (!admin) {
            return res.status(404).json({
                message: 'email is incorrecte'
            })
        }

        // verification password
        const vfPassword = await bcrypt.compare(password, admin.password)
        if (!vfPassword) {
            return res.status(404).json({
                message: 'passwrod is incorrecte'
            })
        }

        res.status(200).json({
            token: jsw.sign({
                    adminId: admin._id
                },
                process.env.JWT_SECRET_ADMIN, {
                    expiresIn: '24h'
                }
            )
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}


exports.getAdmin = async (req, res) => {
    try {

        // GET ID ADMIN
        const adminId = req.authAdmin.adminId

        // FIND ADMIN
        const findAdmin = await ModelAdmin.findOne({
            _id: adminId
        }).select('-admin')

        // verification if already used
        if (!findAdmin) {
            return res.status(404).json({
                message: 'admin is not found'
            })
        }

        res.status(200).json({
            admin: findAdmin
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}



// page confirmation with code 
// enter the code 
// verification if code are true 
// code 2540 save in 