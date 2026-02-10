const mongoose=require('mongoose');

const noteSchema= new mongoose.Schema({
    title: String,
    discription: String,
   
})

// Creating model from schema -  iske bina Crud operations nhi ho payenge✍
const noteModel= mongoose.model('notes',noteSchema);

module.exports= noteModel;