var preloadState = {
    preload: function(){
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY,'logo');
        this.logo.anchor.setTo(0.5);
        
        this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY+100,'loadingBar');
        this.loadingBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.loadingBar);
        
        this.load.spritesheet('player','/phaser/assets/platformer/player_spritesheet.png', 28, 32, 5, 1, 1);
        this.load.spritesheet('fire','/phaser/assets/platformer/fire_spritesheet.png', 20, 21, 2, 1, 1);
        this.load.image('barrel','/phaser/assets/platformer/barrel.png');
        this.load.image('gorilla','/phaser/assets/platformer/gorilla3.png');
        this.load.image('arrowButton','/phaser/assets/platformer/arrowButton.png');
        this.load.image('actionButton','/phaser/assets/platformer/actionButton.png');
        this.load.image('platform', '/phaser/assets/platformer/platform.png');
        this.load.image('ground', '/phaser/assets/platformer/ground.png');
        
        this.load.text('level','/phaser/js/platformer/levelData.json');
    },
    create: function(){
        this.state.start('gameState');
    }
};