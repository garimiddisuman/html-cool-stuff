const getWinningCombinations = () => [
  new Set([1, 2, 3]),
  new Set([4, 5, 6]),
  new Set([7, 8, 9]),
  new Set([1, 4, 7]),
  new Set([2, 5, 8]),
  new Set([3, 6, 9]),
  new Set([1, 5, 9]),
  new Set([3, 5, 7]),
];

const removeAllClickHandlers = (boxes) => {
  boxes.forEach((box) => {
    box.onclick = null;
  });
};

const modifyClickedBox = (event, symbol) => {
  if (symbol === "X") {
    event.target.style.color = "red";
  }

  event.target.textContent = symbol;
  event.target.style.fontSize = "40px";
  event.target.onclick = null;
};

const displayWinnerMessage = (player1, player2, symbol) => {
  const winner = symbol === "X" ? player2 : player1;
  document.querySelector("#winner-message").textContent = `${winner} Wins!`;
};

const displaydrawMessage = () => {
  document.querySelector("#winner-message").textContent = "Draw!";
};

const hasWinnerFound = (currentPlayer) => {
  const winningCombinations = getWinningCombinations();
  return winningCombinations.some((set) =>
    [...set].every((num) => currentPlayer.has(num))
  );
};

const handleMove = () => {
  let moveCount = 0;
  const player1Moves = new Set();
  const player2Moves = new Set();

  return function (event, boxNumber) {
    moveCount++;
    const currPlayerMoves = moveCount % 2 === 0 ? player2Moves : player1Moves;
    currPlayerMoves.add(boxNumber);
    const symbol = moveCount % 2 === 0 ? "X" : "O";

    modifyClickedBox(event, symbol);

    return { moveCount, currPlayerMoves, symbol };
  };
};

const checkGameStatus = (moveDetails) => {
  const { moveCount, currPlayerMoves, symbol, boxes } = moveDetails;

  if (hasWinnerFound(currPlayerMoves)) {
    removeAllClickHandlers(boxes);
    displayWinnerMessage(symbol);
    return;
  }

  if (moveCount === 9) displaydrawMessage();
};

const attachClickHandlers = (boxes) => {
  const moveHandler = handleMove();

  boxes.forEach((box, index) => {
    box.onclick = (event) => {
      const moveDetails = moveHandler(event, index + 1);

      checkGameStatus({ ...moveDetails, boxes });
    };
  });
};

const runGame = () => {
  const boxes = [...document.querySelectorAll(".box")];

  attachClickHandlers(boxes);
};

runGame();
