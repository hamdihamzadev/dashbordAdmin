const modelCategory=require('../models/categoryProduct')

exports.createCategory= async (req,res)=>{
    try{
        const admin=req.authAdmin.adminId
        const {name} = req.body

        const newCategory=new modelCategory({
            admin,
            name,
            img:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            visibility:true,
            delete:false,
            date:new Date().getDate() +'-'+ new Date().getMonth() +'-'+  new Date().getFullYear()
        })

        // save category
        const saveCategory=await newCategory.save()
        if(!saveCategory){
            return res.status(400).json({message:'category is not created'})
        }
        res.status(201).json({
            message:'category created with success',
            category:saveCategory
        })
       }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.GetAllCategories=async(req,res)=>{
    try{
        const getCategories=await modelCategory.find({admin:req.authAdmin.adminId,delete:false}).select('-admin')

        if(!getCategories || getCategories.length===0){
            return res.status(404).json({message:'no category found'})
        }
        res.status(200).json({categories:getCategories})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.updateCategory=async(req,res)=>{
    try{
        const categoryId=req.params.id
        const adminId=req.authAdmin.adminId

       // find category
       const findCategory=await modelCategory.findOne({
        _id:categoryId,
        admin:adminId
       })

       // verification category
       if(!findCategory){
        return res.status(404).json({message:'category not found or not authorized'})
       }

       // create objet the all prop as changed
       const newUpdate={}

       if(req.body.name){
        newUpdate.name=req.body.name
       }

       if(req.body.img){
        newUpdate.img= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       }

       if(req.body.visibility){
        newUpdate.visibility= req.body.visibility
       }

       if(req.body.delete){
        newUpdate.delete= req.body.delete
       }

       newUpdate.date= new Date().getDate() +'-'+ new Date().getMonth() +'-'+  new Date().getFullYear()

       // update category 
       const updateCategory=await modelCategory.findByIdAndUpdate(
        categoryId,
        { $set : newUpdate },
        { new : true,runValidators: true}
       )

       if(!updateCategory){
        return res.status(400).json({message:'category is not update'})
       }

       res.status(200).json({message:'category is delete with success'})
       
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}