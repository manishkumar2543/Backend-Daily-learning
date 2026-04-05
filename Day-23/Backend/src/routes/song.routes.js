const express=require('express')

const router=express.Router()
const songController=require('../controllers/song.controller')
const upload=require('../middlewares/song.middleware')



router.post('/',upload.single('song'),songController.uploadSong)



module.exports=router