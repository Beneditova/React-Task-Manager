import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';
import { NoteStatus, deleteNote } from '../../../core/api/notes.api';


const noteCardStyle = {
    maxWidth: '18rem'
}

const deleteBtnStyles = {
    cursor:'pointer'
}

const editBtnStyle ={
    cursor: 'poiner',
    color: 'rgb(139,0,139)'
}

export function NoteCard({ note, onDeleteClick }) {
    const loggedUser = getLoggedUser();

    let noteCardClassByType ="card text-white mb-3 ";
    switch(note.status){
        case NoteStatus.Active :
        noteCardClassByType += "bg-primary" ;   
        break;
        case NoteStatus.Done:
        noteCardClassByType += "bg-success";    
        break;
        case NoteStatus.Pending:
        noteCardClassByType += "bg-secondary"    
        break;
        default:
        noteCardClassByType += "bg-primary"
        break;
    }

    return(
        <div className={noteCardClassByType} style ={noteCardStyle}>
        <div className="card-header">
            {note.title}
            { (loggedUser.isAdmin || loggedUser.id === note.authorId) && <Link style = {editBtnStyle} to={`/notes/edit/${note.id}`} > Edit </Link> }
            { (loggedUser.isAdmin || loggedUser.id === note.authorId) && <span style={deleteBtnStyles} onClick={() => onDeleteClick(note.id)}>Delete</span> }
        </div>
        <div className="card-body">
            <p className="card-text">{note.content}</p>
        </div>
        <div className="card-footer bg-transparent border-secondary">
            <div>Author: {note.authorName}</div>
            <div>Created on: {note.date}</div>
        </div>
    </div>
    )
}