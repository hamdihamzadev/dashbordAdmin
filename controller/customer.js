const modelCustomer=require('../models/customer')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()

// CREATE CUSTOMER
exports.SigninCustomer= async(req,res)=>{
    try{
        // GET FIELDS
        const {firstName,lastName,phone,contry,city,email,password}=req.body
        const admin=req.authAdmin.adminId

        // Verify email if it has been used before
        const vfEmail=await modelCustomer.findOne({admin,email})
        if(!vfEmail){
            return res.status(404).json({message:'email already used'})
        }

        // HASH PASSWORD
        const hashPassword=bcrypt.hash(password,10)
        
        // CREATE NEW CUSTOMER
        const newCustomer=new modelCustomer({
            admin,
            firstName,
            lastName,
            phone,
            contry,
            city,
            adress:'',
            email,
            password:hashPassword,
            delete:false,
            block:false, 
            date:new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()

        })

        // SAVE CUSTOMER
        const saveCustomer=await newCustomer.save()
        if(!saveCustomer){
            return res.status(400).json({message:'customer is not saved'})
        }

        res.status(201).json({message:'customer is created with successful'})

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// SIGN IN CUSTOMER
exports.loginCustomer = async(req,res)=>{
    try{
        const {email,password}=req.body
        const admin=req.authAdmin.adminId

        // FIND CUSTOMER
        const findCustomer=await modelCustomer.findOne({admin,email})
        if(!findCustomer){
            return res.status(404).json({message:'customer not found'})
        }

        // CHECK IF DELETED
        if(findCustomer.delete===true){
            return res.status(400).json({message:'customer is deleted'})
        }

        // verification password
        const vfPassword=await bcrypt.compare(password,findCustomer.password)
        if(!vfPassword){
            return res.status(404).json({message:'passwrod is incorrecte'})
        }

        res.status(200).json({
            customerId:findCustomer._id,
            token:jwt.sign(
                {customerId:findCustomer._id},
                process.env.JWT_SECRET_CUSTOMER,
                { expiresIn: '24h' }
            )
        })
    }

    catch(error){
        res.status(500).json({error:error.message})
    }
} 

// GET CUSTOMER
exports.getCustomerConnected=async(req,res)=>{
    try{

        // GET ALL AUTHS 
        const admin=req.authAdmin.adminId
        const customerId=req.authCustomer.customerId

        // FIND CUSTOMER
        const findCustomer=await modelCustomer.findOne({admin,_id:customerId}).select('-admin-_id')
        if(!findCustomer){
            return res.status(404).json({message:'customer is not found'})
        }

        // send customer
        res.status(200).json({
            customer:findCustomer
        })
    }

    catch(error){
        res.status(500).json({error:error.message})
    }
}

// GET ALL CUSTOMERS
exports.GetAllCustomers=async(req,res)=>{
    try{
        const admin=req.authAdmin.adminId
        
        // GET ALL CUSTOMERS BY ADMIN ID
        const getCustomers=await modelCustomer.find({admin}).select('-admin')
        if(!getCustomers || getCustomers.length===0 ){
            return res.status(404).json({message:'No customers found'})
        }

        // SEND ALL CUSTOMERS
        res.status(500).json({customers:getCustomers})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// UPDATE CUSTOMER
exports.updateCustomerByUser=async(req,res)=>{
    try{
        // GET ALL AUTHS 
        const admin=req.authAdmin.adminId
        const customerId=req.authCustomer.adminId

        // FIELDS 
        const fields=['firstName','lastName','phone','contry','city','adress','email']

        // FIND CUSTOMER 
        const findCustomer=await modelCustomer.findOne({admin,_id:customerId})
        if(!findCustomer){
            return res.status(404).json({message:'customer not found'})
        }

        // CREATE OBJECT UPDATE 
        const update={}
        fields.forEach(field=>{
            if(req.body[field]){
                update[field]=req.body[field]
            }
        })

        // UPDATE CUSTOMER
        const updateCustomer=await modelCustomer.findByIdAndUpdate(
            customerId,
            {$set:update},
            {new:true, runValidators: true}
        )

        if(!updateCustomer){
            return res.status(400).json({message:'customer is not update'})
        }
        
        res.status(200).json({message:'customer is update with successful'})

    }

    catch(error){
        res.status(500).json({error:error.message})
    }
}

// BLOCKED OR UNBLOCKED CUSTOMER BY ADMIN
exports.blockCustomer=async(req,res)=>{
    try{
        // GET AUTH ADMIN AND ID CUSTOMER
        const admin=req.authAdmin.adminId
        const customerId=req.params.id

        // GET VALUE BLOCK
        const valueBlock=req.body.block

        // FIND CUSTOMER
        const findCustomer=await modelCustomer.findOne({admin,_id:customerId})
        if(!findCustomer){
            return  res.status(404).json({message:'customer not found'})
        }

        // UPDATE BLOCK CUSTOMER
        const updateBlock=await modelCustomer.findByIdAndUpdate(
            customerId,
            {$set:{block:valueBlock}},
            {new:true,runValidators: true}
        )

        if(!updateBlock){
            return res.status(400).json({message:'The customer found is not changed in this block'})
        }

        if(valueBlock===true){
            res.status(200).json({message:'Customer is blocked with success.'})
        }else if (valueBlock===false){
            res.status(200).json({message:'Customer is unblocked with success.'})
        }

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}