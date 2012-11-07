// Init background image
$.backstretch(["img/bg.jpg"]);

// To the global namespace just for now
var theme = new Soundgun("sounds/theme.ogg");

$(function () {

    // Music & Sounds
    var hit = new Soundgun("sounds/hit.ogg");
    var gameover = new Soundgun("sounds/gameover.ogg");
    theme.setVolume(0);
    theme.play();
    theme.fadeIn(70, 0.5);
    theme.loop();

    // Text
    var score = new Textgun("#score");
    score.useTransition(1);
    score.setValue('0');
    var time = new Textgun("#time");

    engine = new PongEngine();
    engine.startEngine();

    // Start timer
    var timer = new Timer();
    timer.start();
    var timeInterval = setInterval(function() {time.setValue(timer.getFormattedTime(timer.getCurrentTime()));}, 100);

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
        var isArrowkey = function(keycode) {
            return keycode >= 37 && keycode <= 40;
        },
            forwardKeyPress = true;

        if (!isArrowkey(e.keyCode)) {
            forwardKeyPress = true;
        }  else {
            try {
                keyHandlers[e.keyCode]();
            } catch(e) {
                // Do nothing
            }
            forwardKeyPress = false;
        }
        return forwardKeyPress;
    });

    // Bind all game events. Game engine triggers them to canvas
    $('#main-canvas').bind('collision', function() {
        console.log("there was a collision!");
        hit.play();
        score.setValue(Number(score.getValue()) + 150);
    });
    $('#main-canvas').bind('gameOver', function() {
        gameover.play();
        theme.fadeOut();
        engine.stopEngine();
        timer.stop();
        time.setValue(timer.getFormattedTime(timer.getFinalTime()));
        clearInterval(timeInterval);
        console.log(timer.getFormattedTime(timer.getFinalTime()));

        // Display the nameModal
        $('#nameModal').fadeIn();
        
    });

    // When user submits scoreform
    $('#scoreform').submit(function(){
        var nick = $('#nick').val();
        var dataString = 'nick=' + nick + '&time=' + timer.getFormattedTime(timer.getFinalTime()) + '&score=' + score.getValue();
        $.ajax({
            type: 'POST',
            url: 'commit.php',
            data: dataString,
            success: function(data) {
                alert("Wrote to database ;)"); // testing
                loadHighscore();
            }
        });
        $('#nameModal').fadeOut();
        return false;
    });

    // When user restarts game
    $('#no-button').click(function(){
        $('#nameModal').fadeOut();
        window.location.reload();
        // TODO
    });

});
