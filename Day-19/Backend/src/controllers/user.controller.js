const followModel=require('../models/follow.model')
const userModel = require('../models/user.model')


async function followUserController(req,res){

    const followerUsername=req.user.username
    const followeeUsername=req.params.username


    const isFolloweeExist= await userModel.findOne({
        username:followeeUsername
    })
    if(!isFolloweeExist){
        return res.status(404).json({
            message:`you are trying to follow does not exist`
        })
    }

    if(followerUsername == followeeUsername){
        return res.status(400).json({
            message:"You cannot follow yourself"
        })
    }

    const isAlredayFollowing=await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(isAlredayFollowing){
        return res.status(200).json({
            message:`You are allready following ${followeeUsername}`,
            follow:isAlredayFollowing
        })
    }

    const followRecord=await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        message:`Follow request sent to ${followeeUsername}`,
        follow:followRecord
    })
    

}

async function unfollowUserController(req,res){
    const followerUsername=req.user.username
    const followeeUsername=req.user.username

    const isUserFollowing= await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }
    // agr follow krta hoga already uska record delete kr denge

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`You have unfollow ${followeeUsername}`,
    })
}




module.exports={
    followUserController,
    unfollowUserController
}
