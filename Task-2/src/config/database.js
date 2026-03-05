const mongoose= require('mongoose')

function ConnectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connect to Db')
    })
}

module.exports=ConnectToDb;