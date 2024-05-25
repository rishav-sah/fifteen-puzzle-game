import { useEffect, useState } from "react";
import Header from "./Header";
import Puzzle from "./Puzzle";
import { generateSolvableBoard } from "../utils/utilities";
import Instructions from "./Instructions";

// Main component for the game
const Game = () => {
  // State for tracking if the game is running
  const [isRunning, setIsRunning] = useState(false);
  // State for tracking number of moves
  const [moves, setMoves] = useState(0);
  // State for tracking elapsed time
  const [time, setTime] = useState(0);
  // State for the current board setup
  const [board, setBoard] = useState(generateSolvableBoard());
  // State to check if the puzzle is solved
  const [isSolved, setIsSolved] = useState(false);

  // Effect for handling the game timer
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      // Create an interval to update the time every second if the game is running
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      // Clear interval if the game is not running and time is not zero
      clearInterval(interval);
    }
    // Clean up the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [isRunning, time]);

  // Function to start the game
  const startGame = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  // Function to toggle the running state of the game
  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  // Function to reset the game
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setMoves(0);
    setBoard(generateSolvableBoard());
    setIsSolved(false);
  };

  // Function to reset moves and time (unused in current implementation)
  const resetMovesAndTime = () => {
    setTime(0);
    setMoves(0);
  };

  // Function to increment the move count
  const incrementMoves = () => {
    setMoves((prevMoves) => prevMoves + 1);
  };

  // Render the game components with props
  return (
    <div className="w-full">
      <Header
        moves={moves}
        time={time}
        onStartPause={handleStartPause}
        onReset={handleReset}
        isRunning={isRunning}
      />
      <Puzzle
        board={board}
        setBoard={setBoard}
        incrementMoves={incrementMoves}
        startGame={startGame}
        isRunning={isRunning}
        resetMovesAndTime={resetMovesAndTime}
        setIsSolved={setIsSolved}
      />
      <Instructions />
    </div>
  );
};

export default Game;
