import React, { useState } from "react";

const DataStorage = (key, info) => {
    const [currentInfo, setCurrentInfo] = useState(info); // this state store the or update the information

    const storedData = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setCurrentInfo(value);
    };
    return [currentInfo, storedData];
}

export default DataStorage;