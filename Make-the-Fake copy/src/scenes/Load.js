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
        this.load.image('enemybullet', './assets/img/enemybullet.png');
        this.load.image('enemy', './assets/img/enemy.png');
        this.load.image('megabullet', './assets/img/megabullet.png')
        this.load.image('Mouse-operation', './assets/img/Mouse-operation.png')
        this.load.image('heart', './assets/img/heart.png')
        this.load.image('title', './assets/img/title.png')
        this.load.image('boss', './assets/img/boss.png')
        //sound
        this.load.audio('sfx-select', './assets/sound/sfx-select.wav');
        this.load.audio('blip-select', './assets/sound/Blip_select_12.mp3');
        this.load.audio('sfx-explosion', './assets/sound/sfx-explosion.wav')
        this.load.audio('shot', './assets/sound/Laser_shoot 17.wav')
        this.load.audio('hurt', './assets/sound/Hit_hurt 17.wav')
        this.load.audio('big-explosion', './assets/sound/explosion-6801.mp3');
        //spritesheet
        this.load.spritesheet('explosion', './assets/img/explode.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 7});
        //music
        this.load.audio('menubgm', './assets/sound/space-atmospheric-background-124841.mp3')
        //Space by Yurii Kohut from Pixabay
        // Music by <a href="https://pixabay.com/users/lvymusic-27953103/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124841">Yurii Kohut</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=124841">Pixabay</a>
        this.load.audio('playbgm', './assets/sound/space-120280.mp3')
        // Space Atmospheric Background by Music Unlimited from Pixabay
        //Music by <a href="https://pixabay.com/users/music_unlimited-27600023/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=120280">Music Unlimited</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=120280">Pixabay</a>
        this.load.audio('bossbgm', './assets/sound/feel-this-energy-voyager-187515.mp3')
        // Feel This Energy (Voyager) by AlexGrohl from Pixabay
        //Music by <a href="https://pixabay.com/users/alexgrohl-25289918/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=187515">AlexGrohl</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=187515">Pixabay</a>
    }
    create() {
        this.add.image(340, 300, 'Mouse-operation').setScale(0.5);
        this.input.on('pointerdown', () =>
            {
                this.scene.start('menuScene') 
            })
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 24
        })
        
    }

    update(){

    }

}