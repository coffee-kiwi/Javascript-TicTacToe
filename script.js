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
    board = createBoard();
    let gameFinished = false;

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
}

        // Check if position already taken
        // if (board[position].isFinite) {
        //     board[position] = player;
        // }

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
function displayGame() {
    const game = createBoard();
}