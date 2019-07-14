/* Utils.js */
/* This file contains functions you can use anywhere in your application */

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
      return {
        line: lines[i],
        player: squares[a]
      };
    }
  }
  return null;
}

export function findRow(location) {
  let rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  for (let i = 0; i < rows.length; i++) {
    if(rows[i].indexOf(location) > -1)
      return i + 1;
  }
  return null;
}