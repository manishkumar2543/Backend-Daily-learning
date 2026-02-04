const mongoose=require('mongoose')

function ConnectToDb(){
    mongoose.connect('mongodb+srv://sita:4S3p8tyr0GfcNXev@cluster0.00jn2d4.mongodb.net/Day-9')
    .then(()=>{
        console.log('Conntect to MongoDB')
    })
}

module.exports=ConnectToDb