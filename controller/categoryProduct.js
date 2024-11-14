const modelCategory=require('../models/categoryProduct')

// CREATE CATEGORY
exports.createCategory= async (req,res)=>{
    try{
        const admin=req.authAdmin.adminId
        const {name,nameStore,visibility} = req.body

        const newCategory=new modelCategory({
            admin,
            nameStore,
            name,
            img:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            visibility,
            delete:false,
            date:`${new Date().getDate() +'-'+ new Date().getMonth() +'-'+  new Date().getFullYear()}`
        })
        // save category
        const saveCategory=await newCategory.save()

        // delete admin
        const category=saveCategory.toObject()
        delete category.admin

        res.status(201).json({
            message:'category created with success',
            category
        })
       }
    catch(error){
        res.status(500).json({error})
    }
}

// GET ALL CATEGORIES
exports.GetAllCategories=async(req,res)=>{
    try{
        const getCategories=await modelCategory.find({admin:req.authAdmin.adminId}).select('-admin')

        if(!getCategories){
            return res.status(404).json({message:'no category found'})
        }
  
        res.status(200).json({categories:getCategories})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

exports.getCatgegoriesByCustomer=async (req,res)=>{
    try{
        const nameStore=req.params.namestore
        const getCategories=await modelCategory.find({nameStore}).select('-admin')
        
        if(!getCategories){
            return res.status(404).json({message:'no category found'})
        }
        res.status(200).json({categories:getCategories})
    }
    catch(error){
        res.status(500).json({error})
    }
}

// CREATE CATEGORY
exports.updateCategory=async(req,res)=>{
    try{
        
        // GET ID ADMIN AND CATEGORY
        const categoryId=req.params.id
        const adminId=req.authAdmin.adminId

        // FIELDS
        const fields=['name','visibility','delete']

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
           newUpdate[field]=req.body[field]
        }
       })

       if(req.file){
        newUpdate.img=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       }

       // update category 
       const categoryUpdate=await modelCategory.findByIdAndUpdate(
        categoryId,
        { $set : newUpdate },
        { new : true,runValidators: true}
       )

       res.status(200).json({categoryUpdate})

    }
    catch(error){
        res.status(500).json({error})
    }
}



