// To the global namespace just for now
var theme = new Soundgun("sounds/theme.ogg");
var hit = new Soundgun("sounds/hit.ogg");

$(function () {

/*
    // Some music
    theme.setVolume(0);
    theme.play();
    theme.fadeIn(70, 0.5);
    theme.loop();
    */

    engine = new PongEngine();
    engine.startEngine();

    var upPressed = function() {
        console.log("up");
        engine.ball.movingVector.elements[1]--;
    },
        downPressed = function() {
            console.log("down");
        engine.ball.movingVector.elements[1]++;
        },
        rightPressed = function() {
            // for now, move paddle 10 times right
            for(var i =  0; i < 10; i++) {
                engine.paddle.movePaddleRight();
            }
        },
        leftPressed = function() {
            for(var i = 0; i < 10; i++) {
                engine.paddle.movePaddleLeft();
            }
        };

    var keyHandlers = {39: rightPressed, 38: upPressed, 37: leftPressed, 40: downPressed};

    $(document).keydown(function(e, v) {
        try {
            keyHandlers[e.keyCode]();
        } catch(e) {
            // Do nothing
        }
        return false;
    });

    $('#main-canvas').bind('collision', function() {
        console.log("there was a collision!");
        hit.play();
    });

});
