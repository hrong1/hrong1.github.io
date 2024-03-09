/*
Name: Haorong Rong
Game title: 
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 720,
    physics:{
        default: 'arcade',
        arcade:{
            debug: false
        }
    },
    scene: [ Load, Menu, Play, Credit, End ]
}

let game = new Phaser.Game(config)
let { width, height } = game.config
let keyPUASE, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER

