const mongoose= require('mongoose')

const Schema= new mongoose.Schema({
    title: String,
    description: String,
})
const noteModel=mongoose.model("notes",Schema)

module.exports=noteModel