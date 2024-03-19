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
       this.timer = 60
       this.timing = 0
       this.crush = 0
       score = 0;
       this.hp = 5
    }

    preload(){

    }

    create(){
        //timing
        let menuConfig = {
            frontFamily: 'Conrier',
            fontSize: '24px',
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
        

        //player
        this.ship = this.physics.add.image(300, 600, 'spaceship')
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
                //use phaser example for player move
                //https://github.com/phaserjs/examples/blob/master/public/src/physics/arcade/move%20and%20stop%20at%20position.js
        });
        }
        // use phaser example
        //https://github.com/phaserjs/examples/blob/master/public/src/physics/arcade/space%20battle.js

        this.bullets = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'bullets' })
        );
        this.bullets.createMultiple({
            key: 'bullet',
            quantity: 30
        });

        this.enemyBullets = this.add.existing(
            new Bullets(this.physics.world, this, { name: 'enemybullets' })
        );
        this.enemyBullets.createMultiple({
            key: 'enemybullet',
            quantity: 60
        });

        //enemy set up
        this.enemy = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(-300, 0), 'enemy', 0);
        this.enemy1 = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(-250, 0), 'enemy', 0);
        this.enemy2 = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(-400, 0), 'enemy', 0);
        this.enemy3 = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(-500, 0), 'enemy', 0);
        this.enemy4 = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(-100, 0), 'enemy', 0);
        this.enemy5 = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), Phaser.Math.Between(-450, 0), 'enemy', 0);

        // enemy shoot
        this.enemyFiring = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () =>
            {
                if (this.pause != -1 && this.end != true){
                    this.enemyBullets.fire(this.enemy.x, this.enemy.y + 10, 0, 300);
                }
            }
        });
        this.enemyFiring = this.time.addEvent({
            delay: 900,
            loop: true,
            callback: () =>
            {
                if (this.pause != -1 && this.end != true){
                    this.enemyBullets.fire(this.enemy1.x, this.enemy1.y + 10, 0, 300);
                }
            }
        });
        this.enemyFiring = this.time.addEvent({
            delay: 1100,
            loop: true,
            callback: () =>
            {
                if (this.pause != -1 && this.end != true){
                    this.enemyBullets.fire(this.enemy2.x, this.enemy2.y + 10, 0, 300);
                }
            }
        });
        this.enemyFiring = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () =>
            {
                if (this.pause != -1 && this.end != true){
                    this.enemyBullets.fire(this.enemy3.x, this.enemy3.y + 10, 0, 300);
                }
            }
        });
        this.enemyFiring = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () =>
            {
                if (this.pause != -1 && this.end != true){
                    this.enemyBullets.fire(this.enemy4.x, this.enemy4.y + 10, 0, 300);
                }
            }
        });
        this.enemyFiring = this.time.addEvent({
            delay: 900,
            loop: true,
            callback: () =>
            {  
                if (this.pause != -1 && this.end != true){
                    this.enemyBullets.fire(this.enemy5.x, this.enemy5.y + 10, 0, 300);
                }
            }
        });

        // get hit
        this.physics.add.overlap(this.enemy, this.bullets, (enemy, bullet) =>
        {
            let boom = this.add.sprite(this.enemy.x, this.enemy.y, 'explosion').setOrigin(0, 0)
            boom.anims.play('explode')
            const { x, y } = bullet.body.center;
            bullet.disableBody(true, true);
            this.enemy.x = Phaser.Math.Between(0, this.game.config.width)
            this.enemy.y = Phaser.Math.Between(-50, 0)
            this.sound.play('sfx-explosion')
            score += 100
        });
        this.physics.add.overlap(this.enemy1, this.bullets, (enemy, bullet) =>
        {
            let boom = this.add.sprite(this.enemy1.x, this.enemy1.y, 'explosion').setOrigin(0, 0)
            boom.anims.play('explode')
            const { x, y } = bullet.body.center;
            bullet.disableBody(true, true);
            this.enemy1.x = Phaser.Math.Between(0, this.game.config.width)
            this.enemy1.y = Phaser.Math.Between(-20, 0)
            this.sound.play('sfx-explosion')
            score += 100
        });
        this.physics.add.overlap(this.enemy2, this.bullets, (enemy, bullet) =>
        {
            let boom = this.add.sprite(this.enemy2.x, this.enemy2.y, 'explosion').setOrigin(0, 0)
            boom.anims.play('explode')
            const { x, y } = bullet.body.center;
            bullet.disableBody(true, true);
            this.enemy2.x = Phaser.Math.Between(0, this.game.config.width)
            this.enemy2.y = Phaser.Math.Between(-10, 0)
            this.sound.play('sfx-explosion')
            score += 100
        });
        this.physics.add.overlap(this.enemy3, this.bullets, (enemy, bullet) =>
        {
            let boom = this.add.sprite(this.enemy3.x, this.enemy3.y, 'explosion').setOrigin(0, 0)
            boom.anims.play('explode')
            const { x, y } = bullet.body.center;
            bullet.disableBody(true, true);
            this.enemy3.x = Phaser.Math.Between(0, this.game.config.width)
            this.enemy3.y = Phaser.Math.Between(-30, 0)
            this.sound.play('sfx-explosion')
            score += 100
            
        });
        this.physics.add.overlap(this.enemy4, this.bullets, (enemy, bullet) =>
        {
            let boom = this.add.sprite(this.enemy4.x, this.enemy4.y, 'explosion').setOrigin(0, 0)
            boom.anims.play('explode')
            const { x, y } = bullet.body.center;
            bullet.disableBody(true, true);
            this.enemy4.x = Phaser.Math.Between(0, this.game.config.width)
            this.enemy4.y = Phaser.Math.Between(-20, 0)
            this.sound.play('sfx-explosion')
            score += 100
        });
        this.physics.add.overlap(this.enemy5, this.bullets, (enemy, bullet) =>
        {
            let boom = this.add.sprite(this.enemy5.x, this.enemy5.y, 'explosion').setOrigin(0, 0)
            boom.anims.play('explode')
            const { x, y } = bullet.body.center;
            bullet.disableBody(true, true);
            this.enemy5.x = Phaser.Math.Between(0, this.game.config.width)
            this.enemy5.y = Phaser.Math.Between(-450, 0)
            this.sound.play('sfx-explosion')
            score += 100
        });
        //player get hit
        this.physics.add.overlap(this.ship, this.enemyBullets, (player, bullet) =>
        {
            const { x, y } = bullet.body.center;
            this.sound.play('hurt')
            this.hp -= 1
            this.cameras.main.shake(100);
            bullet.disableBody(true, true);
        });
        this.physics.add.collider(this.ship, this.enemy, this.handleCollison, null, this)
        this.physics.add.collider(this.ship, this.enemy1, this.handleCollison, null, this)
        this.physics.add.collider(this.ship, this.enemy2, this.handleCollison, null, this)
        this.physics.add.collider(this.ship, this.enemy3, this.handleCollison, null, this)
        this.physics.add.collider(this.ship, this.enemy4, this.handleCollison, null, this)
        this.physics.add.collider(this.ship, this.enemy5, this.handleCollison, null, this)

        this.physics.world.on('worldbounds', (body) =>
        {
            body.gameObject.onWorldBounds();
        });
        //timer
        this.timeLeft = this.add.text(20, 20, this.timer, menuConfig)
        this.timeLeft.text = "time: " + this.timer
        this.scorehave = this.add.text(20, 60, score, menuConfig)
        this.scorehave.text = "score: " + score
        //player hp
        this.heart1 = this.add.image(30, 115, "heart").setScale(0.5)
        this.heart2 = this.add.image(60, 115, "heart").setScale(0.5)
        this.heart3 = this.add.image(90, 115, "heart").setScale(0.5)
        this.heart4 = this.add.image(120, 115, "heart").setScale(0.5)
        this.heart5 = this.add.image(150, 115, "heart").setScale(0.5)
        
        // music
        this.playbgm = this.sound.add('playbgm', {
            loop: true,
            volume: 0.5, 
            })
        this.playbgm.play()
    }

    update(){
        this.starfield.tilePositionY -= 4;
        this.sound.stopByKey('menubgm');
        this.sound.stopByKey('bossbgm');
        if (this.hp <= 4){
            this.heart5.setVisible(false)
        }
        if (this.hp <= 3){
            this.heart4.setVisible(false)
        }
        if (this.hp <= 2){
            this.heart3.setVisible(false)
        }
        if (this.hp <= 1){
            this.heart2.setVisible(false)
        }
        if (this.hp <= 0){
            this.heart1.setVisible(false)
            this.playbgm.stop()
        }
        if (this.end != true){
            if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
                this.pause *= -1
                this.ship.body.reset(this.ship.x, this.ship.y)
            }
            if (this.pause != -1){
                if (this.hp <= 0){
                    let boom2 = this.add.sprite(this.ship.x, this.ship.y, 'explosion').setOrigin(0, 0)
                    this.ship.disableBody(true, true);
                    boom2.anims.play('explode')
                    this.sound.play('sfx-explosion')
                    this.crush = 1
                    this.end = true
                }
                this.scorehave.text = "score: " + score
                this.Playermove()
                this.Playershoot()
                this.timing += 1
                //enemy move
                this.enemy.y += 2;
                this.enemy1.y += 2;
                this.enemy2.y += 2;
                this.enemy3.y += 2;
                this.enemy4.y += 2;
                this.enemy5.y += 2;
                //enemy reset
                if (this.enemy.y >= this.game.config.height){
                    this.enemy.x = Phaser.Math.Between(0, this.game.config.width)
                    this.enemy.y = Phaser.Math.Between(-450, 0)
                }
                if (this.enemy1.y >= this.game.config.height){
                    this.enemy1.x = Phaser.Math.Between(0, this.game.config.width)
                    this.enemy1.y = Phaser.Math.Between(-450, 0)
                }
                if (this.enemy2.y >= this.game.config.height){
                    this.enemy2.x = Phaser.Math.Between(0, this.game.config.width)
                    this.enemy2.y = Phaser.Math.Between(-450, 0)
                }
                if (this.enemy3.y >= this.game.config.height){
                    this.enemy3.x = Phaser.Math.Between(0, this.game.config.width)
                    this.enemy3.y = Phaser.Math.Between(-450, 0)
                }
                if (this.enemy4.y >= this.game.config.height){
                    this.enemy4.x = Phaser.Math.Between(0, this.game.config.width)
                    this.enemy4.y = Phaser.Math.Between(-450, 0)
                }
                if (this.enemy5.y >= this.game.config.height){
                    this.enemy5.x = Phaser.Math.Between(0, this.game.config.width)
                    this.enemy5.y = Phaser.Math.Between(-450, 0)
                }
            }
        }
        if (this.end == true){
            this.playbgm.stop()
            if (score > hscore){
                this.playbgm.stop()
                hscore = score;
            }
            if (this.crush == 1){
                this.playbgm.stop()
                this.time.addEvent({
                    delay: 300,
                    callback: () =>
                    {  
                        this.playbgm.stop()
                        this.scene.stop("playScene")
                        this.scene.launch('endScene')
                    }
                });
            }else{
                this.playbgm.stop()
                this.scene.stop("playScene")
                this.scene.launch('endScene')
            }
        }
        //this.timeLeft.text = this.timing
        if (this.timing >= 60){
            this.timing = 0
            this.timer -= 1
            this.timeLeft.text = "time: " + this.timer
        }
        if (this.timer < 0){
            this.end = true;
            this.pause = -1
        }
    }

    handleCollison(player, ship){
        this.cameras.main.shake(300);
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0)
        boom.anims.play('explode') 
        this.sound.play('sfx-explosion')
        let boom2 = this.add.sprite(this.ship.x, this.ship.y, 'explosion').setOrigin(0, 0)
        boom2.anims.play('explode')
        this.sound.play('sfx-explosion')
        ship.x = Phaser.Math.Between(0, this.game.config.width)
        ship.y = Phaser.Math.Between(-30, 0)
        this.ship.disableBody(true, true);
        ship.disableBody(true, true);
        this.crush = 1;
        this.end = true;
        this.pause = -1;
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
        if(this.shooting >= 25){
            this.bullets.fire(this.ship.x, this.ship.y, 0, -300);
            this.shooting = 0;
            this.sound.play('shot')
        }
        this.shooting += this.shootspeed
    }
}