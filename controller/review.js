const modelReview=require('../models/review')

// ADD REVIEW
exports.addReview=async(req,res)=>{
    try{
        // ID ADMIN AND CUSTOMER
        const admin= req.authAdmin.adminId
        const customer=req.authCustomer.customerId

        // ADD REVIEW
        const addReview=new modelReview({
            admin,
            customer,
            product:req.body.product,
            comment:req.body.comment,
            rating:req.body.rating,
            date: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()

        })

        // SAVE REVIEW
        const saveReiew=await addReview.save()
        if(!saveReiew){
            return res.status(400).json({message:'reveiew is not saved'})
        }

        // SEND REVIEW
        res.status(200).json({review:saveReiew})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// GET ALL REVIEWS
exports.getAllReviews=async(req,res)=>{
    try{
        // GET ID ADMIN
        const admin=req.authAdmin.adminId
        
        // GET REVIEWS
        const getReviews=await modelReview.find({admin}).select('-admin')
        if(!getReviews){
            return res.status(404).json({message:'there is no review'})
        }

        // SEND REVIEWS
        res.status(200).json({reviews:getReviews})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// GET REVIEWS ONE PRODUCT
exports.getReviewsOneProduct=async(req,res)=>{
    try{
        // GET ID ADMIN AND ID PRODUCT
        const admin=req.authAdmin.adminId
        const idProduct=req.params.id

        // FIND REVIEWS THE PRODUCT
        const findReviews=await modelReview.find({admin,product:idProduct}).select('-admin')
        if(!findReviews){
            return  res.status(404).json({message:'this product dont have any review'})
        }

        // SEND REVIEWS
        res.status(200).json({reviews:findReviews})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

// GET REVIEWS ONE CUSTOMER
exports.GetReviewsOneCustomer=async(req,res)=>{
    try{
        // GET ID ADMIN AND ID CUSTOMER
        const admin=req.authAdmin.adminId
        const customer=req.authCustomer.customerId

        // FIND REVIEWS THE CUSTOMER
        const findReviews=await modelReview.find({admin,customer}).select('-admin')
        if(!findReviews){
            return  res.status(404).json({message:'this customer dont have any review'})
        }
       
        // SEND REVIEWS
        res.status(200).json({reviews:findReviews})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}