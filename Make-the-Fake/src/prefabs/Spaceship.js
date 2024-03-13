class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.hp = 5;
    }
    preload(){
        
    }

    create (){
    }

    update(){
        if (this.hp <= 0){
            this.destroy();
        }
    }

    hurt(){
        this.hp -= 1;
    }
}