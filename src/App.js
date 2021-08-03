import React, { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './helper';
import History from "./components/History";
import './styles/root.scss';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isNext: true },
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  const winner = calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next Player is ${current.isNext ? 'X' : 'O'}`;

  console.log(history);

  const handleSquareClicked = position => {
    if (current.board[position] || winner) {
      return;
    }
    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isNext ? 'X' : 'O';
        }
        return square;
      });

      return prev.concat({ board: newBoard, isNext: !last.isNext });
    });

    setCurrentMove(prev => prev + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move)
  }

  return (
    <div className="app">
      <h1>TIK TAC TOE!</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareClicked={handleSquareClicked} />
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
};

export default App;
