/*global Phaser, Plat*/
var gameState = {
    init: function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1200;
        
        this.levelData = JSON.parse(this.game.cache.getText('level'));
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        
        this.game.world.setBounds(0,0, 360, 723);
        this.RUNNING_SPEED = 200;
        this.JUMPING_SPEED = 600;
        this.BARREL_FREQ = 5;
        this.BARREL_SPEED = 120;
    },
    create: function(){
        this.ground = this.add.sprite(0, 651, 'ground');
        this.topGround = this.add.sprite(0, 20, 'ground');
        this.topGround.scale.y = -1;
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.platforms = this.add.group();
        this.platforms.enableBody = true;
        
        this.levelData.platformData.forEach(function(elem){
            this.platforms.create(elem.x, elem.y, 'platform');
        }, this);
        
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.allowGravity', false);
        
        this.fires = this.add.group();
        this.fires.enableBody = true;
        
        var fire;
        this.levelData.fireJson.forEach(function(elem){
            fire = this.fires.create(elem.x,elem.y,'fire');
            fire.animations.add('fire',[0,1],8, true);
            fire.play('fire');
        }, this);
        
        this.fires.setAll('body.allowGravity', false);
        
        this.barrels = this.add.group();
        this.barrels.enableBody = true;
        this.createBarrel();
        this.barrelGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.BARREL_FREQ, this.createBarrel, this);
        
        
        this.gorilla = this.add.sprite(6, 95, 'gorilla');
        this.game.physics.arcade.enable(this.gorilla);
        this.gorilla.body.allowGravity = false;
        
        this.player = this.add.sprite(323, 619, 'player',3);
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walking', [0,1,2,1], 6, true);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.customParams = {};
        this.game.camera.follow(this.player);
        
        this.onScreenButtons();
    },
    update: function(){
        this.game.physics.arcade.collide(this.player, this.ground);
        this.game.physics.arcade.collide(this.player, this.platforms);
        this.game.physics.arcade.collide(this.barrels, this.ground);
        this.game.physics.arcade.collide(this.barrels, this.platforms);
        this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
        // this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer);
        this.game.physics.arcade.overlap(this.player, this.gorilla, this.win);
        
        this.player.body.velocity.x = 0;
        
        if(this.cursors.left.isDown || this.player.customParams.walkLeft){
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.x = 1;
            this.player.animations.play('walking');
        }else if(this.cursors.right.isDown || this.player.customParams.walkRight){
            this.player.body.velocity.x += this.RUNNING_SPEED;
            this.player.scale.x = -1;
            this.player.animations.play('walking');
        }else{
            this.player.animations.stop();
            this.player.frame = 3;
        }
        
        if((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down){
            this.player.body.velocity.y -= this.JUMPING_SPEED;
            this.player.customParams.mustJump = false;
        }
        
        this.barrels.forEach(function(eachBarrel){
            if(eachBarrel.x > 330 && eachBarrel.y > 553){
                eachBarrel.kill();
                console.log('hit');
            }
        }, this);
    },
    landed: function(player, ground){
        console.log('landed')
    },
    onScreenButtons: function(){
        this.leftArrow = this.add.button(20, 679, 'arrowButton');
        this.rightArrow = this.add.button(110, 679, 'arrowButton');
        this.actionButton = this.add.button(280, 679, 'actionButton');
        
        this.leftArrow.alpha = 0.5;
        this.rightArrow.alpha = 0.5;
        this.actionButton.alpha = 0.5;
        
        this.actionButton.fixedToCamera = true;
        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        
        //Up on Screen Button
        this.actionButton.events.onInputDown.add(function(){
            this.player.customParams.mustJump = true;
        }, this);
        this.actionButton.events.onInputUp.add(function(){
            this.player.customParams.mustJump = false;
        }, this);
        
        //Left on Screen Button
        this.leftArrow.events.onInputDown.add(function(){
            this.player.customParams.walkLeft = true;
        }, this);
        this.leftArrow.events.onInputUp.add(function(){
            this.player.customParams.walkLeft = false;
        }, this);
        
        //Right on Screen Button
        this.rightArrow.events.onInputDown.add(function(){
            this.player.customParams.walkRight = true;
        }, this);
        this.rightArrow.events.onInputUp.add(function(){
            this.player.customParams.walkRight = false;
        }, this);
        
    },
    killPlayer: function(player, fire){
        console.log('DIEEEEEEE')
        Plat.state.start('gameState');
    },
    win: function(player, fire){
        alert('Gorilla Killed! you win!')
        Plat.state.start('gameState');
    },
    createBarrel: function(){
        var barrel = this.barrels.getFirstExists(false);
        
        if(!barrel){
            barrel = this.barrels.create(0,0, 'barrel');
        }
        barrel.body.collideWorldBounds = true;
        barrel.body.bounce.set(1,0);
        barrel.reset(6,95);
        barrel.body.velocity.x = this.BARREL_SPEED;
    }
};