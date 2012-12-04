// Timer - a very simple JavaScript class to for creating a timer
// Author: Joonas Salovaara
// Website: http://jsalovaara.com

;function Timer (url) {

    // Class variables
    var start = null,
        stop = null;

    this.start = function () {
        start = new Date().getTime();
    }

    this.stop = function () {
        stop = new Date().getTime();
    }

    this.getFinalTime = function () {
        return (stop - start);
    }

    this.getCurrentTime = function () {
        return (new Date().getTime() - start);
    }

    var  fixZeros = function (neededLength, number) {
        var neededPadding = neededLength - String(number).length;
        var number = String(number);
        for (var i = 0; i < neededPadding; i++) {
            number = "0" + String(number);
        };
        return number;
    }

    this.getFormattedTime = function (milliseconds) {
        var pastTime = milliseconds;
        var minutes = Math.floor(pastTime / 60000);
        pastTime = pastTime - minutes * 60000;
        var seconds = Math.floor(pastTime / 1000);
        pastTime = pastTime - seconds * 1000;
        var mSeconds = pastTime;
        
        return fixZeros(2, minutes) + ":" + fixZeros(2, seconds) + ":" + fixZeros(1, mSeconds);
    }

}
