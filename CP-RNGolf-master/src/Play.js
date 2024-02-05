class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
        this.speed = 1;
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        // add cup
        this.cup = this.physics.add.sprite(width / 2, height / 10, 'cup')
        this.cup.body.setCircle(this.cup.width / 4)
        this.cup.body.setOffset(this.cup.width / 4)
        this.cup.body.setImmovable(true)
        // add ball
        this.ball = this.physics.add.sprite(width / 2, height - height / 10, 'ball')
        this.ball.body.setCircle(this.ball.width / 2)
        this.ball.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        // add walls
        this.wallA = this.physics.add.sprite(0, height / 4, 'wall')
        this.wallA.setX(Phaser.Math.Between(0 + this.wallA.width/2, width - this.wallA.width/2))
        this.wallA.body.setImmovable(true)

        let wallB = this.physics.add.sprite(0, height / 2, 'wall')
        wallB.setX(Phaser.Math.Between(0 + wallB.width/2, width - wallB.width/2))
        wallB.body.setImmovable(true)

        this.walls = this.add.group([this.wallA, wallB])

        // add one-way
        this.oneway = this.physics.add.sprite(width/2, height/4*3, 'oneway')
        this.oneway.setX(Phaser.Math.Between(0 + this.oneway.width/2, width/2))
        this.oneway.setImmovable(true)
        this.oneway.body.checkCollision.down = false

        // add pointer input
        this.input.on('pointerdown', (pointer) => {
            shot_count += 1
            let shotDirection = pointer.y <= this.ball.y ? 1 : -1
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection)
            this.ball.body.setVelocityX(pointer.x)
            this.ball.body.setVelocityY(pointer.y * shotDirection)
        })
        // cup/ball collision
        this.physics.add.collider(this.ball, this.cup, (ball, cup) => {
            ball.destroy()
            score += 1
            this.scene.start("playScene")
        })
        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls)

        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneway)
        this.add.text(0, 0, 'Shot Count: ')
        this.add.text(0, 15, 'Score: ')
        this.add.text(0, 30, 'Shot Percentage: ')
        this.shotCount = this.add.text(120, 0, shot_count)
        this.scoreget = this.add.text(120, 15, score)
        const percent = 0
        this.shotPercent = this.add.text(180, 30, percent + '%')
    }

    update() {
        this.wallA.x += this.speed
        if(this.wallA.x == width - this.wallA.width / 2){
            this.speed = -1
        }
        else if (this.wallA.x == this.wallA.width / 2 ){
            this.speed = 1
        }
        this.shotCount.text = shot_count
        this.scoreget.text = score
        if (score >= 1){
            this.shotPercent.text = Math.round((score / shot_count) * 100) + '%'
        }


    }
}
/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[✓] Add ball reset logic on successful shot
[ ] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[✓] Make one obstacle move left/right and bounce against screen edges
[✓] Create and display shot counter, score, and successful shot percentage
*/