import { useContext, useEffect } from "react";
import { getFeed,createPost, likePost,unlikePost } from "../services/post.api";
import { PostContext } from "../post.context";
import { data } from "react-router";




export  const usePost=()=>{
    const context=useContext(PostContext)
    const {loading,setLoading,post,setPost,feed,setFeed}=context

      const handleGetFeed=async()=>{
        setLoading(true)
        const data=await getFeed()
        setFeed(data.post)
        setLoading(false)
      }


      const handleCreatePost=async(imageFile,caption)=>{
        setLoading(true)
         const data=await createPost(imageFile,caption)
        setFeed([data.post,...feed])
        setLoading(false)
    
       } 
       
       const handlelike=async(post)=>{
         setLoading(true)
         const data=await likePost(post)
         await handleGetFeed()
         setLoading(false)
       }

       const handleUnlike=async(post)=>{
        setLoading(true)
        const data=await unlikePost(post)
        await handleGetFeed()
        setLoading(false)
       }

       const handleFollow=async(userId)=>{
        setLoading(true)
        const data=await followUser(userId)
        await handleGetFeed()
        setLoading(false)
       }

       useEffect(()=>{
        handleGetFeed()
       },[])

      return {loading,handleGetFeed,post,feed,handleCreatePost,handlelike,handleUnlike}
       
        

}



