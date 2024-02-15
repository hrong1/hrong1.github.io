class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.physics.add.existing(this)
        scene.add.existing(this)
        this.JUMP_VELOCITY = -1000
        this.jumps = 2
        this.sound_junmp = scene.sound.add('jump')
    }
    preload(){
        
    }

    update(){
        if (this.jumps > 0 && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound_junmp.play()
            this.jumps --
	        this.body.velocity.y = this.JUMP_VELOCITY
	    } 
    }
}