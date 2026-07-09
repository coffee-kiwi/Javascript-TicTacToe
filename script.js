// const { createElement } = require("react");

function createBoard() {
    let board = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    let moveCount = 0;
    let gameFinished = false;

    const increaseMoveCount = () => { moveCount++; };
    const getMoveCount = () => moveCount;

    const getGameFinished = () => gameFinished;
    const finishGame = () => { gameFinished = true; };

    let player = "X";
    const getPlayer = () => player;
    const getBoard = () => board;

    function updateTile(position) {
        board[position] = player;
    }

    function changePlayer() {
        player === "X" ? player = "Y" : player = "X";
    }
    return { increaseMoveCount, updateTile, changePlayer, getPlayer, getBoard, getMoveCount, finishGame, getGameFinished };
}


function startGame() {
    const game = createBoard();
    const turnContainer = document.getElementById("turn");
    const commandContainer = document.getElementById("command");
    const boardContainer = document.getElementById("gameboard");
    const scoreX = document.getElementById("scoreX");
    const scoreY = document.getElementById("scoreY");

    const displayGame = () => {

        boardContainer.textContent = "";
        const board = game.getBoard();
        const player = game.getPlayer();

        turnContainer.textContent = `${player}'s turn:`;
        board.forEach((cell, index) => {
            const tile = document.createElement("button");
            tile.classList.add("tile");
            tile.dataset.position = index;
            if (Number.isFinite(cell)) {
                tile.textContent = " ";
            } else {
                tile.textContent = cell;
            }
            boardContainer.appendChild(tile);
        });
    };

    function clickHandlerBoard(e) {
        if (game.getGameFinished() === false) {
            const selectedTile = e.target.dataset.position;
            const turnContainer = document.getElementById("turn");

            if (!selectedTile) return;

            game.updateTile(selectedTile);
            game.increaseMoveCount();
            displayGame();
            if (calculateWinner(game.getBoard())) {
                game.finishGame();
                turnContainer.textContent = `Player ${game.getPlayer()} is the winner!`;
                if (game.getPlayer() === "X") {
                    scoreX.textContent += "I"
                } else {
                    scoreY.textContent += "I"
                }
            } 
            else if (game.getMoveCount() == 9) {
                turnContainer.textContent = "It's a tie~"
                game.finishGame();
            } 
            else {
                game.changePlayer();
                displayGame();
            }
        }
    }

    const togglePlayerBtn = document.getElementById("toggle-player")
    function toggleHandler(e) {
        console.log("Toggle button recognised")
        if (game.getMoveCount() === 0) {
            game.changePlayer();
            displayGame();
        }
    }
    togglePlayerBtn.addEventListener("click", toggleHandler)

    boardContainer.addEventListener("click", clickHandlerBoard);
    displayGame();
    
}

const startBtn = document.getElementById("start");

function startHandler(e) {
    console.log("StartBtn clicked and event recognised")
    startGame();
}


startBtn.addEventListener("click", startHandler);

function calculateWinner(board) {

  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true; 
    }
  }
  return false;
}
startGame();