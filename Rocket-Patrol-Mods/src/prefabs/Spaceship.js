class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed + speed
        this.dir = Math.floor(Math.random() * 2)
    }

    update() {
        // move spaceship left
        if (this.dir == 0){
            this.x -= this.moveSpeed

            if(this.x <= 0 - this.width) {
                this.x = game.config.width
            }
        }else{
            this.x += this.moveSpeed
            if(this.x >= this.width + 600) {
                this.x = 0 - this.width
            }
        }
    }

    speedup() {
        this.moveSpeed *= 2
    }

    // reset position
    reset() {
        this.x = game.config.width
    }
}