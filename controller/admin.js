const ModelAdmin=require('../models/admin')
const bcrypt=require('bcrypt')
const jsw=require('jsonwebtoken')
require('dotenv').config()

exports.SignUp=async (req,res)=>{
    try{
        const {firsName,lastName,email,password,date}=req.body
        
        // Verify email if it has been used before
        const vfEmail= await ModelAdmin.findOne({email:email})
        if(vfEmail){
            return res.status(404).json({message:'email already used'})
        }

        // hash password for security
        const hashPassword=  await bcrypt.hash(password,10)

        // create new admine
        const newAdmin= new ModelAdmin({
            firsName,
            lastName,
            email,
            password:hashPassword,
            date
        })

        // save admin
        const saveAdmin=await newAdmin.save()
        if(saveAdmin){
            return res.status(404).json({message:'admin is not created'})
        }
        res.status(200).json({message:'admin is created'})
    }
    
    catch(error){
        res.status(500).json({message:error.message})
    }
}

exports.Login=async(req,res)=>{
    try{
        const {email,password}=req.body

        // verification email already registered
        const admin=await ModelAdmin.findOne({email:email})
        if(!admin){
            return res.status(404).json({message:'email not found'})
        }

        // verification password
        const vfPassword=await bcrypt.compare(password,admin.password)
        if(!vfPassword){
            return res.status(404).json({message:'passwrod is incorrecte'})
        }

        res.status(200).json({
            adminId:admin._id,
            token:jsw.sign(
                {adminId:admin._id},
                process.env.JWT_SECRET_ADMIN,
                { expiresIn: '24h' }
            )
        })

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.getAdmin=async(req,res)=>{
    try{
        const adminId=req.authAdmin.adminId
        const findAdmin=await ModelAdmin.findById(adminId)

        // verification if already used
        if(!findAdmin){return res.status(404).json({message:'admin is not found'})}

        const adminWithoutPassword = findAdmin.toObject()
        delete adminWithoutPassword.password

        res.status(200).json({admin:adminWithoutPassword})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}