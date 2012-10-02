$(function () {
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
            console.log("right");
            engine.ball.movingVector.elements[0]++;
        },
        leftPressed = function() {
            console.log("left");
            engine.ball.movingVector.elements[0]--;
        };

    var keyHandlers = {39: rightPressed, 38: upPressed, 37: leftPressed, 40: downPressed};

    $('body').keydown(function(e, v) {
        keyHandlers[e.keyCode]();
    });

});
