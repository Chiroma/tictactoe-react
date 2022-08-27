import React from "react";


export default function Cell(props){

    return (
        <div
            className="cell"
            onClick={() => props.onClick() }
        >
            <i className={"fa-solid fa-"+ props.value}></i>
        </div>
    );
}