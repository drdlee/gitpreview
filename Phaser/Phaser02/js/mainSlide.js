/*global Phaser*/
var gameState = {
    preload: function(){
        this.load.image('background','/phaser/assets/animalSlide/background02.jpg');
        this.load.image('arrow','/phaser/assets/animalSlide/arrow-small.png');
        
        this.load.spritesheet('catYellow','/phaser/assets/animalSlide/catYellow-spritesheet.png', 547, 481, 10);
        this.load.spritesheet('catGray','/phaser/assets/animalSlide/catGray-spritesheet.png',542, 474, 10);
        this.load.spritesheet('ninja','/phaser/assets/animalSlide/ninnin-spritesheet.png', 536, 495, 10);
        this.load.spritesheet('robot','/phaser/assets/animalSlide/roboShoot-spritesheet.png', 567, 556, 4);
        
        this.load.audio('catYellowSnd', '/phaser/assets/animalSlide/cat01.mp3');
        this.load.audio('catGraySnd', '/phaser/assets/animalSlide/cat02.mp3');
        this.load.audio('ninjaSnd', '/phaser/assets/animalSlide/ninja.mp3');
        this.load.audio('robotSnd', '/phaser/assets/animalSlide/robot.mp3');
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.background = this.game.add.sprite(0, 0, 'background');
        
        // this.catGray = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'catGray');
        // this.catGray.anchor.setTo(0.5);
        // this.catGray.scale.setTo(0.4);
        // //---
        // this.catGray.inputEnabled = true;
        // this.catGray.input.pixelPerfectClick = true;
        // this.catGray.events.onInputDown.add(this.animateAnimal, this);
        
        var animalData = [
            {key: 'catYellow', text:'House Cat', audio:'catYellowSnd'},
            {key: 'catGray', text:'Pussy Cat', audio:'catGraySnd'},
            {key: 'ninja', text:'Ninja',audio:'ninjaSnd'},
            {key: 'robot', text:'Robot R2D3',audio:'robotSnd'}
            ];
        
        this.animals = this.game.add.group();
        var self = this;
        var animal;
        
        animalData.forEach(function(element){
            animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0); // <- this 0 is which frame to start
            animal.anchor.setTo(0.5);
            animal.scale.setTo(0.4);
            
            animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};
            
            animal.animations.add('animate', [0, 1, 2, 3], 7, false);
            
            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });
        
        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
        this.showText(this.currentAnimal);
        
        this.leftArrow = this.game.add.sprite(100, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.customParams = {direction: -1};
        //---
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
        
        this.rightArrow = this.game.add.sprite(540, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.scale.x = -1;
        this.rightArrow.customParams = {direction: 1};
        //---
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
    },
    update: function(){
        // this.catYellow.angle += 0.5;
    },
    switchAnimal: function(sprite, event){
        if(this.isMoving){
            return false;
        }
        this.isMoving = true;
        this.animalText.visible = false;
        
        var newAnimal, endX;
        
        if(sprite.customParams.direction > 0){
            newAnimal = this.animals.next();            // get the new animal from next in the array
            endX = 640 + this.currentAnimal.width/2;    // get the position for hiding the current animal after pressing rightArrow
            newAnimal.x = -newAnimal.width/2;
        }else{
            newAnimal = this.animals.previous();
            endX = -this.currentAnimal.width/2;
            newAnimal.x = 640 + newAnimal.width/2;
        }
        
        
        var newAnimalTween = this.game.add.tween(newAnimal);
        newAnimalTween.to({x: this.game.world.centerX}, 1000);
        newAnimalTween.onComplete.add(function(){
            this.isMoving = false;
            this.showText(newAnimal);
        }, this);
        newAnimalTween.start();
        
        var currentAnimalTween = this.game.add.tween(this.currentAnimal);
        currentAnimalTween.to({x: endX}, 1000);
        currentAnimalTween.start();
        // this.currentAnimal.x = endX;
        // newAnimal.x = this.game.world.centerX;
        this.currentAnimal = newAnimal;
        
        console.log('move animal');
    },
    animateAnimal: function(sprite, event){
        sprite.play('animate');
        sprite.customParams.sound.play();
        console.log('animate animal');
    },
    showText: function(animal){
        var style = {
            font: 'bold 30pt Arial',
            fill: '#D0171B',
            align: 'center'};
        if(!this.animalText){
            this.animalText = this.game.add.text(this.game.world.width/2, this.game.world.height * 0.85, '', style);
            this.animalText.anchor.setTo(0.5);
        }
        this.animalText.visible = true;
        this.animalText.setText(animal.customParams.text);
    }
};

var game = new Phaser.Game(640,360, Phaser.AUTO);

game.state.add('gameState', gameState);
game.state.start('gameState');

