// To the global namespace just for now
var theme = new Soundgun("sounds/long-test.ogg");

$(function () {
    engine = new PongEngine();
    engine.startEngine();

    // Some music
    theme.setVolume(0);
    theme.play();
    theme.fadeIn();
    theme.loop();

    var upPressed = function() {
        console.log("up");
        engine.ball.movingVector.elements[1]--;
    },
        downPressed = function() {
            console.log("down");
        engine.ball.movingVector.elements[1]++;
        },
        rightPressed = function() {
            console.log("right");
            engine.ball.movingVector.elements[0]++;
        },
        leftPressed = function() {
            console.log("left");
            engine.ball.movingVector.elements[0]--;
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
    });

});
