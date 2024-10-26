
//  Author:  Payreder Tobias
//  Start-Date:  18/10/2024
//  Last-Modified-Date:  21/10/2024


// Tic Tac Toe game

// Initialize variables

let turn = 0;

let runningGame = false;

let player1 = {
    name: "Player 1",
    color: "black",
    weight: 20,
    score: 0,
    character: '../image/shop/PlayerOne/CharacterStandart.png'
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

let counter = 0;

// Start Website

/*setTimeout(() => {
    document.getElementById('startWebsite').style.display = "none";
    document.getElementById('WebsideExplaination').style.display = "block";
    document.getElementById('headline').style.display = "block";
    document.getElementById('myNav').style.display = "block";
}, 20000);*/

// Nav

let myNav = document.getElementById('myNav');
let myNavImg = document.getElementById('openNav');

let nav = document.querySelector('#myNav');
// Open Nav

function openNav() {
    nav.classList.add('animateNavOpen');
    document.getElementById('openNav').innerHTML = '<img src="./image/MenuIcon.png" id="navImage" onclick="closeNav()">';

    setTimeout(() => {
        nav.classList.remove('animateNavOpen');
        myNav.style.left = "0%";
        myNav.style.paddingRight = "4%";

    }, 270);
}

// Close Nav

function closeNav() {

    document.getElementById('openNav').innerHTML = '<img src="./image/MenuIcon.png" id="navImage" onclick="openNav()">'


    if (runningGame) {
        nav.classList.add('animateNavCloseWhileGame');
        setTimeout(() => {
            nav.classList.remove('animateNavCloseWhileGame');
            myNav.style.paddingRight = "5.5%";
            myNavImg.style.position = "fixed";
            myNavImg.style.left = "15%";

        }, 270);
    } else {
        nav.classList.add('animateNavClose');
        setTimeout(() => {
            nav.classList.remove('animateNavClose');
            myNav.style.left = "-16%";
            myNav.style.paddingRight = "4%";
        }, 270);
    }



}

function closeNavWhileGameStart() {

}



// Start Game

function startGame() {
    closeStore();

    document.getElementById('WebsideExplaination').style.display = "none";

    document.getElementById('startGame').style.display = "block";
    document.getElementById('gameField').style.display = "grid";
    document.getElementById('score').style.display = "block";
    document.getElementById('startEndButton').innerHTML = '<div id="startGameButton" onclick="endGame()"><p>End Game</p></div>';

    runningGame = true;
    closeNav();

}


// End Game

function endGame() {

    for (let i = 1; i < 10; i++) {
        document.getElementById('field' + i).style.backgroundColor = "white";
    }

    console.log("Step1");
    document.getElementById('startEndButton').innerHTML = '<div onclick="startGame()"><p>Start Game</p></div>';
    document.getElementById('gameField').style.display = "none";
    document.getElementById('startGame').style.display = "none";
    document.getElementById('score').style.display = "none";

    runningGame = false;
    closeNav();

    resetGame();

    document.getElementById('WebsideExplaination').style.display = "block";

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

            counter++;
            resetGame();
        } else if (winner === player2.weight) {
            player2.score++;
            document.getElementById("player2Score").innerHTML = player2.score;
            console.log(player2.name + " wins!");

            counter++;
            resetGame();
        }
    }

    if (turn === 9 && winner === -1) {
        console.log("It's a tie!");
        counter++;
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


    if (runningGame) {
        for (let i = 1; i < 10; i++) {
            document.getElementById('field' + i).style.backgroundColor = "white";
        }
    }

}

// Store

// open / close Store

function openStore() {
    document.getElementById('store').style.display = "block";
    document.getElementById('storeButton').innerHTML = '<div onclick="closeStore()"><p>Store</p></div>';

    document.getElementById('WebsideExplaination').style.display = "none";
    document.getElementById('explHeadline').style.display = "none";
    document.getElementById('websiteExplText').style.display = "none";
    document.getElementById('mark').style.display = "none";

    endGame();
    closeNav();
}

function closeStore() {
    document.getElementById('store').style.display = "none";

    document.getElementById('storeButton').innerHTML = '<div onclick="openStore()"><p>Store</p></div>';

    document.getElementById('explHeadline').style.display = "block";
    document.getElementById('WebsideExplaination').style.display = "block";
    document.getElementById('websiteExplText').style.display = "block";
    document.getElementById('mark').style.display = "block";


    closeNav();
}

/* Shop */

changeItems();

function changeItems() {
    console.log("Change Items");
    let player = ['both', 'player1', 'player2'];
    let playerItems = [document.getElementById('StandardItems'), document.getElementById('ItemsPlayerOne'), document.getElementById('ItemsPlayerTwo')];

    for (let i = 0; i < player.length; i++) {
        playerItems[i].style.display = 'none';
    }

   
        if (document.getElementById('choosePlayerStore').value == player[0]) {
            playerItems[0].style.display = 'grid';
            console.log("Both");
        } else if (document.getElementById('choosePlayerStore').value == player[1]) {
            playerItems[1].style.display = 'grid';
            console.log("Player 1");
        } else if (document.getElementById('choosePlayerStore').value == player[2]) {
            playerItems[2].style.display = 'grid';
            console.log("Player 2");
        }
    

}