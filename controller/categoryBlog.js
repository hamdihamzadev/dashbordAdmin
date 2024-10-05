const modelCategory = require('../models/categoryBlog')

// create category
exports.createCategory=async(req,res)=>{
    try{
        const admin=req.authAdmin.adminId
        const {name,img,visibility}=req.body
        const newCategory=new modelCategory({
            admin,
            name,
            img:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            visibility,
            delete:false,
            date:new Date().getDate() +'-'+ new Date().getMonth() +'-'+  new Date().getFullYear()
        })
        const saveCategory=await newCategory.save()
        if(!saveCategory){
            res.status(400).json({message:'category post is not created'})
        }
        res.status(201).json({
            message:'category created with success',
        })
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// get all categories
exports.getAllCategories=async(req,res)=>{
    try{
        const admin=req.authAdmin.adminId
        const getCategories=await modelCategory.find({admin}).select('-admin')
        if(!getCategories){
            return res.status(404).json({message:'No categories found'})
        }
        res.status(200).json({categories:getCategories})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// update category
exports.updateCategory=async(req,res)=>{
    try{

        // variables
        const admin=req.authAdmin.adminId
        const idCategory=req.params.id
        const fields=['name','img','visibility','delete']

        // find category
        const findCategory=await modelCategory.find({admin,_id:idCategory})
        if(!findCategory){
            res.status(404).json({message:'category not found'})
        }
        
        // create object category update
        const update={}
        fields.forEach(field=>{
            if(req.body[field]){
                if(field==='img'){
                    update[field]= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }else{
                    update[field]=req.body[field]
                }
            }
        })

       // Update the category in the database
       const updateCategory=await modelCategory.findByIdAndUpdate(
        idCategory,
        {$set:update},
        {new:true,runValidators: true}
       )

       // verification if update was successful
       if(!updateCategory){
        return res.status(400).json({message:'category post is not update'})
       }

       res.status(200).json({message:'category post  update with successful'})


    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}