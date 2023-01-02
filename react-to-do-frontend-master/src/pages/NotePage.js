import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import {Link} from 'react-router-dom'
import { createHashHistory } from 'history'
export const history = createHashHistory()

const NotePage = ({ match,history }) => {
    const { id } = useParams();
    
    let [note,setNote] = useState(null)

    useEffect(()=>{
        getNote()
    },[id])

    let getNote = async() =>{
      if (id==='new') return 
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)
    }    

    let createNote = async() =>{
      fetch(`/api/notes/`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      })
    }

    let updateNote = async() =>{
      fetch(`/api/notes/${id}/`,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
      })
    }

    let deleteNote = async()=>{
      fetch(`/api/notes/${id}/`,{
        method:"DELETE",
        headers:{
          'Content-Type': 'application/json'
        }
      })
    }

    let handleSubmit=() => {
      if(id !== 'new' && note.body==''){
        deleteNote()
      } else if (id !== 'new'){
        updateNote()
      } else if (id == 'new' && note !== null){
        createNote()
      }
      
      console.log("clicked")
      
    }
  
  
  return (
    <div className='note'>
      <div  className='note-header'>
        <Link to={"/"}>
          <h3>  
            <ArrowLeft onClick={handleSubmit} />
          
          </h3>
        </Link>
        <Link to={"/"}>
          {id !== 'new' ?(
            <button onClick={deleteNote}> Delete </button>
          ):(
            <button onClick={handleSubmit}> Done </button> 
          )}
        </Link>
      </div>
        <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage