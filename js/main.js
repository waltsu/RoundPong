// To the global namespace just for now
var theme = new Soundgun("sounds/theme.ogg");

$(function () {

    // Music & Sounds
    var hit = new Soundgun("sounds/hit.ogg");
    theme.setVolume(0);
    theme.play();
    theme.fadeIn(70, 0.5);
    theme.loop();

    // Text
    var score = new Textgun("#score");
    score.useTransition(1);
    var time = new Textgun("#time");

    engine = new PongEngine();
    engine.startEngine();

    // Start timer
    var timer = new Timer();
    timer.start();
    setInterval(function() {time.setValue(timer.getFormattedTime());}, 100);

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
        score.setValue(Number(score.getValue()) + 150);
    });

});
