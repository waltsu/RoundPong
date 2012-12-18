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
        var tester = new Soundgun();
        tester = tester.supportedFormats();

        // Test what sounds to load based on browser support
        if (tester[1][1] == true) {
            soundArray[0] = new Soundgun("sounds/theme.ogg");
            soundArray[1] = new Soundgun("sounds/hit.ogg");
            soundArray[2] = new Soundgun("sounds/gameover.ogg");
            console.log("Chose ogg vorbis");
        } else if (tester[0][1] == true) {
            soundArray[0] = new Soundgun("sounds/theme.mp3");
            soundArray[1] = new Soundgun("sounds/hit.mp3");
            soundArray[2] = new Soundgun("sounds/gameover.mp3");
            console.log("Chose mp3");
        } else {
            soundArray[0] = new Soundgun("sounds/theme.wav");
            soundArray[1] = new Soundgun("sounds/hit.wav");
            soundArray[2] = new Soundgun("sounds/gameover.wav");
            console.log("Chose wav");
        }
        
        var muteButton = $('#mute-button');

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

        // Init TipTip
        $(".refresh-image").tipTip({defaultPosition: "top", });
        $("#mute-button").tipTip({defaultPosition: "top", });

        // Start game function
        function startGame() {
            
            // Play theme
            soundArray[0].play();

            // Init score
            score.useTransition(1);
            score.setValue('0');
            // Start timer
            timer.start();
            timeInterval = setInterval(function() {time.setValue(timer.getFormattedTime(timer.getCurrentTime()));}, 10);
            // Start engine
            engine = new PongEngine(ufoImg);
            engine.startEngine();
        }
        
        var movingCount = 0;

        var upPressed = function() {
            console.log("up");
        },
            downPressed = function() {
                console.log("down");
            },
            rightPressed = function() {
                engine.movingCount++;
            },
            leftPressed = function() {
                engine.movingCount--;
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

            engine.increaseBallSpeed();    
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
            $("input:text:visible:first").focus();
            
        });

        // When user submits scoreform
        $('#scoreform').submit(function(){
            if (engine.isEngineRunning() == false) {
                var newnick = $('#nick').val();
                var newtime = timer.getFinalTime();
                var newscore = score.getValue();
                var dataString = 'nick=' + newnick + '&time=' + newtime + '&score=' + newscore;
                $.ajax({
                    type: 'POST',
                    url: 'commit.php',
                    data: dataString,
                    success: function(data) {
                        console.log(data);
                        if(newnick == "") { newnick = "anonymous"; }
                        loadHighscore(data, newnick, newtime, newscore);
                        console.log(newnick + "," + newtime + "," + newscore);
                        $('#nameModal').fadeOut();
                        $('html, body').animate({
                            scrollTop: $("#score-board").offset().top
                        }, 1500);
                        $('#start-game-modal').fadeIn();
                    },
                    error: function(data) {
                        $('error-modal').fadeIn();
                    }
                });
                return false;
            };
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
            if (muteButton.css('background-image').indexOf('mute-off.png') != -1) {
                muteButton.css('background-image', 'url(img/mute-on.png)');
            } else {
                muteButton.css('background-image', 'url(img/mute-off.png)');
            }
            toggleMute(soundArray);
        });

        // refresh-images rotation value
        var rotationValue = 0;
        $(".refresh-image").click(function(){
            loadHighscore(null, null, null, null);
            rotationValue += 720;
            $(this).rotate({
                animateTo: rotationValue,
                duration: 2000
            });
        });

    });
    
});
