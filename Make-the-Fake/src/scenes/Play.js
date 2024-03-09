class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.bullets;
        this.ship;
    }
    init() {
       this.end = 0;
    }

    preload(){

    }

    create(){
        this.starfield = this.add.tileSprite(0, 0, 640, 720, 'starfield').setOrigin(0, 0)

        this.ship = this.add.image(10, 10, 'spaceship')
        this.bullets = new Bullets(this);
        this.input.on('pointermove', (pointer) =>
        {
            this.ship.x = pointer.x;
            this.ship.y = pointer.y;
            this.bullets.fireBullet(this.ship.x, this.ship.y);

        });
    }

    update(){
        this.starfield.tilePositionY -= 4;
        if (this.end != 1){
            this.bullets.fireBullet(this.ship.x, this.ship.y);
        }
    }
}