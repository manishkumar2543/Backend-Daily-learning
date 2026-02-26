const express= require('express');

const noteModule=require('./models/notes.models');
const cors=require('cors');
const path=require('path');



const app=express();
app.use(express.json());
app.use(express.static("./public"));
app.use(cors());


app.get('/api/notes',async(req,res)=>{
    const notes=await noteModule.find();
    res.status(200).json({
        message:'Notes fetched successfully',
        notes
    })
})
app.post('/api/notes',async(req,res)=>{
    const {title,discription}=req.body;
    const note=await noteModule.create({title,discription});
    res.status(201).json({
        message:'Note created successfully',
        note
    })
})

app.delete('/api/notes/:id',async(req,res)=>{
    const id= req.params.id;
    await noteModule.findByIdAndDelete(id)
    res.status(200).json({
        message:'Note deleted successfully'
    })
})

app.patch('/api/notes/:id',async(req,res)=>{
    const id= req.params.id;
    const {title,discription}=req.body;
    await noteModule.findByIdAndUpdate(id,{title,discription})
    res.status(200).json({
        message:'Note updated successfully'
        
    })
})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..",'/public/index.html'))
})


module.exports=app;