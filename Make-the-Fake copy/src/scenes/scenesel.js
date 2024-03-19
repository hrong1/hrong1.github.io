class Select extends Phaser.Scene {
    constructor() {
        super('sceneSelect')
    }

    init() {
        // variables
        this.scenenum = 0;
        this.move = 1
    }

    create(){
        if (menupick == 1){
            this.menubgm = this.sound.add('menubgm', {
                loop: true 
                })
            this.menubgm.play()
        }
        //Load background
        this.starfield = this.add.tileSprite(0, 0, 640, 720, 'starfield').setOrigin(0, 0)

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
        // shooting anime
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

        this.rectangleA = this.add.rectangle(5, 20, this.game.config.width - 10, 320).setOrigin(0, 0)
        this.rectangleA.setStrokeStyle(4, 0xffffff);

        this.rectangleB = this.add.rectangle(5, 360, this.game.config.width - 10, 320).setOrigin(0, 0)
        this.rectangleB.setStrokeStyle(4, 0xffffff);
        // fire anime
        this.enemy = this.add.image(this.game.config.width / 2, 480, 'boss').setScale(0.5)
        this.ship = this.add.image(this.game.config.width / 2, 300, 'spaceship')
        this.add.text(120, 380, 'Fight the Boss', menuConfig).setOrigin(0.5)
        this.add.text(180, 420, 'Defeat the Boss to win', menuConfig).setOrigin(0.5)
        this.add.text(120, 35, 'Time race: ', menuConfig).setOrigin(0.5)
        this.add.text(170, 60, 'Get the highest score', menuConfig).setOrigin(0.5)
        this.add.text(180, 90, 'within the limited time', menuConfig).setOrigin(0.5)
        this.enemyFiring = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () =>
            {
                if (this.pause != -1 && this.end != true){
                    this.enemyBullets.fire(this.enemy.x, this.enemy.y + 10, 0, 300);
                    this.bullets.fire(this.ship.x, this.ship.y, 0, -300);
                }
            }
        });


        this.rectangleA.setInteractive()
        this.rectangleB.setInteractive()
        // point move
        this.rectangleA.on("pointerover", () => {
            if (this.scenenum != 1){
                this.sound.play('sfx-select')
            }
            this.scenenum = 1;
            this.input.on('pointerdown', () =>
            {
                if (this.scenenum == 1){
                    //this.menubgm.stop()
                    this.sound.play('blip-select');
                    this.scene.stop("sceneSelect")
                    this.scene.launch('playScene')
                }
            })
        });
         this.rectangleB.on('pointerover', () => {
            if (this.scenenum != 2){
                this.sound.play('sfx-select')
            }
            this.scenenum = 2;
            this.input.on('pointerdown', () =>
            {
                if (this.scenenum == 2){
                    this.sound.play('blip-select');
                    this.scene.stop("sceneSelect")
                    this.scene.launch('bossScene')
                }
            })
        });
        this.rectangleA.on("pointerout", () => {
            if (this.scenenum == 1){
                this.scenenum = -1;

            }
        });
        this.rectangleB.on('pointerout', () => {
            if (this.scenenum == 2){
                this.scenenum = -1;

            }
         });
         this.physics.world.on('worldbounds', (body) =>
        {
            body.gameObject.onWorldBounds();
        });
    }

    update(){
        this.sound.stopByKey('playbgm');
        this.sound.stopByKey('bossbgm');
        this.starfield.tilePositionY -= 4;
        if (this.scenenum == 1){
            this.rectangleA.setStrokeStyle(4, 0xffffff);
            this.rectangleB.setStrokeStyle(4, 0x000000);
        }
        if (this.scenenum == 2){
            this.rectangleA.setStrokeStyle(4, 0x000000);
            this.rectangleB.setStrokeStyle(4, 0xffffff);
        }
        if (this.scenenum == 0){
            this.rectangleA.setStrokeStyle(4, 0x000000);
            this.rectangleB.setStrokeStyle(4, 0x000000);
        }

    }
}