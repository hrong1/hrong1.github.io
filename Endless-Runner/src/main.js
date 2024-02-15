/*
Haorong Rong
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
let keySPACE, keyLEFT, keyRIGHT