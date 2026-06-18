//your JS code here. If required.
const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".message");
const resetBtn = document.getElementById("reset");
const form = document.getElementById("input-form");
const start = document.getElementById("submit");
const gameBoard = document.querySelector(".gameBoard");

let currentPlayer = "X";
let gameActive = true;

let playerName1 = "";
let playerName2 = "";

let board = [
    "","","",
    "","","",
    "","",""
];

 const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ];

start.addEventListener("click", initializeGame);

function initializeGame(e) {
    e.preventDefault();

    playerName1 = document.getElementById("player-1").value;
    playerName2 = document.getElementById("player-2").value;

    form.style.display = "none";
    gameBoard.style.display = "block";

    status.textContent = `${playerName1}, you're up`;

    resetBtn.addEventListener("click", resetGame);

    cells.forEach(cell => {
        cell.addEventListener("click", handleClick);
    });
}

function handleClick(e) {

            const cell = e.target;
            const index = Number(cell.dataset.index);

            if (!gameActive || board[index] !== "") {
                return;
            }

            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner()) {
                status.textContent = `${currentPlayer === "X"? playerName1 : playerName2} congratulations you won!`;
                gameActive = false;
                return;
            }

            if (board.every(cell => cell !== "")) {
                status.textContent = "It's a Draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";

            status.textContent = `Player ${currentPlayer === "X"? playerName1 : playerName2}'s Turn`;
        }

        function checkWinner() {

            for (let pattern of winPatterns) {

                const [a, b, c] = pattern;

                if (
                    board[a] !== "" &&
                    board[a] === board[b] &&
                    board[b] === board[c]
                ) {
                    return true;
                }
            }

            return false;
        }

        function resetGame() {

            board = [
                "", "", "",
                "", "", "",
                "", "", ""
            ];

            currentPlayer = "X";
            gameActive = true;

            cells.forEach(cell => {
                cell.textContent = "";
            });

            status.textContent = `${playerName1}, you're up`;
        }