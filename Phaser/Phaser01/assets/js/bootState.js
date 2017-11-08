/*global Phaser*/
var bootState = {
      init: function(){
          this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.scale.pageAlignHorizontally = true;
          this.scale.pageAlignVertically = true;
      },
      preload: function(){
          this.load.image('preloadBar','/phaser/assets/pet/animated-loader-background.png');
          this.load.image('logo','/phaser/assets/pet/orange.png');
      },
      create: function(){
          this.game.stage.backgroundColor = '#fff';
          
          this.state.start('preloadState');
      }
};