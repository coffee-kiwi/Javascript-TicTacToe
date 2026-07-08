const { createElement } = require("react");

function createBoard() {
    let board = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    let moveCount = 0;

    const increaseMoveCount = () => { moveCount++; };
    const getMoveCount = () => moveCount;

    // Default starting player:
    let player = "X";
    const getPlayer = () => player;
    const getBoard = () => board;

    function updateTile(position) {
        board[position] = player;
    }

    // Function to switch players. May need to be updated..
    function changePlayer() {
        player === "X" ? player = "Y" : player = "X";
    }
    return { increaseMoveCount, updateTile, changePlayer, getPlayer, getBoard, getMoveCount };
}


function startGame() {
    game = createBoard();

    const turnContainer = document.getElementById("turn");
    const commandContainer = document.getElementById("command");
    const boardContainer = document.getElementById("gameboard");

    // Ask for initial player
    

    // Start loop. Break loop if moveCount == 9 || winner is found
        // Display who's turn it is, guide them to choose a tile by clicking on it

        // take input, position by clicking on tile
        // [ 0, 1, 2 ]
        // [ 3, 4, 5 ]
        // [ 6, 7, 8 ]

        // Update board
        // Check if winner has been found
        // If not, change player and play again

    // If winner is found celebrate winner and ask to play again 

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
            
            // console.log(`Tile's index is ${index} and textContent should be ${player}`);
            boardContainer.appendChild(tile);
        });
    };

    function clickHandlerBoard(e) {
        const selectedTile = e.target.dataset.position;

        if (!selectedTile) return;

        game.updateTile(selectedTile);
        displayGame();
        if (calculateWinner(game.getBoard())) {
            // Game is over
            const turnContainer = document.getElementById("turn");
            const player = game.getPlayer;
            turnContainer.textContent = `Player ${player} is the winner!`;
        } else {
            game.changePlayer();
        }
        displayGame();
    }
    boardContainer.addEventListener("click", clickHandlerBoard);
    displayGame();
}



function calculateWinner(board) {
  // Define the 8 possible winning lines
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

  // Loop through each combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    // Check if the first tile is not empty, and then matches the second and third
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true; // Returns 'X' or 'O'
    }
  }

  // No winner found
  return false;
}


// Display the gameboard
