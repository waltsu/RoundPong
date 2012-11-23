$(function () {

    // Preload stuff
    var loader = new PxLoader(), 
        bgImg = loader.addImage('img/bg.jpg'), 
        earthImg = loader.addImage('img/earth-bg.png'), 
        ufoImg = loader.addImage('img/ufo.png'),
        earthImg = loader.addImage('img/mute-off.png'),
        earthImg = loader.addImage('img/mute-on.png');

    loader.start();

    // Execute after preloading has finished
    loader.addCompletionListener(function() { 
    
        // Init background image
        $.backstretch(["img/bg.jpg"]);

        // Init sounds
        soundArray = new Array();
        soundArray[0] = new Soundgun("sounds/theme.ogg");
        soundArray[1] = new Soundgun("sounds/hit.ogg");
        soundArray[2] = new Soundgun("sounds/gameover.ogg");

        // Set loop for theme
        soundArray[0].loop();

        // Check if the browser supports cookies & if the user has left mute on last time
        if (Cookies.enabled) {
            if (Cookies.get("pongMuteState") == 1) {
                $('#mute-button').css('background-image', 'url(img/mute-on.png)');
                soundArray[0].setVolume(0); // Theme
                soundArray[1].setVolume(0); // Hit
                soundArray[2].setVolume(0); // Gameover
            } else {
                soundArray[0].setVolume(0.5); // Theme
                soundArray[1].setVolume(1); // Hit
                soundArray[2].setVolume(1); // Gameover
            }
        };

        // Init changing text
        var time = new Textgun("#time");
        var score = new Textgun("#score");
        
        var engine;
        var timer = new Timer();
        var timeInterval;

        // "Restat" game function
        function startGame() {
            
            // Play theme
            soundArray[0].play();

            // Init score
            score.useTransition(1);
            score.setValue('0');
            // Start timer
            timer.start();
            timeInterval = setInterval(function() {time.setValue(timer.getFormattedTime(timer.getCurrentTime()));}, 100);
            // Start engine
            engine = new PongEngine();
            engine.startEngine();
        }

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

        // Bind start game button
        $("#start-button").click(function() {
            $("#start-game-modal").hide();
            startGame();
        });

        // Bind all game events. Game engine triggers them to canvas
        $('#main-canvas').bind('collision', function() {
            console.log("there was a collision!");
            soundArray[1].play();
            score.setValue(Number(score.getValue()) + 150);
        });
        $('#main-canvas').bind('gameOver', function() {
            soundArray[2].play();
            soundArray[0].pause();
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
                    $('#nameModal').fadeOut();
                    $('html, body').animate({
                        scrollTop: $("#elementtoScrollToID").offset().top
                    }, 2000);
                    $('#start-game-modal').fadeIn();
                },
                error: function(data) {
                    $('error-modal').fadeIn();
                }
            });
            return false;
        });

        // When user restarts game
        $('#no-button').click(function(){
            $('#nameModal').fadeOut();
            startGame();
        });

        // When clics error refres page
        $('#reload-page-button').click(function(){
            window.location.reload();
        });

        $('#mute-button').click(function(){
            toggleMute2(soundArray);
            var img = $('#mute-button');
            if (img.css('background-image').indexOf('mute-off.png') != -1) {
                img.css('background-image', 'url(img/mute-on.png)');
            } else {
                img.css('background-image', 'url(img/mute-off.png)');
            }
        });

    });
    
});
