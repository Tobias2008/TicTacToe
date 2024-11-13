//  Author:  Payreder Tobias
//  Start-Date:  18/10/2024
//  Last-Modified-Date:  13/11/2024


// Tic Tac Toe game

// Initialize variables

let turn = 0;


let running = {
    home: true,
    game: false,
    store: false,
    settings: false
}

let player1 = {
    name: "Player 1",
    color: "black",
    weight: 20,
    score: 200,
    character: './image/shop/PlayerOne/Character/CharacterStandart.png',
    audio: '',
    characters: {
        character0: true,
        character1: false,
        character2: false,
        character3: false
    },
    characterSrc: [
        './image/shop/PlayerOne/Character/CharacterStandart.png',
        './image/shop/PlayerOne/Character/CharacterOne.png',
        './image/shop/PlayerOne/Character/CharacterTwo.png',
        './image/shop/PlayerOne/Character/CharacterThree.png'
    ],
    audios: {
        audio0: true,
        audio1: false,
        audio2: false,
        audio3: false
    },
    equippedItems: {
        character: 0,
        audio: 0
    }
}

let player2 = {
    name: "Player 2",
    color: "red",
    weight: 40,
    score: 200,
    character: './image/shop/PlayerTwo/Character/CharacterStandart.png',
    audio: '',
    characters: {
        character0: true,
        character1: false,
        character2: false,
        character3: false
    },
    characterSrc: [
        './image/shop/PlayerTwo/Character/CharacterStandart.png',
        './image/shop/PlayerTwo/Character/CharacterOne.png',
        './image/shop/PlayerTwo/Character/CharacterTwo.png',
        './image/shop/PlayerTwo/Character/CharacterThree.png'
    ],
    audios: {
        audio0: true,
        audio1: false,
        audio2: false,
        audio3: false
    },
    equippedItems: {
        character: 0,
        audio: 0
    }
}

let bothItems = {
    background0: true,
    background1: false,
    background2: false,
    background3: false
}

let backgroundSrc = [
    `<img onclick="chooseWallpaper('./image/Background/BackgroundOne.png')" class="settingsBackgroundImage settingsImageStyle" id="Background0" src="./image/Background/BackgroundOne.jpg">`,
    `<img onclick="chooseWallpaper('./image/Background/BackgroundTwo.png')" class="settingsBackgroundImage settingsImageStyle" id="Background1" src="./image/Background/BackgroundTwo.jpg">`,
    `<img onclick="chooseWallpaper('./image/Background/BackgroundThree.png')" class="settingsBackgroundImage settingsImageStyle" id="Background2" src="./image/Background/BackgroundThree.jpg">`,
    `<img onclick="chooseWallpaper('./image/Background/BackgroundFour.png')" class="settingsBackgroundImage settingsImageStyle" id="Background3" src="./image/Background/BackgroundFour.jpg">`
];

let counters = {
    image: 1
}

let volume = 0.1;

let gameMatrix = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1]
]

let counter = 200;

player1.audio = new Audio('./image/shop/PlayerOne/Audio/Attack1-2.mp3');
player1.audio.volume = volume;

player2.audio = new Audio('./image/shop/PlayerTwo/Audio/Attack1-1.mp3');
player2.audio.volume = volume;

// Nav

let myNav = document.getElementById('myNav');
let myNavImg = document.getElementById('openNav');

let nav = document.querySelector('#myNav');

// Open Nav

function openNav() {
    console.log("Open Nav: Start");

    nav.style.animation = "none";
    nav.offsetHeight;
    nav.style.animation = "navigationOpen 0.2s ease-in-out forwards";

    document.getElementById('openNav').innerHTML = '<img src="./image/MenuIcon.png" id="navImage" onclick="closeNav()">';


    console.log("Open Nav: End");
}

// Close Nav

function closeNav() {

    console.log("Close Nav: Start");

    if (running.game == true) {
        nav.style.animation = "none";
        nav.offsetHeight;
        nav.style.animation = "navigationCloseWhileGame 0.2s ease-in-out forwards";
    } else {
        nav.style.animation = "none";
        nav.offsetHeight;
        nav.style.animation = "navigationClose 0.2s ease-in-out forwards";
    }

    document.getElementById('openNav').innerHTML = '<img src="./image/MenuIcon.png" id="navImage" onclick="openNav()">';

    console.log("Close Nav: End");

}

// Start Game

function startGame() {

    console.log("Start Game: Start");
    running.game = true;

    document.getElementById('startGame').style.display = "block";
    document.getElementById('gameField').style.display = "grid";
    document.getElementById('score').style.display = "block";
    document.getElementById('startEndButton').innerHTML = '<div id="startGameButton" onclick="endGame()"><p>End Game</p></div>';

    if (running.home == true) {
        closeHomePage();
        running.home = false;
    } else if (running.store == true) {
        closeStore();
        running.store = false;
        document.getElementById('storeButton').innerHTML = ' <div class="navLinks" onclick="openStore()"><p>Store</p></div>';

    } else if (running.settings == true) {
        closeSettings();
        running.settings = false;
        document.getElementById('settingsButton').innerHTML = ' <div class="navLinks" onclick="openSettings()"><p>Settings</p></div>';
    }

    console.log("Start Game: End");



    setTimeout(() => {
        closeNav();
    }, 10);
}


// End Game

function endGame() {
    console.log("End Game: Start");

    running.game = false;

    document.getElementById('startEndButton').innerHTML = '<div onclick="startGame()"><p>Start Game</p></div>';
    document.getElementById('gameField').style.display = "none";
    document.getElementById('startGame').style.display = "none";
    document.getElementById('score').style.display = "none";

    if (running.store == false && running.settings == false && running.home == false) {
        openHomePage();
        running.home = true;
    }

    running.game = false;

    console.log("End Game: End");

    closeNav();
    resetGame();
}


// Onclick event for each field - give each clicked field the player weight

function game(fieldPlayer, row, col) {

    console.log("Game: Start");


    if (gameMatrix[row][col] === -1) {
        if (turn % 2 === 0) {
            player1.audio.play();
            fieldPlayer.innerHTML = '<img src="' + player1.character + '" alt="Player 1" class="character">';
            gameMatrix[row][col] = player1.weight;
            document.getElementById('field' + (row * 3 + col + 1)).classList.remove('animationGameField');
            document.getElementById('field' + (row * 3 + col + 1)).style.cursor = "default";
        } else {
            player2.audio.play(); 
            fieldPlayer.innerHTML = '<img src="' + player2.character + '" alt="Player 2" class="character">';
            gameMatrix[row][col] = player2.weight;
            document.getElementById('field' + (row * 3 + col + 1)).classList.remove('animationGameField');
            document.getElementById('field' + (row * 3 + col + 1)).style.cursor = "default";
        }
        turn++;
    }

    setTimeout(() => {
        checkWinner();
    }, 100);

    console.log("Game: End");
}

// check if someone wins

function checkWinner() {

    console.log("Check Winner: Start");
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

    console.log("Check Winner: End");
}

// reset game after win or tie

function resetGame() {

    console.log("Reset Game: Start");

    turn = 0;
    gameMatrix = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]



    for (let i = 1; i < 10; i++) {
        document.getElementById('field' + i).innerHTML = "";
        document.getElementById('field' + i).classList.remove('animationGameField');
        document.getElementById('field' + i).offsetHeight;
        document.getElementById('field' + i).classList.add('animationGameField');
        document.getElementById('field' + i).style.cursor = "pointer";
    }


    console.log("Reset Game: End");
}

// Store

// open / close Store


function openStore() {

    running.store = true;

    console.log("Open Store: Start");

    document.getElementById('store').style.display = "block";
    document.getElementById('storeButton').innerHTML = '<div onclick="closeStore()"><p>Store</p></div>';




    console.log("Open Store: End");

    if (running.home == true) {
        closeHomePage();
        running.home = false;

    } else if (running.game == true) {
        endGame();
        running.game = false;
        document.getElementById('startEndButton').innerHTML = '<div onclick="startGame()"><p>Start Game</p></div>';
    } else if (running.settings == true) {
        closeSettings();
        running.settings = false;
        document.getElementById('settingsButton').innerHTML = '<div onclick="openSettings()"><p>Settings</p></div>';
    }

    closeNav();
}

function closeStore() {

    running.store = false;

    console.log("Close Store: Start");

    document.getElementById('store').style.display = "none";

    if (running.settings == false && running.home == false && running.game == false) {
        openHomePage();
        running.home = true;
        closeNav();
        document.getElementById('storeButton').innerHTML = ' <div class="navLinks" onclick="openStore()"><p>Store</p></div>';
    }

    console.log("Close Store: End");
}

/* Shop */

changeItems();

function changeItems() {

    console.log("Change Items: Start");

    let player = ['both', 'player1', 'player2'];
    let playerItems = [document.getElementById('StandardItems'), document.getElementById('ItemsPlayerOne'), document.getElementById('ItemsPlayerTwo')];


    for (let i = 0; i < player.length; i++) {
        playerItems[i].style.display = 'none';
    }


    if (document.getElementById('choosePlayerStore').value == player[0]) {
        playerItems[0].style.display = 'grid';
        console.log("Both");
        document.getElementById('scoreOfActivePlayer').innerHTML = '<p>Your shared score is <mark>' + counter + '</mark>!</p>';
    } else if (document.getElementById('choosePlayerStore').value == player[1]) {
        playerItems[1].style.display = 'grid';
        document.getElementById('scoreOfActivePlayer').innerHTML = '<p>Player One score is <mark>' + player1.score + '</mark>!</p>';

        console.log("Player 1");
    } else if (document.getElementById('choosePlayerStore').value == player[2]) {
        playerItems[2].style.display = 'grid';
        document.getElementById('scoreOfActivePlayer').innerHTML = '<p>Player Two score is <mark>' + player2.score + '</mark>!</p>';

        console.log("Player 2");
    }

    console.log("Change Items: End");

}

/* Buy Items */

function buyCharacter(player, character, cost, characterNum) {


    console.log("Buy Character: Start");

    if (player === 'player1') {
        if (player1.score >= cost && player1.characters['character' + characterNum] == false) {
            player1.characters['character' + characterNum] = true;
            player1.character = character;
            player1.equippedItems.character = characterNum;
            player1.score -= cost;
            document.getElementById("player1Score").innerHTML = player1.score;
            document.getElementById('scoreOfActivePlayer').innerHTML = '<p>Player One score is <mark>' + player1.score + '</mark>!</p>';
            document.getElementById('schloss' + (9 + characterNum)).style.display = "none";
            document.getElementById('character' + characterNum).style.filter = "grayscale(0%)";
        }
    } else if (player === 'player2') {
        if (player2.score >= cost && player2.characters['character' + characterNum] == false) {
            player2.characters['character' + characterNum] = true;
            player2.character = character;
            player2.equippedItems.character = characterNum;
            player2.score -= cost;
            document.getElementById("player2Score").innerHTML = player2.score;
            document.getElementById("scoreOfActivePlayer").innerHTML = '<p>Player Two score is <mark>' + player2.score + '</mark>!</p>';
            document.getElementById('schloss' + (18 + characterNum)).style.display = "none";
            document.getElementById('character' + (characterNum + 3)).style.filter = "grayscale(0%)";
        }
    }

    setCharacterInventory();

    console.log("Buy Character: End");
}

function buyAudio(player, audio, cost, audioNum) {

    console.log("Buy Audio: Start");

    if (player === 'player1') {
        if (player1.score >= cost && player1.audios['audio' + audioNum] == false) {
            player1.audios['audio' + audioNum] = true;
            player1.equippedItems.audio = audioNum;
            player1.audio = new Audio(audio);
            player1.audio.volume = volume;
            player1.score -= cost;
            document.getElementById("player1Score").innerHTML = player1.score;
            document.getElementById('scoreOfActivePlayer').innerHTML = '<p>Player One score is <mark>' + player1.score + '</mark>!</p>';
            document.querySelector('#audio' + audioNum).classList.remove('audio');
        }
    } else if (player === 'player2') {
        if (player2.score >= cost && player2.audios['audio' + audioNum] == false) {
            player2.audios['audio' + audioNum] = true;
            player2.equippedItems.audio = audioNum;
            player2.audio = new Audio(audio);
            player2.audio.volume = volume
            player2.score -= cost;
            document.getElementById("player2Score").innerHTML = player2.score;
            document.getElementById("scoreOfActivePlayer").innerHTML = '<p>Player Two score is <mark>' + player2.score + '</mark>!</p>';
            document.querySelector('#audio' + (audioNum + 3)).classList.remove('audio');
        }
    }


    console.log("Buy Audio: End");
}

function buyBackground(src, cost, backgroundNum) {

    console.log("Buy Background: Start");

    if (counter >= cost && bothItems['background' + backgroundNum] == false) {
        bothItems['background' + backgroundNum] = true;
        counter -= cost;
        document.getElementById('scoreOfActivePlayer').innerHTML = '<p>Your shared score is <mark>' + counter + '</mark>!</p>';
        document.getElementById('schloss' + backgroundNum).style.display = "none";
        document.getElementById('Background' + backgroundNum).style.filter = "grayscale(0%)";



        console.log('background' + backgroundNum);

        loadBackground(src);
    }

    console.log("Buy Background: End");

}

function loadBackground(src) {
    console.log("Load Background: Start");

    document.body.style.backgroundImage = "url(" + src + ")";

    console.log("Load Background: End");
}




// Volume

function muteVolume() {

    console.log("Mute Volume: Start");
    volume = 0;
    player1.audio.volume = volume;
    player2.audio.volume = volume;

    rangeInput.value = 0;

    document.getElementById('muteVolume').style.display = "none";
    document.getElementById('unmuteVolume').style.display = "block";

    console.log("Mute Volume: End");
}

function unmuteVolume() {

    console.log("Unmute Volume: Start");
    volume = 0.1;
    player1.audio.volume = volume;
    player2.audio.volume = volume;

    rangeInput.value = 10;

    document.getElementById('muteVolume').style.display = "block";
    document.getElementById('unmuteVolume').style.display = "none";

    console.log("Unmute Volume: End");
}

function setVolume() {

    console.log("Set Volume: Start");
    player1.audio.volume = volume;
    player2.audio.volume = volume;



    console.log("Set Volume: End");
}

let rangeInput = document.getElementById("myRange");

rangeInput.addEventListener("input", function () {
    let value = rangeInput.value;

    volume = value / 100;

    player1.audio.volume = volume;
    player2.audio.volume = volume;

    console.log(value);

    if (volume == 0) {
        document.getElementById('muteVolume').style.display = "none";
        document.getElementById('unmuteVolume').style.display = "block";
    }
    else {
        document.getElementById('muteVolume').style.display = "block";
        document.getElementById('unmuteVolume').style.display = "none";
    }

});


// Settings


function openSettings() {

    running.settings = true;

    console.log("Open Settings: Start");

    document.getElementById('settingsPage').style.display = "block";
    document.getElementById('settingsButton').innerHTML = '<div onclick="closeSettings()"><p>Settings</p></div>';

    document.getElementById('WebsideExplaination').style.display = "none";
    document.getElementById('explHeadline').style.display = "none";
    document.getElementById('websiteExplText').style.display = "none";

    // Background

    for (let i = 0; i < backgroundSrc.length; i++) {
        document.getElementById('settingsImages').innerHTML = '';
        counters.image = 0;
    }

    for (let i = 0; i < backgroundSrc.length; i++) {
        if (bothItems['background' + i] == true) {
            document.getElementById('settingsImages').innerHTML += backgroundSrc[i];
            counters.image++;

        }
    }

    if (counters.image % 2 == 1) {
        document.getElementById('settingsImages').innerHTML += invisibleImage;
    }




    if (running.home == true) {
        closeHomePage();
        running.home = false;
    } else if (running.game == true) {
        endGame();
        running.game = false;
        document.getElementById('startEndButton').innerHTML = '<div onclick="startGame()"><p>Start Game</p></div>';
    } else if (running.store == true) {
        closeStore();
        running.store = false;
        document.getElementById('storeButton').innerHTML = ' <div class="navLinks" onclick="openStore()"><p>Store</p></div>';
    }


    closeNav();
    console.log("Open Settings: End");

}

function closeSettings() {

    running.settings = false;

    console.log("Close Settings: Start");
    document.getElementById('settingsPage').style.display = "none";

    console.log("Close Settings: End");

    if (running.store == false && running.game == false && running.home == false) {
        openHomePage();
        running.home = true;
        closeNav();
        document.getElementById('settingsButton').innerHTML = ' <div class="navLinks" onclick="openSettings()"><p>Settings</p></div>';
    }
}

function chooseWallpaper(src) {
    // document.body.style.backgroundImage = `url(${src})`;

    console.log("Choose Wallpaper: Start");

    console.log(src);
    loadBackground(src);

    console.log("Choose Wallpaper: End");
}



// set Characterinventory

setCharacterInventory();

function setCharacterInventory() {

    document.getElementById('settingsPlayer1').innerHTML = '';
    document.getElementById('settingsPlayer2').innerHTML = '';


    for (let i = 0; i < 4; i++) {
        if (player1.characters['character' + i] == true) {
            console.log(player1.characterSrc[i]);
            document.getElementById('settingsPlayer1').innerHTML += `<img id="characterPl1${i}" onclick="setCharacter(${player1.characterSrc[i]}, 1)" src="${player1.characterSrc[i]}" alt="Player 1" class="character">`;
            
            console.log('characterPl1' + player1.equippedItems.character);
        }
    }

    for (let i = 0; i < 4; i++) {
        if (player2.characters['character' + i] == true) {
            console.log(player2.characterSrc[i]);
            document.getElementById('settingsPlayer2').innerHTML += `<img id="characterPl2${i}" onclick="setCharacter(${player2.characterSrc[i]}, 2)" src="${player2.characterSrc[i]}" alt="Player 2" class="character">`;

        }
    }
}

function setCharacter(character, player) {

    console.log("Set Character: Start");

    if (player == 1) {
        player1.character = character;
    } else if (player == 2) {
        player2.character = character;
    }

    console.log("Set Character: End");

}


/*      document.getElementById('WebsideExplaination').style.display = "block";
        document.getElementById('explHeadline').style.display = "block";
        document.getElementById('websiteExplText').style.display = "block";
*/


function openHomePage() {

    running.home = true;

    console.log("Open Home Page: Start");

    document.getElementById('WebsideExplaination').style.display = "block";
    document.getElementById('explHeadline').style.display = "block";
    document.getElementById('websiteExplText').style.display = "block";

    if (running.game == true) {
        endGame();
        running.game = false;
        document.getElementById('startEndButton').innerHTML = '<div onclick="startGame()"><p>Start Game</p></div>';
    } else if (running.store == true) {
        closeStore();
        running.store = false;
        document.getElementById('storeButton').innerHTML = ' <div class="navLinks" onclick="openStore()"><p>Store</p></div>';
    } else if (running.settings == true) {
        closeSettings();
        running.settings = false;
        document.getElementById('settingsButton').innerHTML = ' <div class="navLinks" onclick="openSettings()"><p>Settings</p></div>';
    }

    console.log("Open Home Page: End");
}

function closeHomePage() {

    console.log("Close Home Page: Start");

    running.home = false;

    document.getElementById('WebsideExplaination').style.display = "none";
    document.getElementById('explHeadline').style.display = "none";
    document.getElementById('websiteExplText').style.display = "none";


    console.log("Close Home Page: End");
}

let invisibleImage = '<img class="settingsBackgroundImage invisible" src="./image/Background/invisible-png.png" alt="">'
