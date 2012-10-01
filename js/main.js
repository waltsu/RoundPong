$(function () {
    engine = new PongEngine();
    engine.startEngine();

    var upPressed = function() {
        console.log("up");
    },
        downPressed = function() {
            console.log("down");
        },
        rightPressed = function() {
            console.log("right");
        },
        leftPressed = function() {
            console.log("left");
        };

    var keyHandlers = {39: rightPressed, 38: upPressed, 37: leftPressed, 40: downPressed};

    $('body').keydown(function(e, v) {
        keyHandlers[e.keyCode]();
    });

});
