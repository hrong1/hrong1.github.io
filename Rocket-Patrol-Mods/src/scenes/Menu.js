class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load audio
        this.load.audio('sfx-select', './assets/sound/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sound/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sound/sfx-shot.wav')
        // load new audio
        this.load.audio('explosion01', './assets/sound/hq-explosion-6288.mp3')
        //Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6288">Pixabay</a>
        this.load.audio('explosion02', './assets/sound/explosion-6801.mp3')
        //Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6801">Pixabay</a>
        this.load.audio('explosion03', './assets/sound/heavy-cineamtic-hit-166888.mp3')
        //Sound Effect by <a href="https://pixabay.com/users/lordsonny-38439655/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=166888">LordSonny</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=166888">Pixabay</a>
        this.load.audio('explosion04', './assets/sound/explosion-6055.mp3')
        //Sound Effect from <a href="https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6055">Pixabay</a>
        
        

    }

    create() {
        let menuConfig = {
            frontFamily: 'Conrier',
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

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ← or → arrow to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 +borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')    
        }
    }
}
