class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    preload() {
        // load assets
        this.load.path = "./assets/"

        // load JSON (ie dialog text)
        this.load.json('dialog', 'json/dialog.json')

        // load images
        this.load.image('dialogbox', 'img/dialogbox.png')
        this.load.image('homer', 'img/homer.png')
        this.load.image('minerva', 'img/minerva.png')
        this.load.image('jove', 'img/jove.png')
        this.load.image('neptune', 'img/neptune.png')
        this.load.image('character', 'img/character.png') 

        // load bitmap font
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
        this.load.bitmapFont('mickey_font', 'font/mickey-line.png', 'font/mickey-line.xml')
    }

    create() {
        // add title text
        this.add.bitmapText(centerX, centerY - 32, 'mickey_font', 'THE ODYSSEY', 64).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'mickey_font', 'Press SPACE to start', 32).setOrigin(0.5)

        // create input
        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // wait for player input
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("talkingScene")
        }
    }
}