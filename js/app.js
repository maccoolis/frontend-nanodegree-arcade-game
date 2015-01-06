//Global variables and constants

var cHeight = 606;                     // Canvas height
var cWidth = 505;                      // Canvas width
var nRows = 6;                         // No. of rows on canvas
var nCols = 5;                         // No. of cols on canvas
var rowHeight = cHeight/nRows;         // Height of each row
var colWidth = cWidth/nCols;           // Width of each col
var eRowStarts = [61,145,228,310]      // Pixel y coord enemy starting points for each row of water
var speedMove = 1;                     // Determines the speed of movement of player, lower the number the faster the speed 
var minX = 0;                          // Min X coord allowed for player
var maxX = (colWidth*(nCols-1));       // MaX X coord allowed for player
var minY = -5 * speedMove;             // Min Y coord allowed for player
var maxY = (rowHeight*(nRows-2));      // Min Y coord allowed for player
var offscreenX = -200;                 // This is the x coord used to start the enemies spawning so they spawn off screen at different pts
var eSpeed = 200;                      // The speed of the enemies 
var eQuantity = 5;                     // The number of enemies

var ePngHeight = 171;                  // The height of the enemy png for collision purposes 
var ePngWidth = 101;                   // The width of the enemy png for collision purposes
var eRightPad = 101;                   // Pixels to the actual right hand side of the enemy in the png for collision purposes
var eBottomPad = 27;                   // Pixels at the bottom of enemy bug that is blank for collision purposes
var eTopPad = 93;                      // Pixels from bottom to top of enemy bug that is blank for collision purposes

var pPngHeight = 171;                  // The height of the player png for collision purposes 
var pPngWidth = 101;                   // The width of the player png for collision purposes
var pRightPad = 82;                    // Pixels to the actual right hand side of the player in the png for collision purposes
var pBottomPad = 34;                   // Pixels at the bottom of player that is blank for collision purposes
var pTopPad = 107;                     // Pixels from bottom to top of player that is blank for collision purposes


var collisionTolerance = 0.01;         // Percentage collision tolerance
var xPlayerStart = colWidth*2;         // x coord starting pos for Player
var yPlayerStart = (rowHeight*4)       // y coord starting pos for Player

// Enemies stuff started -------------------------------------------------------------------------------------------

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Get a random row for the enemy to start on
    // Would prefer to use a random row based on variable heights but....(rowHeight) * (Math.floor((Math.random() * 3) + 1));
    this.y = eRowStarts[Math.floor((Math.random() * 4))];  
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
        this.y = eRowStarts[Math.floor((Math.random() * 4))];
    };
  
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(enemy) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
};

// Enemies stuff finished -------------------------------------------------------------------------------------------

// Players stuff starts ---------------------------------------------------------------------------------------------

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
     checkCollisions(player);
};

// Receives the player keyboard inputs
Player.prototype.handleInput = function(keys){
    // Work out the key press and set it for player update to process
    this.keyPress = keys;
};

function checkCollisions(player) {
    //Get the current co-ords for the player sprite
    var pX = player.x;
    var pY = player.y;
    var eX = [];
    var eY = [];

    //Now get the co-ords for all the enemies
    for (i=0; i <= eQuantity-1; i++) {
        // Put each enemy into an object and collect x and y coords
        var eObj = allEnemies[i];
        eX.push(eObj['x']);
        eY.push(eObj['y']);
        //console.log ('Enemy ' + i + ': ' + eX[i] + ':' + eY[i] );
    };
    //console.log ('Player: ' + pX + ':' + pY);
    // Now let's check for a collision
    // Get coords for the player sprite
    var pLeft = pX;
    var pBottom = pY;

    // Loop round and get coords for each enemy sprite
    // and check them against the player sprite for collision
    for (i=0; i <= eQuantity-1; i++) {
     
        var eLeft = eX[i];
        var eBottom = eY[i];

        // If all these statements are true then there must be a collision
        if (eLeft < (pLeft + pRightPad) &&                      // left of enemy right of player
            (eLeft + eRightPad) > pLeft &&                      // right of enemy left of player
            (eBottom - eBottomPad) > (pBottom - pTopPad) &&      // bottom of enemy top of player
            (eBottom - eTopPad) < (pBottom- pBottomPad) ) {      // top of enemy bottom of player
            // Collision detected
            var overlap = true;
        };
        
        if (overlap) {
            gameStartup();            
        }
    }
   
}

// Players stuff finished ----------------------------------------------------------------------------------------


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
     for (i=0; i <= eQuantity-1; i++) {
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