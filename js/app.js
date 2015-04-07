
// Define levels
var level = 1; // Start at level 1
var minSpeed = 0.1; // minimum bug speed; increases every level
var maxSpeed = 3.0; // maximum bug speed; increases every level

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}
rowArray = [50, 140, 240]; // array of y values for each row of bugs

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += 220 * this.speed * dt;
    if (this.x > 500) { // bug goes off of canvas
      this.x = -101; // start at a neg value so that the bug does not pop onto the map.
      var row = rowArray[Math.floor(Math.random() * rowArray.length)];
      this.y = row
      this.speed = (Math.random() * (maxSpeed - minSpeed) + minSpeed);
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/* PLAYER FUNCTIONS */
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// not sure why the player doesn't show up?
var Player = function() {
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
  // if collision, player dies
  if ((Math.floor(allEnemies[0].x) < this.x + 40) && (Math.floor(allEnemies[0].x) > this.x - 35) && Math.floor(allEnemies[0].y) == this.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[1].x) < this.x + 40) && (Math.floor(allEnemies[1].x) > this.x - 35) && Math.floor(allEnemies[1].y) == this.y) {
    playerDies(player);
  }
  if ((Math.floor(allEnemies[2].x) < this.x + 40) && (Math.floor(allEnemies[2].x) > this.x - 35) && Math.floor(allEnemies[2].y) == this.y) {
    playerDies(player);
  };

  // if player reaches top row
  if (this.y == -25) {
    y = true;
    winningTileArray.forEach(function(tile) {
      if (player.x == tile.x) {
        levelUp();
        y = false;
      }
    });
    if (y == true) {
      playerDies(player);
    }
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'down':
        this.gy++;
        break;
  };
  this.checkRange ();
}
      

// This function moves the player back to starting position after they die or
// complete a level.
var resetPlayer = function(player) {
  player.x = (ctx.canvas.width / 2) - (101/2);
  player.y = 400;
};


// Create a new class of tiles on the top row that a player must land on to beat a level.
// I thought it was weird that the player could go in the water, so I made it so
// the player dies if they go in the water, they must land on the 'tiles'
var WinningTile = function() {
  this.sprite = 'images/wood.png'
}

WinningTile.prototype.update = function(dt) {
}

// Draw the tiles on the screen
WinningTile.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/* Instantiate enemy objects at random x values
   Speed is initially set to 1, but is changed every time the bug crosses the screen
 */
allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);
enemy.x = -50;
enemy.y = rowArray[0];
enemy.speed = 1;
var enemy2 = new Enemy();
allEnemies.push(enemy2);
enemy2.x = 250;
enemy2.y = rowArray[1];
enemy2.speed = 1;
var enemy3 = new Enemy();
allEnemies.push(enemy3);
enemy3.x = -150;
enemy3.y = rowArray[2];
enemy3.speed = 1;

/* Instantiate player objects */
var player = new Player();
player.x = (ctx.canvas.width / 2) - (101/2);
player.y = 400;
player.lives = 3; // players has 3 lives


// This is a simple function that gets a random column number
var getRandomColumn = function(numCols) {
  return Math.floor(Math.random() * (numCols - 1))
}



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

