$(function () {

    // Init background image
    $.backstretch(["img/bg.jpg"]);

    // Init sounds
    soundArray = new Array();
    soundArray[0] = new Soundgun("sounds/theme.ogg");;
    soundArray[1] = new Soundgun("sounds/hit.ogg");;
    soundArray[2] = new Soundgun("sounds/gameover.ogg");

    soundArray[0].loop();
    soundArray[0].setVolume(0);

    // Check if the browser supports cookies & if the user has left mute on last time
    if (Cookies.enabled) {
        if (Cookies.get('pongMuteState') == '0' || Cookies.get('pongMuteState') == null) {
            soundArray[0].play();
            soundArray[0].fadeIn(70, 0.5);
        } else {
            soundArray[0].play();
            toggleMute(soundArray);
            console.log("Toggled mute!");
        }
    } else {
        soundArray[0].play();
        soundArray[0].fadeIn(70, 0.5);
    }

    // Init changing text
    var time = new Textgun("#time");
    var score = new Textgun("#score");
    score.useTransition(1);
    score.setValue('0');

    // Init engine
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
        soundArray[1].play();
        score.setValue(Number(score.getValue()) + 150);
    });
    $('#main-canvas').bind('gameOver', function() {
        soundArray[2].play();
        soundArray[0].fadeOut();
        engine.stopEngine();
        timer.stop();
        time.setValue(timer.getFormattedTime(timer.getFinalTime()));
        clearInterval(timeInterval);

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
                loadHighscore();
                window.location.reload();
                // TODO
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

    $('#howto').click(function() {
        toggleMute(soundArray);
    });

});
