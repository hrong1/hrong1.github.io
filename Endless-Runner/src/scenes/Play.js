class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    init() {
        // variables and settings
        this.physics.world.gravity.y = 2600
        this.pause = false;
        //point
        this.point = 0
        this.tilespeed = 3
    }

    preload(){
        this.load.spritesheet('enemy', './asset/img/enemy.png', {
            frameWidth: 32,
            frameHeight: 32
        })

    }

    create(){
        if (animecreate == 0){
            this.anims.create({
                key: 'ilde',
                frameRate: 8,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 5 }),
            })
            animecreate = 1
        }
        // Background
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0)

        this.player = new Player(this, borderUISize + borderPadding, game.config.height - borderUISize - borderPadding - 100, 'ball').setOrigin(0.5, 0)
        this.moster1 = new moster(this, game.config.width + 100, game.config.height - borderUISize - borderPadding - 100, 'enemy').setOrigin(1, 0)
        this.moster2 = new moster(this, game.config.width + 100, game.config.height - borderUISize - borderPadding - 100, 'enemy').setOrigin(1, 0)
        this.moster3 = new moster(this, game.config.width + 100, game.config.height - borderUISize - borderPadding - 100, 'enemy').setOrigin(1, 0)

        
        this.moster1.body.allowGravity = false
        this.moster2.body.allowGravity = false
        this.moster3.body.allowGravity = false
        this.score = this.add.text(game.config.width/2, 30, this.point, { 
            font: '28px Futura', 
            fill: '#00AA11' 
        }).setOrigin(0.5)

        this.ground = this.add.group()
        for(let i = 0; i < game.config.width; i += tileSize) {
            let groundTile = this.physics.add.sprite(i, game.config.height - tileSize, 'tile').setScale(SCALE).setOrigin(0)
            groundTile.body.immovable = true
            groundTile.body.allowGravity = false
            this.ground.add(groundTile)
        }
        this.groundScroll = this.add.tileSprite(0, game.config.height-tileSize, game.config.width, tileSize, 'tile').setOrigin(0)

        this.physics.add.collider(this.player, this.ground, this.addjump, null, this)
        this.physics.add.collider(this.player, this.moster1, this.gameover, null, this)
        this.physics.add.collider(this.player, this.moster2, this.gameover, null, this)  
        this.physics.add.collider(this.player, this.moster3, this.gameover, null, this)       
        this.physics.world.debugGraphic.clear()
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        

        //sound
        let bgm = this.sound.add('bgm')
        bgm.play({volume: 0.8});


    }

    update(){
        if (!this.pause){
            this.point += 1
            this.score.text = this.point
            this.player.update()
            this.groundScroll.tilePositionX += this.tilespeed
            this.background.tilePositionX += 2;
            this.moster1.update()
            this.moster2.update()
            this.moster3.update()
        }
        if (this.point == 1000){
            this.tilespeed += 3
            this.moster1.moveSpeed += 3
            this.moster2.moveSpeed += 3
            this.moster3.moveSpeed += 3

        }
        if (highScore < this.point){
            highScore = this.point
        }
        currentpoint = this.point
       
    }

    addjump(){
        this.player.jumps = 2
    }

    gameover(){
        this.sound.stopByKey('bgm')
        this.pause = true
        this.sound.play('hurt')
        this.scene.start('endScene')
    }
}