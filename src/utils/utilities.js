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
  const board = generateSolvableBoard();
  [board[0], board[1]] = [board[1], board[0]];
  return board;
};

export const isPuzzleSolved = (board) => {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return board[board.length - 1] === 0;
};
