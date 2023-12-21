import React from "react";

const Buttons = ({type, className, id, onClick, text}) => {
    return(
        <div className="buttons-box">
            <button type={type} className={className} id={id} onClick={onClick}>{text}</button>
        </div>
    );
}
export default Buttons;