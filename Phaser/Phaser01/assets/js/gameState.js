/*global Phaser*/
var gameState = {

  create: function(){
      this.background = this.game.add.sprite(0,0,'bg');
      this.background.inputEnabled = true;
      this.background.events.onInputDown.add(this.placeItem, this);
      
      this.pet = this.game.add.sprite(100,400, 'pet');
      this.pet.anchor.setTo(0.5);
      this.pet.scale.setTo(0.3);
      this.pet.customParams = {health:100, fun: 100};
      this.pet.inputEnabled = true;
      this.pet.input.enableDrag();
      
      this.pet.animations.add('petAnim', [0,1,2,2,0], 7, false);
      
      this.orange = this.game.add.sprite(72, 570, 'orange');
      this.orange.anchor.setTo(0.5);
      this.orange.scale.setTo(0.2);
      this.orange.inputEnabled = true;
      this.orange.events.onInputDown.add(this.pickItem, this);
      this.orange.customParams = {health: 20};
      
      this.candy = this.game.add.sprite(144, 570, 'candy');
      this.candy.anchor.setTo(0.5);
      this.candy.scale.setTo(0.2);
      this.candy.inputEnabled = true;
      this.candy.events.onInputDown.add(this.pickItem, this);
      this.candy.customParams = {health: -10, fun: 10};
      
      this.toy = this.game.add.sprite(216, 570, 'toy');
      this.toy.anchor.setTo(0.5);
      this.toy.scale.setTo(0.2);
      this.toy.inputEnabled = true;
      this.toy.events.onInputDown.add(this.pickItem, this);
      this.toy.customParams = {fun: 20};
      
      this.rotate = this.game.add.sprite(288, 570, 'rotate');
      this.rotate.anchor.setTo(0.5);
      this.rotate.scale.setTo(0.2);
      this.rotate.inputEnabled = true;
      this.rotate.events.onInputDown.add(this.rotatePet, this);
    //   this.candy.customParams = {fun: 10};
      
      this.button = [this.orange, this.candy, this.toy, this.rotate];
      
      this.selectedItem = null;
      this.uiBlocked = false;
      
      var style = {font: '20px Arial', fill:'#c9aa5a'};
      this.game.add.text(10,20, 'Health: ',style);
      this.game.add.text(140,20, 'Fun: ',style);
      this.healthText = this.game.add.text(80,20, '', style);
      this.funText = this.game.add.text(185,20, '', style);
      
      this.refreshStat();
      
      this.statDecrease = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);
  },
  pickItem: function(sprite, event){
      if(!this.uiBlocked){
          console.log('pick item '+sprite+event);
          
          this.clearSelection();
          
          sprite.alpha = 0.4;
          this.selectedItem = sprite;
      }
  },
  rotatePet: function(sprite, event){
      if(!this.uiBlocked){
          console.log('rotate pet '+sprite+event);
          
          this.uiBlocked = true;
          
          this.clearSelection();
          sprite.alpha = 0.4;
          
          var petRotation = this.game.add.tween(this.pet);
          petRotation.to({angle: '+720'}, 1000);
          
          petRotation.onComplete.add(function(){
             this.uiBlocked = false;
             sprite.alpha = 1;
             this.pet.customParams.fun += 10;
             console.log(this.pet.customParams.fun);
             this.refreshStat();
          }, this);
          petRotation.start();
      }
      
  },
  clearSelection: function(){
      this.button.forEach(function(element, index){
          element.alpha = 1;
      });
      this.selectedItem = null;
  },
  placeItem: function(sprite, event){
      if(this.selectedItem && !this.uiBlocked){
          var x = event.position.x;
          var y = event.position.y;
          var newItem = this.game.add.sprite(x,y, this.selectedItem.key);
          newItem.anchor.setTo(0.5);
          newItem.scale.setTo(0.12);
          newItem.customParams = this.selectedItem.customParams;
          
          this.uiBlocked = true;
          
          var petMovement = this.game.add.tween(this.pet);
          petMovement.to({x:x, y:y}, 700);
          petMovement.onComplete.add(function(){
              this.pet.animations.play('petAnim');
              newItem.destroy();
              this.uiBlocked = false;
              
              var stat;
              for(stat in newItem.customParams){
                  if(newItem.customParams.hasOwnProperty(stat)){
                      this.pet.customParams[stat] += newItem.customParams[stat];
                      console.log(stat);
                  }
              }
              this.refreshStat();
              
          }, this);
          petMovement.start();
      }
  },
  refreshStat: function(){
      this.healthText.text = this.pet.customParams.health;
      this.funText.text = this.pet.customParams.fun;
  },
  reduceProperties: function(){
      this.pet.customParams.health -= 10;
      this.pet.customParams.fun -=15;
      this.refreshStat();
  },
  update: function(){
      if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0){
          this.pet.frame = 3;
          this.uiBlocked = true;
          
          this.game.time.events.add(2000, this.gameOver, this);
      }
  },
  gameOver: function(){
      this.game.state.start('homeState', true, false, 'GAME OVER');  // true >> restart game?  false >> want to reload all the preload data?
  }
};