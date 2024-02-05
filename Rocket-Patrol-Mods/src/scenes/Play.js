class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/img/rocket.png');
        this.load.image('spaceship', './assets/img/spaceship.png');
        this.load.image('starfield', './assets/img/starfield.png');
        this.load.image('Newship', './assets/img/Newship.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/img/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        
        //load background music
        this.load.audio('bgmusic', './assets/sound/freyja-viking-nordic-background-music-110931.mp3')
        // Music from https://pixabay.com/music/main-title-freyja-viking-nordic-background-music-110931/

    }

    create() {
        //music
        let bgm = this.sound.add('bgmusic')
        bgm.setLoop(true);
        bgm.play({volume: 0.5});
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, 0).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 0).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 0).setOrigin(0,0)
        
        // add New spaceship
        this.Newship = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4 + 30, 'Newship', 0, 100, 3).setOrigin(0,0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        })

        // initialize score
        this.p1Score = 0

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        highScore = highScore
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)   
        
        //hightest score
        this.scorehigh = this.add.text(borderUISize + 150, borderUISize + borderPadding*2, highScore, scoreConfig)   

        
        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        /* this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5)
            this.gameOver = true
            this.anims.remove('explode')
            bgm.stop('bgmusic')
        }, null, this) */

        //speed up after 30 seconds
        this.clock = this.time.delayedCall(30000, () => {
            this.ship01.speedup()
            this.ship02.speedup()
            this.ship03.speedup()
            this.Newship.speedup()
        }, null, this)

        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 100
        }
        this.count = 0
        this.timeplay = this.game.settings.gameTimer / 1000
        this.timeLeft = this.add.text(borderUISize + borderPadding + 400, borderUISize + borderPadding*2, this.timeplay, timeConfig)   
        this.timeLeft.text = this.timeplay
        this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this)
    }

    update() {
        //check miss
        if(this.p1Rocket.y <= borderUISize * 3 + borderPadding + 1){
            this.timeplay -= 10
            this.timeLeft.text = this.timeplay
        }

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // count time
        this.count += 1
        if (this.count == 60 && !this.gameOver){
            this.timeplay -= 1
            this.timeLeft.text = this.timeplay
            this.count = 0 
        } 

        // stop when time is 0
        if (this.timeplay <= 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5)
            this.gameOver = true
            this.timeplay = 0
            this.anims.remove('explode')
        }

        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        
        if(!this.gameOver){
            // update rocket sprite
            this.p1Rocket.update()
            // update spaceships (x3)
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.Newship.update()

        }
        // check collisions(p1)
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.timeplay += 5
            this.timeLeft.text = this.timeplay
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.timeplay += 5
            this.timeLeft.text = this.timeplay
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.timeplay += 5
            this.timeLeft.text = this.timeplay
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if(this.checkCollision(this.p1Rocket, this.Newship)) {
            this.timeplay += 10
            this.timeLeft.text = this.timeplay
            this.p1Rocket.reset()
            this.shipExplode(this.Newship)
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true
        } else {
            return false
        }
    }

    // random sound for explosion
    random_explosion(){
        let soundlist = ['sfx-explosion', 'explosion01', 'explosion02', 'explosion03', 'explosion04']
        return soundlist[Math.floor(Math.random() * 5)]
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
            ship.reset()                         // reset ship position
            ship.alpha = 1                       // make ship visible again
            boom.destroy()                       // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        if(this.p1Score > highScore){
            highScore = this.p1Score;
        }

        this.sound.play(this.random_explosion())         
    }
} 