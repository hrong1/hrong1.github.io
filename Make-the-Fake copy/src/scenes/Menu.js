class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    init() {
        // variables
        this.sceneselect = 1;
    }
    preload(){
         
    }

    create(){
        menupick = 1;
        //Load background
        this.starfield = this.add.tileSprite(0, 0, 640, 720, 'starfield').setOrigin(0, 0)
        //title
        this.add.image(360, 300, 'title').setScale(0.5)
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
        this.add.text(320, 300, 'PLAY', menuConfig).setOrigin(0.5)
        this.add.text(320, 400, 'Credit', menuConfig).setOrigin(0.5)
        this.add.text(320, 500, 'EXIT', menuConfig).setOrigin(0.5)
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.rectangleA.setInteractive() // Play
        this.rectangleB.setInteractive() // Credit
        this.rectangleC.setInteractive() // EXIT
        //Play
        this.rectangleA.on("pointerover", () => {
            if (this.sceneselect != 1){
                this.sound.play('sfx-select')
            }
            this.sceneselect = 1;
            this.input.on('pointerdown', () =>
            {
                if (this.sceneselect == 1){
                    //this.menubgm.stop()
                    this.sound.play('blip-select');
                    this.scene.stop("menuScene")
                    this.scene.launch('sceneSelect')
                }
            })
         });
         // Credit
         this.rectangleB.on('pointerover', () => {
            if (this.sceneselect != 2){
                this.sound.play('sfx-select')
            }
            this.sceneselect = 2;
            this.input.on('pointerdown', () =>
            {
                if (this.sceneselect == 2){
                    //this.menubgm.stop()
                    this.sound.play('blip-select');
                    this.scene.stop("menuScene")
                    this.scene.launch('creditScene')
                }
            })
         });
         //Exit
         this.rectangleC.on('pointerover', () => { 
            if (this.sceneselect != 3){
                this.sound.play('sfx-select')
            }
            this.sceneselect = 3;
            this.input.on('pointerdown', () =>
            {
                if (this.sceneselect == 3){
                    this.menubgm.stop()
                    this.sound.play('blip-select');
                    this.scene.stop("menuScene")
                    game.destroy(true, false)
                    // stop game from
                    // https://stackoverflow.com/questions/59448975/how-to-stop-a-phaser-game-and-remove-it-from-a-page
                }
            })
         });
         this.rectangleA.on("pointerout", () => {
            if (this.sceneselect == 1){
                this.sceneselect = -1;

            }
         });
         this.rectangleB.on('pointerout', () => {
            if (this.sceneselect == 2){
                this.sceneselect = -1;

            }
         });
         this.rectangleC.on('pointerout', () => { 
            if (this.sceneselect == 3){
                this.sceneselect = -1;

            }
         });
         // music
        this.menubgm = this.sound.add('menubgm', {
            loop: true 
            })
        this.menubgm.play()
        // stop by key from
        //https://phaser.discourse.group/t/how-do-i-start-music-in-one-scene-and-stop-it-in-another/6032/6
    }

    update() {
        this.starfield.tilePositionY -= 4;
        this.sound.stopByKey('playbgm');
        this.sound.stopByKey('bossbgm');
        // input select
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play('sfx-select')
            this.sceneselect += 1;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.sound.play('sfx-select')
            this.sceneselect -= 1;
        }
        if (this.sceneselect == 4){
            this.sceneselect = 1;
        }
        if (this.sceneselect == 0){
            this.sceneselect = 3;
        } 
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            if (this.sceneselect == 1){
                this.sound.play('blip-select');
                this.scene.launch('playScene')
            }else if (this.sceneselect == 2){
                this.sound.play('blip-select');
                this.scene.stop("menuScene")
                this.scene.launch('creditScene')
            }else if (this.sceneselect == 3){
                this.sound.play('blip-select');
                this.scene.stop('menuScene')
            }
        }
        if (this.sceneselect == 1){
            this.rectangleA.setStrokeStyle(4, 0xffffff);
            this.rectangleB.setStrokeStyle(4, 0x000000);
            this.rectangleC.setStrokeStyle(4, 0x000000);
        }
        if (this.sceneselect == 2){
            this.rectangleA.setStrokeStyle(4, 0x000000);
            this.rectangleB.setStrokeStyle(4, 0xffffff);
            this.rectangleC.setStrokeStyle(4, 0x000000);
        }
        if (this.sceneselect == 3){
            this.rectangleA.setStrokeStyle(4, 0x000000);
            this.rectangleB.setStrokeStyle(4, 0x000000);
            this.rectangleC.setStrokeStyle(4, 0xffffff);
        }
    }
    
}