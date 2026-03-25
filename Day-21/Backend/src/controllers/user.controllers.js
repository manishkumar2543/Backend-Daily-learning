const followModel=require('../models/follow.model')


async function followUserController(req,res){
    const followerUsername=req.user.username
    const followeeUsername=req.params.username

    if(followerUsername == followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }
    const isAlredayFollowing=await followModel.findOne({
        follower:followerUsername,
        followee: followeeUsername
    })
    if(isAlredayFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
       
        })


    }
    const followRecord=await followModel.create({
       follower:followerUsername,
       followee: followeeUsername
    })

    res.status(201).json({
        message:`follow request to send ${followeeUsername}`,
        follow:followRecord
    })
}

async function unfollowUserController(req,res){
    const followerUsername=req.user.username
    const followeeUsername=req.params.username

    const isAlredayFollowing=await followModel.findOne({
        follower:followerUsername,
        followee: followeeUsername
    })
    if(!isAlredayFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isAlredayFollowing._id)

    res.status(200).json({
        message:`You have unfollow ${followeeUsername}`

    })

}



module.exports={
    followUserController,
    unfollowUserController,
   


}