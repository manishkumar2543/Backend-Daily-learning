const mongoose=require('mongoose');

function ConectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
}


module.exports= ConectDB;