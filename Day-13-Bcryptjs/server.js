const app=require('./src/app');
const mongoose=require('mongoose');

require('dotenv').config();
const ConnectToDb=require('./src/config/database');



ConnectToDb();



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})