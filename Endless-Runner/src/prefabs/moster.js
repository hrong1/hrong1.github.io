class moster extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)
        scene.add.existing(this)
        this.moveSpeed = 5
        this.anims.play('ilde')
        // this.dir = Math.floor(Math.random() * 2)
    }

    update(){
        this.x -= this.moveSpeed
        if (this.x <= 0) {
            this.x = game.config.width + Math.floor(Math.random() * 1000)
            this.y = Math.floor(Math.random() * (Math.floor(400) - Math.ceil(64)))
        }
        
    }
}