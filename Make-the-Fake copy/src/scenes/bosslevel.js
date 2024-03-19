class Boss extends Phaser.Scene {
    constructor() {
        super("bossScene")
    }
    init() {
       this.end = false;
       this.pause = 1;
       this.shootspeed = 1;
       this.shooting = 0
       this.enemyshooting = 0
       this.enemyshootspeed = 1
       this.crush = 0
       score = 0;
       this.hp = 5
       this.bosshp = 100
       this.soundplay = 0;
    }

    preload(){

    }

    create(){
        lose = 0;
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
            key: 'megabullet',
            quantity: 60
        });

        //enemy set up
        this.enemy = this.physics.add.sprite(this.game.config.width / 2, 100, 'boss', 0);
        this.enemy.body.setSize(310, 305)

        // boss hp
        this.bar = new HealthBar(this, this.game.config.width / 2 - 80, 320);

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
        

        // get hit
        this.physics.add.overlap(this.enemy, this.bullets, (enemy, bullet) =>
        {
            this.bosshp -= 1;
            bullet.disableBody(true, true);
            this.bar.decrease(2);
        });
        
        //player get hit
        // this.physics.add.overlap(this.ship, this.enemyBullets, (player, bullet) =>
        // {
        //     const { x, y } = bullet.body.center;
        //     this.sound.play('hurt')
        //     this.hp -= 1
        //     bullet.disableBody(true, true);
        // });
        this.physics.add.collider(this.ship, this.enemyBullets, (player, bullet) =>
        {
            const { x, y } = bullet.body.center;
            this.sound.play('hurt')
            this.hp -= 1
            bullet.disableBody(true, true);
            this.cameras.main.shake(100);
        });
        this.physics.add.collider(this.ship, this.enemy, this.handleCollison, null, this)

        this.physics.world.on('worldbounds', (body) =>
        {
            body.gameObject.onWorldBounds();
        });
        //player hp
        this.heart1 = this.add.image(30, 30, "heart").setScale(0.5)
        this.heart2 = this.add.image(60, 30, "heart").setScale(0.5)
        this.heart3 = this.add.image(90, 30, "heart").setScale(0.5)
        this.heart4 = this.add.image(120, 30, "heart").setScale(0.5)
        this.heart5 = this.add.image(150, 30, "heart").setScale(0.5)
        // music
        this.bossbgm = this.sound.add('bossbgm', {
            loop: true,
            volume: 0.5, 
            })
        this.bossbgm.play()

        this.enemyMoving = this.tweens.add({
            targets: this.enemy.body.velocity, 
            props: {
                x: { from: 150, to: -150, duration: 4000 },
                y: { from: 50, to: -50, duration: 2000 }
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

    }

    update(){
        this.starfield.tilePositionY -= 4;
        this.sound.stopByKey('playbgm');
        this.sound.stopByKey('menubgm');
        if (this.bosshp <= 0){
            let boom2 = this.add.sprite(this.enemy.x, this.enemy.y, 'explosion').setOrigin(0, 0)
            this.enemy.disableBody(true, true);
            boom2.anims.play('explode').setScale(3)
            if (this.soundplay == 0){
                this.sound.play('big-explosion')
                this.soundplay = 1;
            }
            this.time.addEvent({
                delay: 300,
                callback: () =>
                {
  
                    this.end = true
                }
            });
        }
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
            this.crush = 1
            this.bossbgm.stop()
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
                this.Playermove()
                this.Playershoot()
                }
        }
        if (this.end == true){
            this.bossbgm.stop()
            if (score > hscore){
                hscore = score;
            }
            if (this.crush == 1){
                lose = 1
                this.time.addEvent({
                    delay: 300,
                    callback: () =>
                    {  
                        this.scene.stop("bossScene")
                        this.scene.launch('winScene')
                    }
                });
            }else{
                this.scene.stop("bossScene")
                this.scene.launch('winScene')
            }
        }
        
    }

    handleCollison(player, ship){
        let boom2 = this.add.sprite(this.ship.x, this.ship.y, 'explosion').setOrigin(0, 0)
        boom2.anims.play('explode')
        this.sound.play('sfx-explosion')
        this.ship.disableBody(true, true);
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