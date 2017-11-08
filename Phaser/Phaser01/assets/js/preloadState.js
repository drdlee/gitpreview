var preloadState = {
  preload: function(){
      this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY,'logo');
      this.logo.anchor.setTo(0.5);
      this.logo.scale.setTo(0.12);
      
      this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 150,'preloadBar');
      this.preloadBar.anchor.setTo(0.5);
      this.load.setPreloadSprite(this.preloadBar);
      
      this.load.image('bg','/phaser/assets/pet/bg02.png');
      this.load.spritesheet('pet','/phaser/assets/pet/pet01-spritesheet-03.png',542, 474, 4, 1, 1);
      this.load.image('orange','/phaser/assets/pet/orange.png');
      this.load.image('candy','/phaser/assets/pet/Porygon_candy.png');
      this.load.image('toy','/phaser/assets/pet/toy.png');
      this.load.image('rotate','/phaser/assets/pet/rotate_right.png');
      
      
  },
  create: function(){
      this.state.start('homeState');
  }
};