const modelStatus = require("../models/status")

exports.createStatus = async (req, res) => {
    try {
        const newStatus = new modelStatus({
            nameStore: req.body.nameStore,
            admin: req.authAdmin.adminId,
            name: req.body.name,
            icon: req.body.icon,
            delete:false
        })

        const saveStatus = await newStatus.save()   
        if (!saveStatus) {
            res.status(400).json({
                message: 'status not save'
            })
        }

        const filterStatus=await modelStatus.find({admin:req.authAdmin.adminId,delete:false}).select('name icon')

        res.status(200).json({
            message: 'status is created with success',
            status: filterStatus
        })

    } catch (error) {
        console.error(`this is error ${error}`)
        res.status(500).json({
            error
        })
    }
}

exports.getStatus = async (req, res) => {
    try {
        const admin = req.authAdmin.adminId
        const findstatus = await modelStatus.find({
            admin,
            delete: false
        }).select('name icon')

        if (!findstatus) {
            res.status(404).json({
                message: 'dont have any status'
            })
        }

        res.status(200).json({
            status: findstatus
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const admin = req.authAdmin.adminId
        const _id = req.params.id

        const fields = ['name','icon','delete']
        const updateIcon = {}
        fields.forEach(ele => req.body[ele] ? updateIcon[ele] =req.body[ele]:null  )
        const findstatus = await modelStatus.findOneAndUpdate(
            {
            _id,
            admin,
            delete: false
            },
            updateIcon,
            {
            new: true
            }
        )

        if (!findstatus) {
            res.status(404).json({
                message: 'Status is not update'
            })
        }

        const filterStatus=await modelStatus.find({admin:req.authAdmin.adminId,delete:false}).select('name icon')

        res.status(200).json({
            message: 'status is updated with success',
            status: filterStatus
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}