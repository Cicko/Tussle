



var game = new Phaser.Game(screen.availWidth, screen.availHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('arrow', '../assets/images/brocoli.png');
}

var sprite;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';
  //  game.physics.arcade.gravity.y = 200;

    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.setTo(0.5, 0.5);

    //sprite.body.velocity.setTo(200, 200);

    // 1 is 100 % of energy return
    //sprite.bounce.set(1);
    //  Enable Arcade Physics for the sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    //  Tell it we don't want physics to manage the rotation
    sprite.body.allowRotation = true;

    sprite.body.collideWorldBounds = true;

}

function update() {
  sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);

}

function render() {

    game.debug.spriteInfo(sprite, 32, 32);
}
