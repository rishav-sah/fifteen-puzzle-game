// Utility function to randomly shuffle an array
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get a random index
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
};

// Function to determine if a given board configuration is solvable
export const isSolvable = (board) => {
  let inversions = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = i + 1; j < board.length; j++) {
      if (board[i] && board[j] && board[i] > board[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0; // Solvable if the number of inversions is even
};

// Function to generate a solvable board for the puzzle
export const generateSolvableBoard = () => {
  const board = Array.from({ length: 15 }, (_, i) => i + 1).concat(0); // Create an ordered board with an empty tile
  let solvable = false;
  while (!solvable) {
    shuffleArray(board); // Shuffle the board
    solvable = isSolvable(board); // Check if the board is solvable
  }
  return board;
};

// Function to intentionally generate an unsolvable board
export const generateUnsolvableBoard = () => {
  let board = generateSolvableBoard();
  do {
    const first = Math.floor(Math.random() * (board.length - 1));
    let second = Math.floor(Math.random() * (board.length - 1));
    while (first === second) {
      second = Math.floor(Math.random() * (board.length - 1));
    }
    [board[first], board[second]] = [board[second], board[first]]; // Swap two tiles
  } while (isSolvable(board)); // Ensure the board is not solvable
  return board;
};

// Function to check if the puzzle is solved
export const isPuzzleSolved = (board) => {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false; // Check if each tile is in its correct position
  }
  return board[board.length - 1] === 0; // Check if the empty tile is at the end
};

// Function to find the next move that minimizes the distance to the goal configuration
export const findNextMove = (board) => {
  const emptyIndex = board.indexOf(0);
  const goalBoard = Array.from({ length: 16 }, (_, i) => (i === 15 ? 0 : i + 1));

  const evaluateMove = (newBoard) => {
    let distance = 0;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] !== 0 && newBoard[i] !== goalBoard[i]) {
        const goalIndex = goalBoard.indexOf(newBoard[i]);
        distance += Math.abs(Math.floor(i / 4) - Math.floor(goalIndex / 4)) + Math.abs((i % 4) - (goalIndex % 4));
      }
    }
    return distance; // Return the total distance of tiles from their goal positions
  };

  let bestMove = null;
  let minDistance = Infinity;
  const possibleMoves = [
    emptyIndex - 4, // Up
    emptyIndex + 4, // Down
    emptyIndex - 1, // Left
    emptyIndex + 1, // Right
  ].filter(
    (index) =>
      index >= 0 &&
      index < board.length &&
      (Math.floor(index / 4) === Math.floor(emptyIndex / 4) || index % 4 === emptyIndex % 4)
  ); // Filter out invalid moves

  for (const move of possibleMoves) {
    const newBoard = [...board];
    [newBoard[emptyIndex], newBoard[move]] = [newBoard[move], newBoard[emptyIndex]]; // Attempt the move
    const distance = evaluateMove(newBoard); // Evaluate the new board configuration
    if (distance < minDistance) {
      minDistance = distance;
      bestMove = move; // Update the best move if this move is better
    }
  }

  if (bestMove !== null) {
    const newBoard = [...board];
    [newBoard[emptyIndex], newBoard[bestMove]] = [newBoard[bestMove], newBoard[emptyIndex]]; // Make the best move
    return newBoard;
  }

  return board; // Return the original board if no better move was found
};
