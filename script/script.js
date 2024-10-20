//  Author:  Payreder Tobias
//  Start-Date:  18/10/2024
//  Last-Modified-Date:  20/10/2024


// Tic Tac Toe game

// Initialize variables

let turn = 0;

let runningGame = false;

let player1 = {
    name: "Player 1",
    color: "black",
    weight: 20,
    score: 0
}

let player2 = {
    name: "Player 2",
    color: "red",
    weight: 40,
    score: 0
}

let gameMatrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

// Nav

let myNav = document.getElementById('myNav');
let myNavImg = document.getElementById('openNav');

// Open Nav

function openNav() {
    myNav.style.left = "0%";
    myNav.style.paddingRight = "2%";

    myNavImg.style.position = "relative";
    myNavImg.style.left = "-20%";
    myNavImg.style.bottom = "0%";


    document.getElementById('openNav').innerHTML = '<img src="./image/MenuIcon.png" id="navImage" onclick="closeNav()">'

}

// Close Nav

function closeNav() {
    myNav.style.left = "-16%";
    myNav.style.paddingRight = "4%";

    myNavImg.style.position = "relative";
    myNavImg.style.left = "0%";
    myNavImg.style.bottom = "0px";


    document.getElementById('openNav').innerHTML = '<img src="./image/MenuIcon.png" id="navImage" onclick="openNav()">'

    if (runningGame) {
        closeNavWhileGameStart();
    }
}

function closeNavWhileGameStart() {
    myNav.style.paddingRight = "5.5%";
    myNavImg.style.position = "relative";
    myNavImg.style.left = "15%";
    myNavImg.style.bottom = "0px";
}



// Start Game

function startGame() {
    document.getElementById('startGame').style.display = "block";
    document.getElementById('gameField').style.display = "grid";
    document.getElementById('divPlayerOne').style.display = "block";
    document.getElementById('divPlayerTwo').style.display = "block";
    document.getElementById('startEndButton').innerHTML = '<div id="startGameButton" onclick="endGame()"><p>End Game</p></div>';

    runningGame = true;
    closeNav();

}


// End Game

function endGame() {

for(let i = 1; i < 10; i++) {
    document.getElementById('field' + i).style.backgroundColor = "white";
}

    console.log("Step1");
    document.getElementById('startEndButton').innerHTML = '<div onclick="startGame()"><p>Start Game</p></div>';
    document.getElementById('gameField').style.display = "none";
    document.getElementById('startGame').style.display = "none";
    document.getElementById('divPlayerOne').style.display = "none";
    document.getElementById('divPlayerTwo').style.display = "none";

    runningGame = false;
    closeNav();

    turn = 0;
    gameMatrix = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]
}

// Onclick event for each field - give each clicked field the player weight

function game(fieldPlayer, row, col) {
    if (gameMatrix[row][col] === -1) {
        if (turn % 2 === 0) {
            fieldPlayer.style.backgroundColor = player1.color;
            gameMatrix[row][col] = player1.weight;
        } else {
            fieldPlayer.style.backgroundColor = player2.color;
            gameMatrix[row][col] = player2.weight;
        }
        turn++;
    }

    setTimeout(() => {
        checkWinner();
    }, 100);
}

// check if someone wins

function checkWinner() {
    let winner = -1;

    // Check rows
    for (let i = 0; i < 3; i++) {
        if (gameMatrix[i][0] === gameMatrix[i][1] && gameMatrix[i][1] === gameMatrix[i][2] && gameMatrix[i][0] !== -1) {
            winner = gameMatrix[i][0];
        }
    }

    // Check columns

    for (let i = 0; i < 3; i++) {
        if (gameMatrix[0][i] === gameMatrix[1][i] && gameMatrix[1][i] === gameMatrix[2][i] && gameMatrix[0][i] !== -1) {
            winner = gameMatrix[0][i];
        }
    }

    // Check diagonals

    if (gameMatrix[0][0] === gameMatrix[1][1] && gameMatrix[1][1] === gameMatrix[2][2] && gameMatrix[0][0] !== -1) {
        winner = gameMatrix[0][0];
    } else if (gameMatrix[0][2] === gameMatrix[1][1] && gameMatrix[1][1] === gameMatrix[2][0] && gameMatrix[0][2] !== -1) {
        winner = gameMatrix[0][2];
    }

    // final check

    if (winner !== -1) {
        if (winner === player1.weight) {
            player1.score++;
            document.getElementById("player1Score").innerHTML = player1.score;
            console.log(player1.name + " wins!");

            resetGame();
        } else if (winner === player2.weight) {
            player2.score++;
            document.getElementById("player2Score").innerHTML = player2.score;
            console.log(player2.name + " wins!");

            resetGame();
        }
    }

    if (turn === 9 && winner === -1) {
        console.log("It's a tie!");
        resetGame();
        document.getElementById("gameTie").style.display = "block";

        setTimeout(() => {
            document.getElementById("gameTie").style.display = "none";
        }, 2000);
    }
}

// reset game after win or tie

function resetGame() {
    turn = 0;
    gameMatrix = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]



    for (let i = 1; i < 10; i++) {
        document.getElementById('field' + i).style.backgroundColor = "white";
    }


}

// Store

// open / close Store

function openStore() {
    document.getElementById('store').style.display = "block";
}

function closeStore() {
    document.getElementById('store').style.display = "none";
}