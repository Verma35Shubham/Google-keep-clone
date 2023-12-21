import React from "react";

const Input = ({type, className, id, placeholder, value, onChange}) => {
    return (
        <div className="input-box">
        <input type={type} className={className} id={id} placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
    );
}
export default Input;