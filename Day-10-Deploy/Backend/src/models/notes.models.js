const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: String,
    discription: String,
})

const noteModule=mongoose.model("notes", notesSchema);

module.exports=noteModule;