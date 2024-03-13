class playerBullet extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet')
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.velocity.y = -900;
        this.hp = 1
    }
    update(){
        if (this.y < -10) {
            this.destroy();
        }
        if (this.hp <= 0){
            this.destroy()
        }
    }

    hurt(){
        this.destroy();
    }
}