import React,{useState} from 'react';
import Board from "./components/Board";
import { calculateWinner } from './helper';
import "./styles/root.scss";

const App = () => {
  const [board, setBoard]= useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(false);

  const winner = calculateWinner(board);

  const message = winner ? `Winner is ${winner}` : `Next Player is ${isNext ? "X" : "O"}`;
 
const handleSquareClicked = (position) => {
  if(board[position] || winner){
    return;
  }
  setBoard((prev)=>{
    return prev.map((square,pos)=>{
      if(pos===position){
        return isNext ? "X" :"O";
      }
      return square;
    });
  });
  setIsNext(prev =>!prev)
};

  return (
    <div className="app">
      <h1>TIK TAC TOE!</h1>
      <h2>{message}</h2>
      <Board board={board} handleSquareClicked={handleSquareClicked}/>
    </div>
  );
};

export default App;
