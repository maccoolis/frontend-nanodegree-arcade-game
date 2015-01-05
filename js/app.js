//Global variables and constants

var cHeight = 606;                     // Canvas height
var cWidth = 505;                      // Canvas width
var nRows = 6;                         // No. of rows on canvas
var nCols = 5;                         // No. of cols on canvas
var rowHeight = cHeight/nRows;         // Height of each row
var colWidth = cWidth/nCols;           // Width of each col
var speedMove = 2;                     // Determines the speed of movement of player, lower the number the faster the speed 
var xPlayerStart = colWidth*2;         // x coord starting pos for Player
var yPlayerStart = rowHeight*4;        // y coord starting pos for Player
var minX = 0;                          // Min X coord allowed for player
var maxX = (colWidth*(nCols-1));       // MaX X coord allowed for player
var minY = -5 * speedMove;             // Min Y coord allowed for player
var maxY = (rowHeight*(nRows-2));      // Min Y coord allowed for player
var offscreenX = -200;                 // This is the x coord used to start the enemies spawning so they spawn off screen at different pts
var eSpeed = 200;                      // The speed of the enemies 

// Enemies started -------------------------------------------------------------------------------------------

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Get a random row for the enemy to start on
    this.y = rowHeight * (Math.floor((Math.random() * 3) + 1));
    // Get a random off screen position so they appear in diff. places
    this.x = (Math.floor((Math.random() * offscreenX) + 1));
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Only render the enemy if it's still within the board
    // If not set it back to the beginning
    if (this.x <= ctx.canvas.width) {
        // Change the position based on the speed of the enemies
        this.x = this.x + (eSpeed*dt);    
    } else {
        // Set x back off screen to the left and randomise the row it appears on
        this.x = (Math.floor((Math.random() * offscreenX) + 1));
        this.y = rowHeight * (Math.floor((Math.random() * 3) + 1));
    };
  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(enemy) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};


// Enemies finished -------------------------------------------------------------------------------------------

// Players starts ---------------------------------------------------------------------------------------------
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = xPlayerStart;
    this.y = yPlayerStart;
    this.keyPress = ''; 
};


// Update the player sprite position and details
Player.prototype.update = function () {
    
    // Now check the player movement and set the position of player
    // Check current x and y against the min and max settings
    switch (this.keyPress) {
        case 'up': 
           if (this.y > minY){
              this.y = this.y-((cHeight/nRows)/speedMove);
           };
        break;
        case 'down':
           if (this.y < maxY){
              this.y = this.y+((cHeight/nRows)/speedMove);
           };
        break;
        case 'left':
            if(this.x > minX) {
              this.x = this.x-((cWidth/nCols)/speedMove);
           };
        break;
        case 'right':
           if(this.x < maxX) {
              this.x = this.x+((cWidth/nCols)/speedMove);
           };
        break;

    };
    
    // Reset the keypress so the update doesn't keep moving the player
    this.keyPress = '';
};

//Render the player sprite on the board
Player.prototype.render = function () {

     // Draw the player sprite
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

// Receives the player keyboard inputs
Player.prototype.handleInput = function(keys){
    // Work out the key press and set it for player update to process
    this.keyPress = keys;
};


// Players class finished ----------------------------------------------------------------------------------------


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

// Other functions to help the game start ------------------------------------------------------------------------
// Sets the game up and allows it to restart

function gameStartup() {

    allEnemies = [];
    player = new Player;
     for (i=0; i < 5; i++) {
        allEnemies.push(new Enemy);
    };
};

/* unused so far
function getCol(spriteX){
    var xCol;
    for (i=1; i<=nCols; i++){
        coord = i * (cWidth/nCols);
        if (spriteX <= coord) {
            xCol = i;
            break;
        }
    };
    return xCol;
}
*/
// Other functions to help the game: finish -----------------------------------------------------------------------