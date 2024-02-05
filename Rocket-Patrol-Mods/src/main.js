/*
Haorong Rong

Rocket Patrol 60 fps

Hour took to complete: 12 hours

Mod chose:
1. Create a new enemy Spaceship(5)
    A new enemy ship that is worth 100 point, and it is smaller and faster

2. Implement the speed increase after 30 seconds (1)
    After 30 seconds, all ship speed to * 2

3. Create 4 new explosion sound effects and randomize them (3)
    Add 4 new explosion sound effects,
    Use Math.floor(Math.random() * 5) for randomize

4. Track a high score (1)
    After a game end, will record the highest score
    And display on the second box

5. Add looping background music to the Play scene (1)
    Stop when back to Menu page

6. Randomize each spaceship's movement direction at the start of each play (1)
    For each play, each spaceship's movement direction will be different

7. Display the time remaining (in seconds) on the screen (3)
    Time is now display on top right

8. A new timing mechanism (5)
    Every time when successful hits, time will increase
    But if miss, time will decrease

The total is 20.
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
let highScore = 0;
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
