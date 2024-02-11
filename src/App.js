import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

export default function Board() {
  const [xnext, setXnext] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i) {
    if(squares[i] || CalculateWinner(squares)){
      return ;
    }
    const nextSquares = squares.slice();
    if (xnext) {
      nextSquares[i] = "X";
      setXnext(false);
    } else {
      nextSquares[i] = "O";
      setXnext(true);
    }
    setSquares(nextSquares);
  }
  const winner = CalculateWinner(squares);
  let status;
  let Gameover;
  if(winner){
    status = "Winner "+ winner;
    Gameover = "Press F5 to Restart"
  }
  else{
    status = "Next Player " +(xnext?"X":"O");
  }
  
  return (
    <>
    <div className="main">
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="Gameover">{Gameover}</div>
      </div>
    </>
  );
}
function CalculateWinner(square){
const lines = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,5,8],
  [2,4,6]
]

for(let i =0 ; i< lines.length; i++){
  const [a,b,c] = lines[i];
  if(square[a]== square[b] && square[a]== square[c]){
    return square[a];
  }

}
return null;

}

