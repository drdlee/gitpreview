/*global Phaser*/

var bootState = {
    init: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload: function(){
        this.load.image("loadingBar","/phaser/assets/platformer/loadingBar.png");
        this.load.image("logo","/phaser/assets/platformer/logo.png");
    },
    create: function(){
        this.game.stage.backgroundColor = "#282219";
        this.state.start('preloadState');
    }
};