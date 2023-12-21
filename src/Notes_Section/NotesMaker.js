import React, { useContext, useState } from "react";
import NotesContent from "./NotesContent";
import Input from "../Components/Input";
import Buttons from "../Components/Buttons";
import NotesContext from "../Context/NotesContext";

const NotesMaker = () => {
    const {noteState, notesDispatch} = useContext(NotesContext);
    const[data, setData] = useState({title:"", content:""});

    function handleSubmit(event){
        event.preventDefault();
        if(data.title === "" || data.content === ""){
            return;
        }
        notesDispatch({type:"CREATE", payLoad:{...data}});
        setData({title:"", content:""});
    }
    function closeModel(event){
        if(event.target.className === "note-container"){
            notesDispatch({type:"ADD", payLoad:false});
        }
    }

    return(
    <div className="maker-container" onClick={closeModel}>
        <div className="notes-form">
            <form onSubmit={handleSubmit}>
                <Input type={"text"} placeholder={"Title..."} onChange={(e) => {setData({...data, title:e.target.value})}}/>
                <NotesContent rows={4} cols={25} placeholder={"start your notes..."} className={"note-content-flow"} onChange={(e) => {setData({...data, content:e.target.value})}}/>
                <Buttons type={"submit"} className={"submit-Button"} text={"Add Note"}/>
            </form>
        </div>
    </div>);
}
export default NotesMaker;