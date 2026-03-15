const mongoose=mongoose('mongoose')


const followSchema= new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        require:[true,'Follower is required']

    },
    followee:{
        type: mongoose.Schema.Types.ObjectId,
        require:[true,'Followee is required']
    },

    
},{
    timestamps:true
})

const followModel=mongoose.model('follows',followSchema)

module.exports=followModel