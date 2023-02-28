import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 7, ncols = 7, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    console.log(nrows);
    console.log(ncols);
    console.log(chanceLightStartsOn);
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let tempRow = [];
      for (let j = 0; j < ncols; j++) {
        let cell = Math.random() < chanceLightStartsOn;
        console.log(cell)
        tempRow.push(cell);
      }
      console.log(tempRow)
      initialBoard.push(tempRow);
    }
    console.log(initialBoard)
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    console.log(board);
    return board.every(row => row.every(cell => !cell))
    
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const newBoard = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x + 1, newBoard);


      // TODO: return the copy

      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return (
      <div>
        <h1 className="Board-winner">YOU HAVE WON!</h1>
      </div>
    )
  }


  // TODO

  let gameBoard = [];

  for (let i = 0; i < nrows; i++) {
    let gameRow = [];
    for (let j = 0; j < ncols; j++) {
      let coords = `${i}-${j}`;
      gameRow.push(
        <Cell 
          key={coords} 
          isLit={board[i][j]} 
          flipCellsAroundMe={() => flipCellsAround(coords)}
        />
      );
    }
    gameBoard.push(<tr key={i}>{gameRow}</tr>);
  }

  // TODO

  return (
    <table className="Board">
      <tbody>{gameBoard}</tbody>
    </table>
    )
  
}

export default Board;