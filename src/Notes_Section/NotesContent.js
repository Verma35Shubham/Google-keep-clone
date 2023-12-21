import React from "react";

const NotesContent = ({rows, cols, className, id, placeholder, value, onChange}) =>{
    return (
        <div className="notesContent-box">
            <textarea rows={rows} cols={cols} className={className} id={id} placeholder={placeholder} value={value} onChange={onChange}></textarea>
        </div>
    );
}
export default NotesContent;