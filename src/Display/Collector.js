import React, { useContext } from "react";
import Navbar from "./Navbar";
import NotesContext from "../Context/NotesContext";
import NotesMaker from "../Notes_Section/NotesMaker";
import Buttons from "../Components/Buttons";
import NotesList from "../Notes_Section/NotesList";

const Collector = () => {
    const {noteState, notesDispatch} = useContext(NotesContext);

    function resetNotes(){
        if(window.confirm("It's change your original content.")){
            notesDispatch({type:"RESET"});
        }
    }

    return (
        <div className="collector-container">
            <Navbar/>
            <div className="Reset-content">
                {
                    noteState.list.length === 0 ?  "" : <Buttons text={"RESET"} className={"Reset-Button"} onClick={resetNotes}/>
                }
            </div>
            {
                    noteState.list.length === 0 ?  <h1 className="Empity-list">No notes added</h1> : <NotesList/>
            }
            {
                !noteState.update ? "" : <NotesMaker/>
            }
        </div>
    );
}
export default Collector;