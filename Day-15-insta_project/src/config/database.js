const mongoose=require('mongoose')

async function ConnectToDb() {
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connect to Db')
    })
    
}
module.exports=ConnectToDb;