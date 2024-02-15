class End extends Phaser.Scene {
    constructor() {
        super("endScene")
    }


    create(){
        this.sound.play('end')
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
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background').setOrigin(0)

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'This point you got is '+ currentpoint, menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'You heightest score is ' + highScore, menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 +borderUISize + borderPadding, 'Press SPACE for start again', menuConfig).setOrigin(0.5)


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene')
            this.sound.play('select')
        }
    }
}