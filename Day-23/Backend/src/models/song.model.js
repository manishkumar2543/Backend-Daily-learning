const mongoose=require('mongoose')


const songSchema=new mongoose.Schema({
     url:{
        type:String,
        require:true
     },
     posterUrl:{
        type:String,
        require:true
     },
     title:{
        type:String,
        require:true
     },
     mood:{
        type:String,
        enum:{
            values:['sad','happy','wow','sleep'],
            message:'Enum this is'
        }
     }
     
})
const songModel=mongoose.model('song',songSchema)
module.exports=songModel