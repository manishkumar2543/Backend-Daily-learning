const express=require('express');
const noteModel = require('./models/notes.model');

const app=express();

app.use(express.json());

app.post('/notes', async (req,res)=>{
    const {title, discription}=req.body;

    // Create note in database✍
   const note= await noteModel.create({
        title, discription
    })
    // Send response back to client✍
    res.status(201).json({
        message:'Note created successfully',
        // note ka data show karne ke liye✍
        note
    })
})


app.get('/notes', async (req,res)=>{

    // Fetch all notes from database✍
   const notes= await noteModel.find()
    // Send response back to client✍
    res.status(200).json({
        message:'Notes fetched successfully',
        // notes ka data show karne ke liye✍
        notes
    })
})


module.exports=app;