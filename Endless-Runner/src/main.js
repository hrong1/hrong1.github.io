/*
Name: Haorong Rong
Game title: Jumping Blocks
Approximate hours spent: 23
Creative tilt justification:
I implement a pause feature in my game. Everytime when the player press Q the game will stop,
it can be continue when press Q again

My game didn't have a great visual style. but however all the art are create by me
Even though it may be too simple, but I still feel pround of it
*/


const SCALE = 1
const tileSize = 64

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics:{
        default: 'arcade',
        arcade:{
            debug: true
        }
    },
    scene: [ Menu, Play, End ]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let highScore = 0;
let currentpoint = 0;
let animecreate = 0
// reserve keyboard bindings
let keySPACE, keyLEFT, keyRIGHT, keyQ