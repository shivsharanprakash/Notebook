import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: " " });
            props.showAlert(" Added Successfuly","success");
        } catch (error) {
            console.error("Failed to add note:", error);
        }
    };

    const onChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container my-4">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} id="description" name='description' onChange={onChange} minLength={5} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange} />
                </div>

                <button disabled={note.title.length<3 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote
