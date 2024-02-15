class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload(){
        
        this.load.path = './asset/img/'
        this.load.image('ball', 'ball.png')
        this.load.image('background', 'Background.png')
        this.load.image('tile', 'tile.png')
        // all art is create by me(hrong1)
        this.load.path = './asset/sound/'
        this.load.audio('hurt', 'Hit_hurt_1.mp3')
        this.load.audio('jump', 'Jump_1.mp3')
        this.load.audio('select', 'Blip_select_12.mp3')
        // the 3 sound effect above is create by https://jfxr.frozenfractal.com/
        this.load.audio('end', 'goodresult-82807.mp3')
        //Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=82807">Pixabay</a>
        
        this.load.audio('bgm', 'run-with-me-123095.mp3')

        //Sound Effect by <a href="https://pixabay.com/users/purnanand_wasave-29922665/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=123095">Purnanand Wasave</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=123095">Pixabay</a>
    
    }

    create(){
        let menuConfig = {
            frontFamily: 'Conrier',
            fontSize: '28px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Endless Runner', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use SPACE to jump avoid graffiti', menuConfig).setOrigin(0.5)
        //menuConfig.backgroundColor = '#00FF00'
        //menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 +borderUISize + borderPadding, 'Press SPACE for start', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 +borderUISize + borderPadding + 50, 'Press Q for pause at anytime', menuConfig).setOrigin(0.5)
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene')
            this.sound.play('select')
        }
    }
    
}