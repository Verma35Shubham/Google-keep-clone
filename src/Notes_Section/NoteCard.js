import React, { useContext, useState } from "react";
import NotesContext from "../Context/NotesContext";
import Input from "../Components/Input";
import NotesContent from "./NotesContent";
import Buttons from "../Components/Buttons";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const NoteCard = ({currentInfo}) => {
    const {notesDispatch} = useContext(NotesContext);
    const [edit, setEdit] = useState("");
    
    const cardStyle = {
        backgroundColor: currentInfo.color,
        boxShadow:`0px 0px 16px 4px ${currentInfo.color}`
    };

    function changeCardColor(event){
        const item = event.target.id;
        const id = item.split("");
        const color = event.target.value;
        notesDispatch({type:"COLORCHANGE", payLoad:{id:id[1], color:color}})
    }

    function updateNote(event){
        if(edit.title === "" || edit.content === ""){
            return;
        }
        const id = event.target.parentElement.id;
        notesDispatch({type:"SAVE", payLoad:{id:id, title:edit.title, content:edit.content}});
        setEdit("");
    }
    function editNote(event){
        setEdit({title:currentInfo.title, content:currentInfo.content});
        notesDispatch({type:"EDIT", payLoad:event.target.parentElement.id});
    }

    function deleteNote(event){
        if(window.confirm("Title (" + currentInfo.title + ") will be deleted")){
            notesDispatch({type:"DELETE", payLoad:event.target.parentElement.id});
        }
        event.stopPropagation();
    }

    return (
        <div className="NoteCard-Container">
            <div className="NoteCard-Edit" style={{backgroundColor:cardStyle.backgroundColor, boxShadow:cardStyle.boxShadow}}>
                {
                    currentInfo.edit ? <Input type={"text"} className={"Card-edit-title"}  value={edit.title} onChange={(e) => {setEdit({...edit, title:e.target.value})}}/> : <h3 className="Card-title">{currentInfo.title}</h3>
                }
                {
                    currentInfo.edit ? <NotesContent rows={6} cols={36} className={"Card-edit-content"} value={edit.content} onChange={(e) => {setEdit({...edit, content: e.target.value})}}/>: <pre className="Card-content">{currentInfo.content}</pre>
                }
                <div className="Card-Button">
                    currentInfo.edit? <Buttons className={"Card-save"} id={currentInfo.id} onClick={updateNote} text={<SaveIcon id={currentInfo.id} fontSize='small' sx={{color:"white"}}/>}/>:<Buttons className={"Card-edit"} onClick={editNote} id={currentInfo.id} text={<EditIcon id={currentInfo.id} fontSize='small' sx={{color:"white"}}/>}/>
                </div>
                <Buttons className={"Card-delete"} id={currentInfo.id} onClick={deleteNote} text={<DeleteIcon id={currentInfo.id} fontSize='small' sx={{color:"white"}}/>}/>
                <div className="Card-color-block">
                    <label htmlFor={`favcolor-${currentInfo.id}`} className='Card-color-button'><ColorLensIcon fontSize='small' sx={{color:"white"}}/></label>
                    <Input type={"color"} className={"Card-color"} id={`favIcon-${currentInfo.id}`} value={currentInfo.color} onChange={changeCardColor}/>
                </div>
            </div>
        </div>
    );
}
export default NoteCard;