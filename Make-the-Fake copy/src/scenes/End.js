class End extends Phaser.Scene {
    constructor() {
        super("endScene")
    }


    create(){
        //Load background
        this.starfield = this.add.tileSprite(0, 0, 640, 720, 'starfield').setOrigin(0, 0)
        // grab keyboard binding from Keys scene
        let menuConfig = {
            frontFamily: 'Conrier',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.rectangleA = this.add.rectangle(260, 270, 120, 60, 0xFFFFFF).setOrigin(0, 0)
        this.rectangleB = this.add.rectangle(232, 370, 177, 60, 0xFFFFFF).setOrigin(0, 0)
        this.rectangleC = this.add.rectangle(260, 470, 120, 60, 0xFFFFFF).setOrigin(0, 0)
        this.rectangleA.setStrokeStyle(4, 0xffffff);
        this.rectangleB.setStrokeStyle(4, 0xffffff);
        this.rectangleC.setStrokeStyle(4, 0xffffff);
        this.s = this.add.text(320, 300, 'Game End', menuConfig).setOrigin(0.5)
        this.h = this.add.text(320, 400, 'Thanks for Play', menuConfig).setOrigin(0.5)
        this.add.text(320, 500, 'Click to back Select', menuConfig).setOrigin(0.5)
        // define keys
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.s.text = "score: " + score 
        this.h.text = "Highest Score: " + hscore
        this.input.on('pointerdown', () =>
            {
                this.scene.stop("endScene")
                this.scene.launch('sceneSelect')
                this.sound.play('blip-select');
            })
    }

    update() {
        this.starfield.tilePositionY -= 4;
        // input select
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.stop("endScene")
            this.scene.launch('sceneSelect')

        }
    }
}