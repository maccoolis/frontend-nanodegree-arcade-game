//Global variables and constants

var cHeight = 606; //Canvas height
var cWidth = 505;  //Canvas width
var nRows = 6;     // No. of rows on canvas
var nCols = 5;     // No. of cols on canvas
var rowHeight = cHeight/nRows;  // Height of each row
var colWidth = cWidth/nCols;    // Width of each col
var speedMove = 2; // Determines the speed of movement of player, lower the number the faster the speed 
var xPlayerStart = colWidth*2; // x coord starting pos for Player
var yPlayerStart = rowHeight*4; // y coord starting pos for Player

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = xPlayerStart;
    this.y = yPlayerStart;
    this.keyPress = '';
    
 
};

Player.prototype.update = function () {

     //Now check the player movement and set the position of player
    switch (this.keyPress) {
        case 'up':
           this.y = this.y-((cHeight/nRows)/speedMove);
        break;
        case 'down':
           this.y = this.y+((cHeight/nRows)/speedMove);
        break;
        case 'left':
           this.x = this.x-((cWidth/nCols)/speedMove);
        break;
        case 'right':
           this.x = this.x+((cWidth/nCols)/speedMove);
        break;
    };

    // Reset the keypress so the update doesn't keep moving the player
    this.keyPress = '';
};

Player.prototype.render = function () {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys){

    // Work out the key press and set it for player update to process
    this.keyPress = keys;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = Player() ;
var allEnemies = [];

    
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Sets the game up and allows it to restart

function gameStartup() {

    var allEnemies = [];
    player = new Player;

}

function checkPlayerPosition() {

}