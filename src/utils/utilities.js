export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const isSolvable = (board) => {
  let inversions = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = i + 1; j < board.length; j++) {
      if (board[i] && board[j] && board[i] > board[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
};

export const generateSolvableBoard = () => {
  const board = Array.from({ length: 15 }, (_, i) => i + 1).concat(0);
  let solvable = false;

  while (!solvable) {
    shuffleArray(board);
    solvable = isSolvable(board);
  }
  return board;
};

export const generateUnsolvableBoard = () => {
  let board = generateSolvableBoard();
  do {
    // Pick two tiles randomly and swap them (except the empty space)
    const first = Math.floor(Math.random() * (board.length - 1));
    let second = Math.floor(Math.random() * (board.length - 1));
    while (first === second) { // Ensure they are not the same
      second = Math.floor(Math.random() * (board.length - 1));
    }
    [board[first], board[second]] = [board[second], board[first]];
  } while (isSolvable(board)); // Keep modifying until it's unsolvable
  return board;
};


export const isPuzzleSolved = (board) => {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return board[board.length - 1] === 0;
};


// Add this function to utilities.js
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
    return distance;
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
  );

  for (const move of possibleMoves) {
    const newBoard = [...board];
    [newBoard[emptyIndex], newBoard[move]] = [newBoard[move], newBoard[emptyIndex]];
    const distance = evaluateMove(newBoard);
    if (distance < minDistance) {
      minDistance = distance;
      bestMove = move;
    }
  }

  if (bestMove !== null) {
    const newBoard = [...board];
    [newBoard[emptyIndex], newBoard[bestMove]] = [newBoard[bestMove], newBoard[emptyIndex]];
    return newBoard;
  }

  return board;
};