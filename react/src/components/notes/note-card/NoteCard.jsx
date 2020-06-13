import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';
import { NoteStatus } from './../../../core/api/notes.api';
import ReactStars from 'react-rating-stars-component';
import ImageUploading from "react-images-uploading";

const maxNumber = 2;

const noteCardStyle = {
    maxWidth: '18rem'
};

const deleteBtnStyles = {
    cursor: 'pointer'
};

const ratingChanged = (newRating) => {
    console.log(newRating)
};
const onChange = imageList => {
    // data for submit
    console.log(imageList);
};

export function NoteCard({ note, onDeleteClick }) {
    const loggedUser = getLoggedUser();

    let noteClassByType = "card text-white m-3 ";
    switch (note.status) {
        case NoteStatus.Active:
            noteClassByType += "bg-primary";
            break;
        case NoteStatus.Done:
            noteClassByType += "bg-success";
            break;
        case NoteStatus.Pending:
            noteClassByType += "bg-secondary";
            break;
        default:
            noteClassByType += "bg-primary";
            break;
    }

    return (
        <div className={noteClassByType} style={noteCardStyle}>
            <div className="card-header">
                {note.title}
                {(loggedUser.isAdmin || loggedUser.id === note.authorId) && <Link to={`/notes/edit/${note.id}`} > Edit </Link>}
                {(loggedUser.isAdmin || loggedUser.id === note.authorId) && <Link to={`/notes/edit/${note.id}`} > Add </Link>}
                {(loggedUser.isAdmin || loggedUser.id === note.authorId) && <span style={deleteBtnStyles} onClick={() => onDeleteClick(note.id)}>Delete</span>}
            </div>
            <div className="card-body">
                <p className="card-text">{note.content}</p>
            </div>
            <div className="card-footer bg-transparent border-secondary">
                <div>Author: {note.authorName}</div>
            </div>
            <ReactStars
                count={9}
                onChange={ratingChanged}
                size={35}
                color2={'#d96a02'} />
             {(loggedUser.isAdmin || loggedUser.id === note.authorId) && 
             <div className="App">
                <ImageUploading multiple onChange={onChange} maxNumber={maxNumber}>
                    {({ imageList, onImageUpload, onImageRemoveAll }) => (
                        <div className="upload__image-wrapper">
                             <button onClick={onImageUpload}>Upload images</button>&nbsp;
                             <button onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map(image => (
                                <div key={image.key} className="image-item">
                                    <img src={image.dataURL} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => { image.onUpdate();}}>Update</button>
                                        <button onClick={image.onRemove}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
            }
        </div>
    )
}
