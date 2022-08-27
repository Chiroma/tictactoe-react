
import React, {useState, useRef} from "react";
import "./css/mystyles.css";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import Turn from "./components/Turn";
import { calculateWinner, findBestMove } from "./controllers/functions";

export default function TicTacToe(){

    let [state, setState] = useState({
        xIsNext: true,
        isGameOver: false,
        history: [{squares: Array(9).fill(null)}]
    });
    let overlay = useRef(null);
    let symbol = state.xIsNext? 'x':'o';
    //const history = state.history;
    //const current = history[history.length-1];

    if(!state.xIsNext){
        const history = state.history;
        const current = history[history.length-1];
        const squares = current.squares.slice();
        //console.log(squares);
        let move = findBestMove(squares, 'o', 'x');
        //console.log("best move is: "+move);
        squares[move] = 'o';
        const winner = calculateWinner(squares);
        if(winner) {
            setState({...state, isGameOver: !state.isGameOver});
            overlay.current.style.display = "block";
        }else{
            setState({
                ...state,
                xIsNext: !state.xIsNext,
                history: history.concat([{squares: squares}])
            });
        }
    }

    /* function cpuPlay(){
        const history = state.history;
        const current = history[history.length-1];
        const squares = current.squares.slice();
        //console.log(squares);
        let move = findBestMove(squares, 'o', 'x');
        //console.log("best move is: "+move);
        squares[move] = 'o';
        const winner = calculateWinner(squares);
        if(winner) {
            setState({...state, isGameOver: !state.isGameOver});
            overlay.current.style.display = "block";
        }else{
            setState({
                ...state,
                xIsNext: !state.xIsNext,
                history: history.concat([{squares: squares}])
            });
        }
    } */

    function handleClick(i) {
        const history = state.history;
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(squares[i]){return;}
        squares[i] = state.xIsNext? 'x' : 'o';
        const winner = calculateWinner(squares);
        if(winner) {
            setState({...state, isGameOver: !state.isGameOver});
            overlay.current.style.display = "block";
        }else{
            setState({
                ...state,
                xIsNext: !state.xIsNext,
                history: history.concat([{squares: squares}])
            });
            //cpuPlay();
        }
        
    }

    function startGame(){
        setState({
            xIsNext: true,
            isGameOver: false,
            history: [{squares: Array(9).fill(null)}]
        });
        overlay.current.style.display = "none";
    }

    return(
        <div>
            <div className="overlay" ref={overlay}>        
                <div className="text">
                    <p>Game Over</p>
                    <p>{<i className={"fa-solid fa-"+ symbol}></i>} wins!</p>
                    <button className="button is-large" onClick={()=>{startGame()}}>New Game</button>
                </div>        
            </div>
            <main className="main">
                <Turn turn={state.xIsNext}/>
                <Board 
                    turn={state.xIsNext}
                    squares={state.history[state.history.length-1].squares}
                    onClick={(i)=>handleClick(i)}
                />
                <ScoreBoard />
            </main>
        </div>
    );
}