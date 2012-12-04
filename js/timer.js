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

    var fixZerosAndPadding = function (neededLength, number) {
        var numLength = String(number).length;
        if (numLength > neededLength) {
            return String(number).substring(0, neededLength);
        } else if (numLength < neededLength) {
            var neededPadding = neededLength - numLength;
            var number = String(number);
            for (var i = 0; i < neededPadding; i++) {
                number = "0" + String(number);
            };
            return number;
        } else {
            return number;
        }
    }

    this.getFormattedTime = function (milliseconds) {
        var pastTime = milliseconds;
        var minutes = Math.floor(pastTime / 60000);
        pastTime = pastTime - minutes * 60000;
        var seconds = Math.floor(pastTime / 1000);
        pastTime = pastTime - seconds * 1000;
        var mSeconds = pastTime;
        
        return fixZerosAndPadding(2, minutes) + ":" + fixZerosAndPadding(2, seconds) + ":" + fixZerosAndPadding(2, mSeconds);
    }

}
