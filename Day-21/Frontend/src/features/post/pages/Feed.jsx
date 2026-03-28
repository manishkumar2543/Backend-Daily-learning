import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/userPost'
import Nav from '../../shared/components/Nav'

const Feed = () => {

    const {feed,loading,handleGetFeed,handlelike,handleUnlike}=usePost()
    
    useEffect(()=>{
        handleGetFeed()
    },[])

   if (loading || !feed) {
  return (<main><h1>Loading...</h1></main>)
 }
   console.log(feed)
  return (

    <main className='feed-pages'>
        
        <div className="feed">
            <Nav/>
            <div className="posts">
               {feed.map((post)=>{
                return <Post key={post._id} user={post.user} post={post} handlelike={handlelike} handleUnlike={handleUnlike} loading={loading} />
               })}
               
            </div>
        </div>
    
    </main>
  )
}

export default Feed