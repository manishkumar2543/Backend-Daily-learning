const mongoose = require("mongoose");

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDb");
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports=ConnectToDB