import React, { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './helper';
import History from "./components/History";
import StatusMessage from "./components/StatusMessage";
import './styles/root.scss';

const NEW_GAME = [{ board: Array(9).fill(null), isNext: true },]

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  const {winner, winningSquares} = calculateWinner(current.board);

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
    setCurrentMove(0)
  }

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  }

  return (
    <div className="app">
      <h1>TIK TAC TOE!</h1>
      <StatusMessage winner={winner}  current={current}/>
      <Board board={current.board} handleSquareClicked={handleSquareClicked} winningSquares={winningSquares}/>
      <button type="button" onClick={onNewGame}>Start New Game</button>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  );
};

export default App;
