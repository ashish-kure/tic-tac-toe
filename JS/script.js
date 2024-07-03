const cells = document.querySelectorAll(".cell");
const displayMessage = document.querySelector(".message");

const changeButton = document.querySelector(".change-button");
const restartButton = document.querySelector(".restart-button");

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const X_SYMBOL = "x", O_SYMBOL = "o";
const X_COLOR = 'var(--second-color)', O_COLOR = 'var(--third-color)';

let isOSymbol = false;
let isGuestMode = false;



// Selecting Game Mode!
changeButton.addEventListener("click", () => {
    changeButton.textContent = isGuestMode ? "Two-Player" : "Guest";
    isGuestMode = !isGuestMode;
});


// Main - Play Game!
const playGame = () => {
    cells.forEach((cell) =>
        cell.addEventListener("click", cellClicked, { once: true })
    );
};

// When User Clicks Cell!
const cellClicked = (event) => {
    changeButton.disabled = true;

    const cell = event.target;

    if (isGuestMode) {
        cell.style.color = X_COLOR;
        cell.textContent = X_SYMBOL;

        !isWonOrDraw(cell.textContent) && setTimeout(computersTurn(), 500);
    }

    else {
        checkTurn();

        cell.style.color = isOSymbol ? O_COLOR : X_COLOR;
        cell.textContent = isOSymbol ? O_SYMBOL : X_SYMBOL;

        isOSymbol = !isOSymbol;

        isWonOrDraw(cell.textContent);
    }
};


// Computer's turn
const computersTurn = () => {
    const emptyCells = [...cells].filter(cell => !cell.textContent);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    const computersCell = emptyCells[randomIndex];

    computersCell.style.color = O_COLOR;
    computersCell.textContent = O_SYMBOL;

    // Remove handler from Computer's Cell!
    computersCell.removeEventListener("click", cellClicked);

    isWonOrDraw(computersCell.textContent);
};


//  Is Won or Draw
const isWonOrDraw = (symbol) => {
    const winner = checkWinning(symbol);

    if (winner) {
        displayMessage.textContent = `' ${symbol.toUpperCase()} ' WON`;

        // Removing Handler after Game is Over!
        cells.forEach(cell => cell.removeEventListener("click", cellClicked));
        return winner;

    } else {
        const isDraw = [...cells].every(cell => cell.textContent);
        isDraw && (displayMessage.textContent = `DRAW`);

        return isDraw;
    }
};


// Checking turns
const checkTurn = () => {
    displayMessage.textContent =
        `${(isOSymbol ? X_SYMBOL : O_SYMBOL).toUpperCase()}'s turn`;
};


// Winning Function!
const checkWinning = (symbol) => {
    return winningPositions.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === symbol;
        });
    });
};


// Restart button!
restartButton.addEventListener("click", () => {
    cells.forEach(cell => cell.style.color = `transparent`);
    cells.forEach(cell => cell.textContent = '');

    displayMessage.textContent = '';
    changeButton.disabled = false;
    isOSymbol = false;

    playGame();
});


// PLAY GAME!
playGame();