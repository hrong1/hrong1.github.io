class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    init() {
       this.end = false;
       this.pause = 1;
       this.shootspeed = 1;
       this.shooting = 0
       this.enemyshooting = 0
       this.enemyshootspeed = 1
       this.timer = 10
       this.timing = 0
    }

    preload(){

    }

    create(){
        //timing
        let menuConfig = {
            frontFamily: 'Conrier',
            fontSize: '24px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        //back ground
        this.starfield = this.add.tileSprite(0, 0, 640, 720, 'starfield').setOrigin(0, 0)

        //timer
        //this.rectangleA = this.add.rectangle(0, 0, 12, 6, 0xffffff).setOrigin(0, 0)
        //this.rectangleA.setStrokeStyle(4, 0xffffff);
        this.timeLeft = this.add.text(20, 20, this.timer, menuConfig)
        this.timeLeft.text = this.timer

        //player
        this.ship = new Spaceship(this, 300, 600, 'spaceship')
        this.ship.body.setCollideWorldBounds(true)
        // define keys
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.cursor = this.add.image(0, 0, 'arrow').setVisible(false);
        // player moving
        if (this.pause != -1){
            this.input.on('pointermove', (pointer) =>{
                this.cursor.copyPosition(pointer);
                if (this.pause != -1){
                    this.physics.moveToObject(this.ship, pointer, 600);
                }
                //use example for player move
                //https://github.com/phaserjs/examples/blob/master/public/src/physics/arcade/move%20and%20stop%20at%20position.js
        });
        }
        //groud
        this.playerBullets = this.add.group();
        this.enemyBullets = this.add.group();
        this.enemies = this.add.group();
        this.createEnemies();

        this.physics.add.collider(this.playerBullets, this.enemies, this.enemyhurt, null, this)
        this.physics.add.collider(this.enemyBullets, this.player, this.playerhurt, null, this)
        this.physics.add.collider(this.enemies, this.player, this.collision, null, this)
        //temp timer
        this.clock = this.time.delayedCall(10000, () => {
            this.end = true
        }, null, this)
        

    }

    update(){
        this.starfield.tilePositionY -= 4; 
        if (this.end != true){
            if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
                this.pause *= -1
                this.ship.body.reset(this.ship.x, this.ship.y)
            }
            if (this.pause != -1){
                this.Playermove()
                this.Playershoot()
                //this.enemyshoot()
            }
        }
        if (this.end == true){
            this.scene.stop("playScene")
            this.scene.launch('endScene')
        }
        this.timing += 1
        //this.timeLeft.text = this.timing
        if (this.timing >= 60){
            this.timing = 0
            this.timer -= 1
            this.timeLeft.text = this.timer

        }
    }
    
    Playermove(){
        const tolerance = 4;
        const distance = Phaser.Math.Distance.BetweenPoints(this.ship, this.cursor);
                if (this.ship.body.speed > 0){
                    if (distance < tolerance){
                        this.ship.body.reset(this.cursor.x, this.cursor.y);
                    }
                }
    }

    Playershoot(){
        if(this.shooting == 10){
            var bullet = new playerBullet(this, this.ship.x, this.ship.y - 15)
            this.playerBullets.add(bullet)
            this.shooting = 0;
        }
        this.shooting += this.shootspeed
    }

    // enemyshoot(){
    //     if(this.enemyshooting == 20){
    //         var bullet = new enemyBullet(this, this.enemy.x, this.enemy.y + 15)
    //         this.enemyBullets.add(bullet)
    //         this.enemyshooting = 0;
    //     }
    //     this.enemyshooting += this.enemyshootspeed
    // }
    createEnemies(){
        this.enemy = new enemy(this, Math.floor(Math.random() * 640), 0, 'enemy')
        this.enemies.add(this.enemy)
    }
    enemyhurt(playerBullet, enemy){
        playerBullet.destroy();
        enemy.destroy();
        //enemy.hurt()
        this.createEnemies();
    }

    playerhurt(){
        this.player.hurt()
    }

    collision(){
        this.end = true
    }
}