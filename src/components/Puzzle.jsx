import { useState } from "react";
import Tile from "./Tile";
import {
  generateSolvableBoard,
  generateUnsolvableBoard,
  isPuzzleSolved,
  isSolvable,
} from "../utils/utilities";

const Puzzle = ({
  board,
  setBoard,
  incrementMoves,
  startGame,
  isRunning,
  resetMovesAndTime,
  setIsSolved,
}) => {
  const [message, setMessage] = useState("The Puzzle is Solvable");
  const [gameStarted, setGameStarted] = useState(false); // Tracks if the game has started at least once

  const handleShuffle = () => {
    resetMovesAndTime();
    const useUnsolvable = Math.random() < 0.5;
    const newBoard = useUnsolvable
      ? generateUnsolvableBoard()
      : generateSolvableBoard();
    const solvable = isSolvable(newBoard);
    setBoard(newBoard);
    setMessage(
      solvable ? "The Puzzle is Solvable" : "The Puzzle is not Solvable"
    );
    setIsSolved(false);
  };

  const handleClick = (index) => {
    const newBoard = [...board];
    const emptyIndex = newBoard.indexOf(0);
    const isAdjacent =
      index === emptyIndex - 1 ||
      index === emptyIndex + 1 ||
      index === emptyIndex - 4 ||
      index === emptyIndex + 4;

    if (isAdjacent) {
      [newBoard[index], newBoard[emptyIndex]] = [
        newBoard[emptyIndex],
        newBoard[index],
      ];
      setBoard(newBoard);
      incrementMoves();
      if (!isRunning) { // Check if the game is not currently
        startGame(); // Ensure the game and timer start if not already running
      }
      if (!gameStarted) {
        startGame();
        setGameStarted(true);
      }
      if (isPuzzleSolved(newBoard)) {
        setIsSolved(true);
        setMessage("Congratulations! Puzzle Solved!");
      }
    }
  };

  return (
    <div className="text-center relative">
      {message && <p className="text-center text-2xl font-bold">{message}</p>}
      <div className="mt-4 p-5 rounded-lg bg-red-300 grid grid-cols-4 grid-rows-4 gap-2 w-96 h-96 m-auto place-items-center">
        {!isRunning && (
          <div className="absolute w-96 h-96 bg-black bg-opacity-50 grid place-items-center cursor-pointer" onClick={() => startGame()}>
            <span className="text-white text-6xl">PLAY</span>
          </div>
        )}
        {board.map((value, index) => (
          <Tile key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button
        onClick={handleShuffle}
        className="mt-4 px-4 py-2 bg-blue-500 text-2xl text-white font-bold rounded hover:bg-blue-700"
      >
        Shuffle
      </button>
    </div>
  );
};

export default Puzzle;
