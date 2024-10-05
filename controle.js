const modelAdmin=require('./models/admin')
exports.createAdmin=async(req,res)=>{
    try{
        const newAdmin=new modelAdmin({
            firsName:'hamza',
            lastName:'hamza',
            email:'hamzahamdi@gmail.com',
        })
        await newAdmin.save()
       console.log('admin is created')
    }
    catch(error){
        console.log( `admin is created ${error}` )
    }
}