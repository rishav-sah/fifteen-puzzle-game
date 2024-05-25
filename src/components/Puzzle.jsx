import { useState } from "react";
import Tile from "./Tile";
import {
  findNextMove,
  generateSolvableBoard,
  generateUnsolvableBoard,
  isPuzzleSolved,
  isSolvable,
} from "../utils/utilities";

// Main component for managing the puzzle game logic
const Puzzle = ({
  board,
  setBoard,
  incrementMoves,
  startGame,
  isRunning,
  resetMovesAndTime,
  setIsSolved,
}) => {
  // State to display a message about the puzzle's solvability
  const [message, setMessage] = useState("The Puzzle is Solvable");
  // State to track if the game has been started
  const [gameStarted, setGameStarted] = useState(false); 

  // Function to make one move automatically
  const solveOneStep = (board, setBoard) => {
    const newBoard = findNextMove(board);
    setBoard(newBoard);
  };

  // Handler for shuffling the board
  const handleShuffle = () => {
    resetMovesAndTime(); // Reset moves and time
    const useUnsolvable = Math.random() < 0.5; // Randomly decide whether to use an unsolvable board
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

  // Handler for tile click events
  const handleClick = (index) => {
    const newBoard = [...board];
    const emptyIndex = newBoard.indexOf(0); // Find the empty tile
    // Check if the clicked tile is adjacent to the empty tile
    const isAdjacent =
      index === emptyIndex - 1 ||
      index === emptyIndex + 1 ||
      index === emptyIndex - 4 ||
      index === emptyIndex + 4;

    if (isAdjacent) {
      // Swap the clicked tile with the empty tile
      [newBoard[index], newBoard[emptyIndex]] = [
        newBoard[emptyIndex],
        newBoard[index],
      ];
      setBoard(newBoard);
      incrementMoves(); // Increment move count
      if (!isRunning) {
        startGame(); // Start the game if not already running
      }
      if (!gameStarted) {
        startGame(); // Ensure the game is started
        setGameStarted(true);
      }
      if (isPuzzleSolved(newBoard)) { // Check if the puzzle is solved
        setIsSolved(true);
        setMessage("Congratulations! Puzzle Solved!");
      }
    }
  };

  // Render the puzzle and control elements
  return (
    <div className="text-center relative">
      <button onClick={() => solveOneStep(board, setBoard)}>Help me</button>
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

// Export the Puzzle component for use in other parts of the app
export default Puzzle;
