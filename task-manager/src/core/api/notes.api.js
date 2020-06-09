import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiUrl = "http://localhost:3005";

export const NoteStatus = {
    Active: 'Active',
    Pending: 'Pending',
    Done: 'Done'
}

export async function getAllNotes(searchParam) {
    const allNotes = (await axios.get(`${apiUrl}/notes`)).data;

    if (!searchParam)
        return allNotes;

    const loweredParam = searchParam.toLowerCase();
    return allNotes.filter(note => note.title.toLowerCase().includes(loweredParam) || note.content.toLowerCase().includes(loweredParam));
}

export function SaveNote(noteData){
    const loggedUser = getLoggedUser();
    if(noteData.id){
        return axios.put(`${apiUrl}/notes/${noteData.id}`, noteData);
    }
    if(!noteData.status){
        noteData.status = NoteStatus.Active;
    }
    noteData.authorId =loggedUser.id;
    noteData.authorName =loggedUser.name;
    noteData.date = new Date();
    
    return axios.post(`${apiUrl}/notes`,noteData);
}

export function deleteNote(id){
    return axios.delete(`${apiUrl}/notes/${id}`);
}

export function getNoteById(id){
    return axios.get(`${apiUrl}/notes/${id}`);
}

export async function getNotesByAuthorId(authorId,searchParam){
    const allNotes =  await getAllNotes();
    return allNotes.filter(note => note.authorId ===authorId);
}

export function getMyNotes(searchParam){
    const loggedUserId = getLoggedUser().id;
    return getNotesByAuthorId(loggedUserId,searchParam);
}

export async function deleteNotesForAuthor(authorId){
    const notes = await getNotesByAuthorId(authorId);
    notes.forEach(note=>{
        deleteNote(note.id);
    });
}