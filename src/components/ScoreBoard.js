import React from "react";



export default function ScoreBoard(){
    return(
        <div className="score">
            <div className="score-card">
                <p>X (YOU)</p>
                <p>14</p>
            </div>
            <div className="score-card">
                <p>TIES</p>
                <p>32</p>
            </div>
            <div className="score-card">
                <p>O (CPU)</p>
                <p>11</p>
            </div>
        </div>
    );
}