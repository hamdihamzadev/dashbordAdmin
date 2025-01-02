
const jwt=require('jsonwebtoken')
require('dotenv').config()


module.exports=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_CUSTOMER)
        const customerId=decodedToken.customerId
        req.authCustomer={
            customerId
        }
        console.log('customerId : ',customerId)
        
        next()
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
