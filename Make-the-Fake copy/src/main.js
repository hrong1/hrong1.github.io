/*
Name: Haorong Rong
Game title: Star Fighter
Phaser's major components:
physics systems
cameras
text objects
the animation manager
timers
tilemaps
*/


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 720,
    physics:{
        default: 'arcade',
        arcade:{
            debug: true
        }
    },
    scene: [ Load, Menu, Select,Play, Boss,Credit, End, Win]
}

let game = new Phaser.Game(config)
let { width, height } = game.config
let keyPUASE, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER
let hscore = 0;
let score = 0;
let lose = 0;
