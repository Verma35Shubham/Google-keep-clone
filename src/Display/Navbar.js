import React, { useContext } from "react";
import NotesContext from "../Context/NotesContext";
import Buttons from "../Components/Buttons";
import Input from "../Components/Input";
import logoImage from "./image/logo.png";


const Navbar = () =>{
    
    const {noteState, notesDispatch} = useContext(NotesContext);

    function addNote(){
        notesDispatch({type:"ADD", payLoad:true});
    }

    function searchByTitle(event){
        if(event.target.value === ""){
            notesDispatch({type:"SEARCH", payLoad:""});
        }
        notesDispatch({type:"SEARCH", payLoad:event.target.value.toLowerCase()});
    }

    return(
        <div className="Navbar-container">
            <div className="navInner-container">
                <div className="logo">
                    <img src={logoImage} style={{ width: "50px", margin: "1rem" }} alt="logo"/>
                    <h3 className="app-name">google keep</h3>
                </div>
                <div className="search-navbar">
                    <Buttons type={"button"} className={"Add-Button"} onClick={addNote} text={"add notes"}/>
                    <Input type={"text"} className={"Search-box"} placeholder={"search your notes here..."} onChange={searchByTitle}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;