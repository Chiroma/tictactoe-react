

export function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log("We have a winner: " + squares[a]);
        return squares[a];
      }
    }
    return null;
}

export function isMovesLeft(squares){
    return squares.includes(null);
}

export function evaluate(squares){
    const symbol = calculateWinner(squares);
    if(symbol === 'x'){
        return -10;
    }else if(symbol === 'o'){
        return 10;
    }

    return 0;
}

export function minmax(squares, depth, isMax, player, opponent){

    const score = evaluate(squares);

    if(score === 10){
        return score - depth;
    }

    if(score === -10){
        return score + depth;
    }

    if(!isMovesLeft(squares)){
        return 0;
    }

    if(isMax){
        let best = -10000;
        for(let i = 0; i  < squares.length; i++){
            if(squares[i] === null){
                squares[i] = player;
                best = Math.max(best, minmax(squares, depth+1, !isMax, player, opponent));
                squares[i] = null;
            }
        }

        return best;
    }else{
        let best = 10000;
        for(let i = 0; i  < squares.length; i++){
            if(squares[i] === null){
                squares[i] = opponent;
                best = Math.min(best, minmax(squares, depth+1, !isMax, player, opponent));
                squares[i] = null;
            }
        }

        return best;
    }
}


export function findBestMove(squares, player, opponent){
    let best = -10000;
    let bestMove = -1;
    //console.log(squares);
    for(let i = 0; i  < squares.length; i++){
        if(squares[i] === null){
            squares[i] = player;
            console.log("squares when move is being tried: ");
            console.log(squares);
            let moveVal = minmax(squares, 0, false, player, opponent);
            squares[i] = null;
            console.log("squares after move has been tried: ");
            console.log(squares);
            if(moveVal > best){
                bestMove = i;
                best = moveVal;
            }
        }
    }

    return bestMove;
}