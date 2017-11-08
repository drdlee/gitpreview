var homeState = {
    init: function(message){
        this.message = message;
    },
    create: function(){
        var background = this.game.add.sprite(0,0,'bg');
        background.inputEnabled = true;
        
        background.events.onInputDown.add(function(){
            this.state.start('gameState');
        }, this);
        
        var style = {font: '35px Arial', fill: '#a57660'};
        var homeStart = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, 'Touch to start', style);
        homeStart.anchor.setTo(0.5);
        
        if(this.message){
            var gameover = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.message, style);
            gameover.anchor.setTo(0.5);
        }
    }
};