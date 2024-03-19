class Credit extends Phaser.Scene {
    constructor() {
        super("creditScene")
    }
    init() {

    }
    preload(){
         
    }

    create(){
        //Load background
        this.starfield = this.add.tileSprite(0, 0, 640, 720, 'starfield').setOrigin(0, 0)
        // grab keyboard binding from Keys scene
        let menuConfig = {
            frontFamily: 'Conrier',
            fontSize: '24px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(320, 50, 'Art by: Haorong Rong', menuConfig).setOrigin(0.5)
        this.add.text(320, 100, 'Teaching: Nathan Altice', menuConfig).setOrigin(0.5)
        this.add.text(320, 150, 'Sound effect by: jfxr', menuConfig).setOrigin(0.5)
        this.add.text(320, 200, 'Music: ', menuConfig).setOrigin(0.5)
        this.add.text(320, 250, 'Space', menuConfig).setOrigin(0.5)
        this.add.text(320, 300, 'by Yurii Kohut from Pixabay', menuConfig).setOrigin(0.5)
        this.add.text(320, 400, 'Space Atmospheric Background', menuConfig).setOrigin(0.5)
        this.add.text(320, 450, 'by Music Unlimited from Pixabay', menuConfig).setOrigin(0.5)
        this.add.text(320, 550, 'Feel This Energy (Voyager)', menuConfig).setOrigin(0.5)
        this.add.text(320, 600, 'by AlexGrohl from Pixabay', menuConfig).setOrigin(0.5)

        // define keys
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        // pointer down
        this.input.on('pointerdown', () =>
            {
                this.scene.stop("creditScene")
                this.scene.stop("playScene")
                this.scene.launch('menuScene')
            })
    }

    update() {
        this.starfield.tilePositionY -= 4;
        // input select
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.stop("creditScene")
            this.scene.stop("playScene")
            this.scene.launch('menuScene')

        }
    }
    
}