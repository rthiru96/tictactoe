import React from 'react';

const StatusMessage = ({ winner, current }) => {
  const noMoviesLeft = current.board.every(el => el !== null);
  return (
    <h2>
      {winner && `${winner}`}
      {!winner && !noMoviesLeft && `Next Player is ${current.isNext ? 'X' : 'O'}`}
      {!winner && noMoviesLeft && "X and O tied"}
    </h2>
  );
};

export default StatusMessage;
