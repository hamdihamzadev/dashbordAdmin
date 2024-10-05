const modelConversion=require('../models/conversion')

exports.addStatus=async (req,res)=>{
    try{
        // GET ID ADMIN
        const admin=req.authAdmin.adminId

        // GET STATUS ORDER
        const status=req.body.status

        const addStatus=new modelConversion({
            admin,
            status,
            date:new Date().getDate() +'-'+ new Date().getMonth() +'-'+  new Date().getFullYear()
        })

        const save=await addStatus.save()
        if(!save){
            return res.status(400).json({message:'status conversion is not created'})
        }

        res.status(201).json({message:'status conversion is created with successful'})

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// GET ALL STATUS
exports.getAllStatus=async(req,res)=>{
    try{
        // GET ID ADMIN
        const admin=req.authAdmin.adminId

        // GET ALL
        const getStatus=await modelConversion.find({admin}).select('-admin')
        if(!getStatus || getStatus.length === 0){
            return  res.status(404).json({message:'dont have any conversion status'})
        }

        // SEND 
        res.status(200).json({conversion:getStatus})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}