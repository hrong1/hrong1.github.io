class enemyBullet extends Phaser.Physics.Arcade.Group
{
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet')
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.velocity.y = 900;
    }
    update(){
        if (this.y < 720) {
            this.destroy();
        }
    }
}
