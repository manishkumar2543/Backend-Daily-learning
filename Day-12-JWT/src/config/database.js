const mongoose=require('mongoose');

function ConnectToDatabase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB');
    })
}

module.exports=ConnectToDatabase;

