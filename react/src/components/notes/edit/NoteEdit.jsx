import React, { useState, useEffect } from 'react';
import { saveNote, getNoteById } from '../../../core/api/notes.api';
import { Redirect } from 'react-router-dom';
import './NoteEdit.css';

export function NoteEdit(props) {

    const [currentNote, setCurrentNote] = useState({title: '', content: '', authorId: '', authorName: '' });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    console.log(props);
    useEffect(() => {
        if (props.computedMatch.params.id) {
            getNoteById(props.computedMatch.params.id).then((result) => {
                setCurrentNote(result.data);
            });
        }
    }, [props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setCurrentNote((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onNoteSave = (event) => {
        event.preventDefault();
        saveNote(currentNote).then(() => { 
            setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }
    

    return (
        <>
        { shouldRedirect && <Redirect to="/notes" /> }
        <div className="note-edit-wrapper">
            <form onSubmit={onNoteSave}>
                <div className="form-group">
                    <label labelfor="title">Title: </label>
                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentNote.title} />
                </div>
                <div className="form-group">
                    <label labelfor="content">Content: </label>
                    <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentNote.content} />
                </div>
                <button className="btn btn-primary">Save Post</button>
            </form>         
        </div>
        </>
    )
    
}