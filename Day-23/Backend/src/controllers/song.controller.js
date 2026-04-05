
const songModel=require('../models/song.model')
const storageServices=require('../services/storage.services')
const id3=require('node-id3')


async function uploadSong(req,res){
    const songBuffer=req.file.buffer;
   const tags= id3.read(songBuffer)
   console.log(tags)
   
  const songFile= await storageServices.uploadFile({
     buffer:songBuffer,
     filename:tags.title + '.mp3',
     folder:'cohort-2/moodify-songs'
   })

   const posterFile=await storageServices.uploadFile({
    buffer:tags.image.imageBuffer,
    filename:tags.title + '.jpeg',
    folder:'cohort-2/moodify-posters'
   })   

   const song=await songModel.create({
    url:songFile.url,
    posterUrl:posterFile.url,
    title:tags.title,
    mood
   })

   res.status(201).json({
    message:'Song uploaded successfully',
    song
   })


}

module.exports={
    uploadSong
}



// ImageBuffer not read properly