import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
 
  const [note, setNote] = useState([])

  console.log('integreate')
  function fetch(){
    axios.get('http://localhost:3000/api/notes')
    .then((res)=>{
      setNote(res.data.notes)
    })
  }

 useEffect(()=>{
  fetch()
 },[])

 function submitHandler(e){
  e.preventDefault(e);
  const {title,description}=e.target.elements;
  console.log(title.value,description.value)
  axios.post('http://localhost:3000/api/notes',{
    title: title.value,
    description: description.value
  })
  fetch()
 }

 function handleDeleteNote(noteId){
  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then((res)=>{
    console.log(res.data)
    fetch()
  })
 }

function handleUpdateNote(noteId){
  const newTitle=prompt('Enter new title', note.title);
  const newDescription=prompt('Enter new description', note.description);
  axios.patch(`http://localhost:3000/api/notes/${noteId}`,{
    title: newTitle,
    description: newDescription
  })
  .then((res)=>{
    console.log(res.data)
    fetch()
  })
}



 
    

  return (
    <>
      <div className="create-form">
        <form onSubmit={submitHandler}>
          <input type="text" name='title' placeholder='Title' />
          <input type="text" name='description' placeholder='Description' />
          <button type='submit'>Create Note</button>
         
        </form>
      </div>
      <div className="note-detail">
        {note.map((note,idx)=>{
          return <div key={idx} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button className='btn' onClick={()=>handleDeleteNote(note._id)}>Delete</button>
            <button className='btn' onClick={()=>handleUpdateNote(note._id)}>Update</button>
          </div>
        })}
      </div>

    </>
  )
}

export default App