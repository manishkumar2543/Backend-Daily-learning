import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState([   ])
  console.log('inteigraete')
  
  function fetch(){
      axios.get('http://localhost:3000/api/notes')
     .then((res)=>{
     setNotes(res.data.note)
    })
  }

  // useEffect 
useEffect(()=>{
  fetch()
},[]) 
// form Hndler create
function submitHandler(e) {
  e.preventDefault();

  const { title, description } = e.target.elements;

  console.log(title.value, description.value);
   axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value,
    })
    .then((res) => {
      console.log(res.data);
      fetch()
    });
}

function handleDeleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then((res)=>{
      console.log(res.data)
      fetch()
    })
}

function handleUpdateNote(noteId,title,description){
  console.log(noteId)
  axios.patch(`http://localhost:3000/api/notes/${noteId}`,
    {
      title, description,

  })
  .then((res)=>{
    console.log(res.data)
    fetch()
  })
}
   


  return (

    <div>
         <form className="note-create-form" onSubmit={submitHandler}>
         <input type="text" name="title" placeholder="Title" />
          <input type="text" name="description" placeholder="Description" />
          <button type="submit">Submit</button>
</form> 
    
    <div className='notes'>
       {notes.map((note,idx)=>{
        return  <div className="note" key={idx}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>

          <button onClick={()=>handleDeleteNote(note._id)}>Delete</button>

         <button
             onClick={() =>
              handleUpdateNote(note._id, note.title, note.description)
               }>
                 Update
           </button>

        </div>
        
       })}
        
    </div>
     </div>
  )
}

export default App