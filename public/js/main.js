


const DELAY_PAUSE_GAME = 0.3;
var game = new Phaser.Game(1400, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var sprite;


var mouth;
// Mouth (enemy) initial position
var mouthOriginX = 200;
var mouthOriginY = 200;

var mouthDelay = 4;
var mouthSpeed = 800;

var text = null;
var textReflect = null;

var timer;


var playerPosition;
var updatePlayerPositionInterval = 100;



function preload() {
    game.load.image('arrow', 'assets/images/brocoli.png');
    game.load.image('mouth', 'assets/images/mouth1.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    //  Create our Timer
     timer = game.time.create(false);

     //  Set a TimerEvent to occur after n milisecs.
     timer.loop(updatePlayerPositionInterval, updatePlayerPosition, this);

     //  Start the timer running - this is important!
     //  It won't start automatically, allowing you to hook it to button events and the like.
     timer.start();


     playerPosition = new Phaser.Point();

     playerPosition.x = mouthOriginX;
     playerPosition.y = mouthOriginY;

    game.stage.backgroundColor = '#00aa00';
  //  game.physics.arcade.gravity.y = 200;

    sprite = game.add.sprite(200, 150, 'arrow');
    mouth = game.add.sprite(200, 150, 'mouth');

    var size = 90;

    sprite.width = size;
    sprite.height = size;

    mouth.width = size * 1.5;
    mouth.height = size * 1.5;

    sprite.anchor.setTo(0.5, 0.5);

    //sprite.body.velocity.setTo(200, 200);

    // 1 is 100 % of energy return
    //sprite.bounce.set(1);
    //  Enable Arcade Physics for the sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.enable(mouth, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    sprite.body.allowRotation = true;
    mouth.body.allowRotation = true;

    sprite.body.collideWorldBounds = true;
    mouth.body.collideWorldBounds = true;



// WALLS
    //var wall1 = new Phaser.Physics.Box2D.Body(this.game, null, 655, 230, 0);
    //wall1.setRectangle(20, 50, 0, 0, 0);
    //wall1.static = true;

}


function updatePlayerPosition () {
  playerPosition.x = sprite.x;
  playerPosition.y = sprite.y;
}

function collisionHandler (obj1, obj2) {
    game.stage.backgroundColor = '#ff0000';
    drawText ();

    game.time.events.add(Phaser.Timer.SECOND * DELAY_PAUSE_GAME, pauseGame, this);
}

function pauseGame () {
  pause ();
}


function drawText () {
  text = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER ;(");

    //  Centers the text
    text.anchor.set(0.5);
    text.align = 'center';

    //  Our font + size
    text.font = 'Arial';
    text.fontWeight = 'bold';
    text.fontSize = 70;
    text.fill = '#ffffff';

    //  Here we create our fake reflection :)
    //  It's just another Text object, with an alpha gradient and flipped vertically

    textReflect = game.add.text(game.world.centerX, game.world.centerY + 50, "");

    //  Centers the text
    textReflect.anchor.set(0.5);
    textReflect.align = 'center';
    textReflect.scale.y = -1;

    //  Our font + size
    textReflect.font = 'Arial';
    textReflect.fontWeight = 'bold';
    textReflect.fontSize = 70;

    //  Here we create a linear gradient on the Text context.
    //  This uses the exact same method of creating a gradient as you do on a normal Canvas context.
    var grd = textReflect.context.createLinearGradient(0, 0, 0, text.canvas.height);

    //  Add in 2 color stops
    grd.addColorStop(0, 'rgba(255,255,255,0)');
    grd.addColorStop(1, 'rgba(255,255,255,0.08)');

    //  And apply to the Text
    textReflect.fill = grd;

}

function update() {
  sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);


  mouth.rotation = game.physics.arcade.moveToXY(mouth, playerPosition.x, playerPosition.y, mouthDelay, mouthSpeed);

  game.physics.arcade.collide(sprite, mouth, collisionHandler, null, this);
}

function render() {
  //  game.debug.spriteInfo(sprite, 32, 32);
}
