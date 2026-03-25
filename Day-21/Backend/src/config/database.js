    const mongoose=require('mongoose');


    const ConnectToDb=async()=>{
        try{
            await mongoose.connect(process.env.MONGO_URI)
            console.log('Connect to MongoDb')
        }
        catch(err){
            console.log(err)
        }
    }

    module.exports=ConnectToDb