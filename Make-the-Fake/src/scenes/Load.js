class Load extends Phaser.Scene {
    constructor() {
        super('sceneLoad')
    }

    preload() {
        //image
        this.load.image('arrow', './assets/img/arrow.png');
        this.load.image('starfield', './assets/img/starfield.png');
        this.load.image('spaceship', './assets/img/Spaceship.png');
        this.load.image('bullet', './assets/img/bullet.png');
        this.load.image('enemy', './assets/img/enemy.png');
        this.load.image('megabullet', './assets/img/megabullet.png')
        this.load.image('Mouse-operation', './assets/img/Mouse-operation.png')
        //sound
        this.load.audio('sfx-select', './assets/sound/sfx-select.wav');
        this.load.audio('blip-select', './assets/sound/Blip_select_12.mp3');
    }
    create() {
        this.add.image(340, 300, 'Mouse-operation').setScale(0.5);
        this.input.on('pointerdown', () =>
            {
                this.scene.start('menuScene') 
            })
    }

    update(){

    }

}