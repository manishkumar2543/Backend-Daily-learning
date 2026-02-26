const app=require('./src/app');
const mongoose=require('mongoose');

require('dotenv').config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const ConnectToDatabase=require('./src/config/database');
ConnectToDatabase();


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})