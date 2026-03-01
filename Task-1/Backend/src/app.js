const express = require('express');

const app=express();
const noteModule=require('./models/note.model');
const cors=require('cors');
const path=require('path');

app.use(express.json())
app.use(cors());
app.use(express.static('./public'));



app.post('/api/notes',async(req,res)=>{
    const {title,description}=req.body;
    const note=await noteModule.create({
        title,description
    })
    res.status(201).json({
        message:'Note created successfully',
        note
    })
})

app.get('/api/notes',async(req,res)=>{
    const notes=await noteModule.find();
    res.status(200).json({
        message:"fetching notes",
        notes

    })
})

app.delete('/api/notes/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    await noteModule.findByIdAndDelete(id);
    res.status(200).json({
        message:'Note deleted successfully'

    })

})

app.patch('/api/notes/:id',async(req,res)=>{
    const id= req.params.id;
    const {title,description}=req.body;
    await noteModule.findByIdAndUpdate(id,{title,description});
    res.status(200).json({
        message:'Note updated successfully'
    })
})
app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..",'/public/index.html'))
})

module.exports=app;