const modelCategory=require('../models/categoryProduct')

// CREATE CATEGORY
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

// GET ALL CATEGORIES
exports.GetAllCategories=async(req,res)=>{
    try{
        const getCategories=await modelCategory.find({admin:req.authAdmin.adminId}).select('-admin')

        if(!getCategories || getCategories.length===0){
            return res.status(404).json({message:'no category found'})
        }
        res.status(200).json({categories:getCategories})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// CREATE CATEGORY
exports.updateCategory=async(req,res)=>{
    try{

        // GET ID ADMIN AND CATEGORY
        const categoryId=req.params.id
        const adminId=req.authAdmin.adminId

        // FIELDS
        const fields=['name','img','visibility','delete']

       // FIND CATEGORY
       const findCategory=await modelCategory.findOne({
        _id:categoryId,
        admin:adminId
       })

       // VERIFICATION CATEGORY
       if(!findCategory){
        return res.status(404).json({message:'category not found or not authorized'})
       }

       // create objet the all prop as changed
       const newUpdate={}

       fields.forEach(field=>{
        if(req.body[field]){
            if(field==='img'){
                newUpdate[field]=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }else{
                newUpdate[field]=req.body[field]
            }
        }
       })

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



