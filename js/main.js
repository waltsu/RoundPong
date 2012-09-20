$(function () {
    engine = new pongEngine();
    engine.startEngine();

    var upPressed = function() {
    },
        downPressed = function() {
        },
        rightPressed = function() {
        },
        leftPressed = function() {
        };

    $('body').keydown(function(e, v) {
        switch(e.keyCode) {
            case 39:
                rightPressed();
                break;
            case 38:
                upPressed();
                break;
            case 37:
                leftPressed();
                break;
            case 40:
                downPressed();
                break;
        }
    });

});
