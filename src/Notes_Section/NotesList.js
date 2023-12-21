import React, { useContext } from "react";
import NotesContext from "../Context/NotesContext";
import NoteCard from "./NoteCard";

const NotesList = () => {
    const {noteState, noteDispatch} = useContext(NotesContext);

    return (
        <div className="notesList">
            <div className="notes-Container">
                {noteState.searchItemList.length > 0 ? noteState.searchItemList.map((val) => (<NoteCard key={val.id} noteData={val}/>)):noteState.list.length>0 && noteState.list.map((val) => (<NoteCard key={val.id} currentInfo={val}/>))}
            </div>
        </div>
    );
}
export default NotesList;