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
        this.load.image('megabullet', './assets/img/megabullet.png')
        //sound
        this.load.audio('sfx-select', './assets/sound/sfx-select.wav');
        this.load.audio('blip-select', './assets/sound/Blip_select_12.mp3');
    }
    create() {
        
        this.scene.start('menuScene')
    }

}