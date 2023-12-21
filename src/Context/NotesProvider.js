import React, { useEffect, useReducer, useState } from "react";
import DataStorage from "../Storage/DataStorage";
import NotesContext from "./NotesContext";

const NotesProvider = ({children}) => {
    const [noteId, setNoteId] = useState(1);
    const [data, storedData] = DataStorage("content",[]);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem("content"))){
            const list = JSON.parse(localStorage.getItem("content"));
            const idx = list[list.length - 1].id + 1;
            setNoteId(idx);
            notesDispatch({type:"Create", payLoad: list});
        }
    },[]);

    function notesReducer(state, action){
        if(action.type === "ADD"){
            return {...state, update:action.payLoad};
        }
        if(action.type === "CREATE"){
            let newList = [...state.list];

            if(Array.isArray(action.payLoad)){
                newList = [...action.payLoad];
            }else{
                newList.push({
                    id : noteId,
                    title: action.payLoad.title,
                    content: action.payLoad.content,
                    color: "#ffffff",
                    edit: false,
                    delete: false
                });
                setNoteId(noteId + 1);
            }
    
            storedData(newList);
            
            return {...state, list:newList, update:false};
        }
        if(action.type === "EDIT"){
            const newList = [...state.list];
            for(let i = 0; i<newList.length; i++){
                if(newList[i].id === Number(action.payLoad)){
                    newList[i].edit = true;
                    break;
                }
            }
            return{...state, list: newList};
        }
        if(action.type === "DELETE"){
            const notes = [...state.list];
            const newList = notes.filter(val => val.id !== Number(action.payLoad));
            storedData(newList);
            return{...state, list:newList};
        }

        if(action.type === "SAVE"){
            const newList = [...state.list];
            for(let i = 0; i<newList.length; i++){
                if(newList[i].id === Number(action.payLoad)){
                    newList[i].edit = false;
                    newList[i].title = action.payLoad.title;
                    newList[i].content = action.payLoad.content;
                    break;
                }
            }
            storedData(newList);
            return {...state, list:newList}
        }
        if(action.type === "COLORCHANGE"){
            const newList = [...state.list];
            for(let i = 0; i<newList.length; i++){
                if(newList[i].id === Number(action.payLoad)){
                    newList[i].color = action.payLoad.color;
                    break;
                }
            }
            storedData(newList);
            return {...state, list:newList}
        }
        if(action.type === "RESET"){
            
            storedData([]);
            return {...state, list:[]}
        }
        if(action.type === "SEARCH"){
            const listItem = [...state.list];
            let newlist = [];
            if(action.payLoad === ""){
                return {...state, searchItemList:[]};
            }
            
            newlist = listItem.filter((val) => val.title.substring(0,action.payLoad.length).toLowerCase() === action.payLoad);
            
            return {...state, searchItemList:newlist};
        }
        return state;
    }

    const [noteState, notesDispatch] = useReducer(notesReducer,{
        list: [],
        searchItemList:[],
        update:false
    });

    return (
        <NotesContext.Provider value={{noteState, notesDispatch}}>
            {children}
        </NotesContext.Provider>
    );
};
export default NotesProvider;