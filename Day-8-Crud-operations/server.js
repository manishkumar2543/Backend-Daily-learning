const app=require('./src/app');
const mongoose=require('mongoose');
const ConectDB =require('./src/config/database');
const noteModel=require('./src/models/notes.model');
require('dotenv').config();

ConectDB();








app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})