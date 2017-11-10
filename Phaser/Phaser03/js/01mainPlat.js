/*global Phaser, gameState, homeState, preloadState, bootState*/

var Plat = new Phaser.Game(360, 640, Phaser.AUTO);
Plat.state.add('gameState', gameState);
// Plat.state.add('homeState', homeState);
Plat.state.add('preloadState', preloadState);
Plat.state.add('bootState', bootState);
Plat.state.start('bootState');