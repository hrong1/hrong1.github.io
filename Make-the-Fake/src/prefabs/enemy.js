class enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.tint = 0x0000ff
        this.hp = 3;
        this.body.velocity.y = 200;
    }

    update(){
        if (this.hp <= 0){
            this.destroy();
        }
        this.body.velocity.y = 200
    }

    hurt(){
        this.hp -= 1;
    }
}