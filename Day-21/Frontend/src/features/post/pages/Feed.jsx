import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/userPost'
const Feed = () => {

    const {feed,loading,handleGetFeed}=usePost()
    
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
            <div className="posts">
               {feed.map((post)=>{
                return <Post key={post._id} user={post.user} post={post} />
               })}
               
            </div>
        </div>
    
    </main>
  )
}

export default Feed