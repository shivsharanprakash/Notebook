import React, { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:3001"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    //Get all  notes 
    const getNotes = async () => {
        //API Cell
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }

        });
        const json = await response.json();
        console.log(json)
        setNotes(json)

    }


    //add notes 
    const addNote = async (id, title, description, tag) => {
        //API Cell
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
               
    }



    //delete note
    const deleteNote = async (id) => {

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

        });
        const json = response.json();
        console.log(json);
        //TODO: api call
        console.log("deleting the note with id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }



    //edit a  Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
  
            },
            body: JSON.stringify({ title, description, tag })
        });
    
        // Check for a successful response
        if (!response.ok) {
            console.error("Failed to update note");
            return;
        }
    
        const updatedNote = await response.json();
        // console.log(updatedNote);
    
        // Update the note in the client state
        let newNotes = notes.map(note => note._id === id ? updatedNote : note);
        setNotes(newNotes);
    };
    



    return (
        <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}



export default NoteState;