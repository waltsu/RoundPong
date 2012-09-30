// Soundgun - a very simple JavaScript class to ease the playback of sounds
// in HTML5 Audio API supported browsers.
// Author: Joonas Salovaara
// Website: http://jsalovaara.com

// Usage examples:
// var dog = new Soundgun('sounds/small-bark.wav'); --> init the obj & load the audio file
// dog.play() --> play the sound once from start
// dog.loop() --> sets the loop mode on
// dog.unLoop() --> sets the loop mode off
// dog.pause() --> pauses the playback
// dog.resume() --> resumes the playback from where it was paused
// dog.loadFile('sounds/huge-bark.wav') --> pauses playback & loads a new audio file to the same instance
// dog.isSupported() --> checks if the browser supports HTML5 audio at all, returns true / false
// dog.supportedFormats() --> returns a two dimensional array of format support for example [MP3][true], [ACC][false]

;function Soundgun (url) {

    // Class variables
    this.url = url;
    this.hasPlayed = false;
    this.hasLoaded = false;
    this.sound = null;
    this.support_list = null;

    if (this.url != null) {
        this.loadFile(this.url);
    };

}

// Load the soundfile
Soundgun.prototype.loadFile = function (url) {
        if (this.hasLoaded == true) {
            this.sound.pause();
            console.log("File " + this.url + " had already been loaded. Playback paused and new file loaded on top.");
        };
        this.sound = new Audio(url);
        this.hasLoaded = true;
        this.url = url;
};

// Play the soundfile from the start
Soundgun.prototype.play = function () {
    if (this.hasPlayed == true) {
        this.hasLoaded = false;
        this.sound.currentTime = 0;
        this.hasPlayed = false;
    };
    this.sound.play();
    this.hasPlayed = true;
};

// Stop playing the sound file
Soundgun.prototype.pause = function () {
    this.sound.pause();
};

// Resume playing
Soundgun.prototype.resume = function () {
    this.sound.play();
};

// Loop the sound until unLoop is called
Soundgun.prototype.loop = function() {
    this.sound.loop = true;
};

// Stops looping the sound but lets the current sound playing play to the end normally
Soundgun.prototype.unLoop = function () {
    this.sound.loop = false;
};

// Checks is the browser supports HTML5 audio
Soundgun.prototype.isSupported = function () {
    return !!(document.createElement('audio').canPlayType);
};

// Retuns a two dimensional list of the browser supported audio file formats
Soundgun.prototype.supportedFormats = function () {
    if (this.support_list == null) {
        var testElement = document.createElement('audio');

        var canPlayMP3 = !!testElement.canPlayType && "" != testElement.canPlayType('audio/mpeg');
        var canPlayOggVorbis = !!testElement.canPlayType && "" != testElement.canPlayType('audio/ogg; codecs="vorbis"');
        var canPlayOggOpus = !!testElement.canPlayType && "" != testElement.canPlayType('audio/ogg; codecs="opus"');
        var canPlayAAC = !!testElement.canPlayType && "" != testElement.canPlayType('audio/aac');
        var canPlayWAV = !!testElement.canPlayType && "" != testElement.canPlayType('audio/wav');
        var canPlayWebM = !!testElement.canPlayType && "" != testElement.canPlayType('audio/webm; codecs="vorbis"');

        this.support_list = [['MP3', canPlayMP3],['OggVorbis', canPlayOggVorbis],['OggOpus', canPlayOggOpus],['AAC', canPlayAAC],['WAV', canPlayWAV],['WebM', canPlayWebM]];

        return this.support_list;
    } else {
        return this.support_list;
    }
};

// Start playing & fades in
Soundgun.prototype.fadeIn = function () {
    // TODO
};

// Fades out & pauses the playback
Soundgun.prototype.fadeOut = function () {
    // TODO
};