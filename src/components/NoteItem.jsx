import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context=useContext(noteContext);
    const { deleteNote } = context;
    const { note ,updateNote} = props;
    
    return (
        <div className='col-md-4'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-3" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfully","success");}}></i>
                        <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(note);}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
