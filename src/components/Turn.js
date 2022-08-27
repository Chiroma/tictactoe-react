import React from "react";


export default function Turn(props){

    let symbol = props.turn? 'x' : 'o';

    return (
        <div className="header">
            <div className="turn"><i className={"fa-solid fa-"+symbol}></i> Turn</div>
        </div>
    );
}