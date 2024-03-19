class Win extends Phaser.Scene {
    constructor() {
        super("winScene")
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
        this.s = this.add.text(320, 300, 'Congratulations', menuConfig).setOrigin(0.5)
        this.h = this.add.text(320, 400, 'You defeated the boss', menuConfig).setOrigin(0.5)
        this.add.text(320, 500, 'Click to back Select', menuConfig).setOrigin(0.5)
        // define keys
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.input.on('pointerdown', () =>
            {
                this.scene.stop("winScene")
                this.scene.launch('sceneSelect')
                this.sound.play('blip-select');
            })
        if (lose == 1){
            this.s.text = "Unfortunately"
            this.h.text = "You Lost"
        }
    }

    update() {
        this.starfield.tilePositionY -= 4;
        // input select
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.stop("winScene")
            this.scene.launch('sceneSelect')

        }
    }
}