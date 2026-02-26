import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([])
  

  console.log('intergration')

  function fetchNotes(){
     axios.get('https://backend-daily-learning-2.onrender.com//api/notes')
      .then((res)=>{
        setNotes(res.data.notes);
  })
  }

 
 useEffect(()=>{
     fetchNotes();
 },[])

 function submitHandler(e){
  e.preventDefault();
  const {title,discription}=e.target.elements;
  console.log(title.value, discription.value)

  axios.post('https://backend-daily-learning-2.onrender.com/api/notes',{
    title:title.value,
    discription:discription.value
  })
  .then((res)=>{
    console.log(res.data);
    fetchNotes();
  })

 }

 function deleteHandler(noteid){
  axios.delete(`https://backend-daily-learning-2.onrender.com/api/notes/${noteid}`)
  .then((res)=>{
    console.log(res.data);
    fetchNotes();
  })
 }

 function updateHandler(note){
  const newTitle=prompt('Enter new title',note.newTitle );
  const newDiscription=prompt('Enter new discription',note.newDiscription );
  axios.patch(`https://backend-daily-learning-2.onrender.com/api/notes/${note._id}`,{
    title:newTitle,
    discription:newDiscription
  })
  .then((res)=>{
    console.log(res.data);
    fetchNotes();
  })

 }
  

  return (
   <>
   <form onSubmit={submitHandler} className='form-note'>
    <input type="text" name='title' placeholder='Title' />
    <input type="text" name='discription' placeholder='Discription' />
    <button type='submit'>Submit</button>
   </form>
    <div className="notes">
    
      {notes.map((note,idx)=>{
        return  <div key={idx} className="note" >
        <h1>{note.title}</h1>
        <p>{note.discription}</p>
        <button onClick={()=>deleteHandler(note._id)}>Delete</button>
        <button onClick={()=>updateHandler(note)}>Update</button>
      </div>
      })}
      
    </div>
   </>
  )
}

export default App