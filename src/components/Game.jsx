import { useEffect, useState } from "react";
import Header from "./Header";
import Puzzle from "./Puzzle";
import { generateSolvableBoard } from "../utils/utilities";
import Instructions from "./Instructions";

const Game = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [board, setBoard] = useState(generateSolvableBoard());
  const [isSolved, setIsSolved] = useState(false); // Track if the puzzle is solved

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startGame = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setMoves(0);
    setBoard(generateSolvableBoard());
    setIsSolved(false);
  };

  const resetMovesAndTime = () => {
    setTime(0);
    setMoves(0);
  };

  const incrementMoves = () => {
    setMoves((prevMoves) => prevMoves + 1);
  };

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
