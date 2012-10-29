// Textgun - a very simple JavaScript class to ease working with dynamic text
// in HTML5 supported browsers.
// Author: Joonas Salovaara
// Website: http://jsalovaara.com

// Usage examples:


;function Textgun (elementId, value) {
    // Class variables
    var self = this;
    var id = elementId;
    var text = value;
    var useTransition = -1;
    var element = null;

    // init
    (function () {
        // Handle element init
        if (elementId == null) {
            console.log("You didn't pass me a valid element id!");
        } else {
            element = $(id);
        }

        // Handle text init
        if (text == null) {
            text = "";
        }
    })();

    // Private update function
    var updateElement = function () {
        if (useTransition < 1) {
            element.html(text);
        }
        else {
            if (useTransition == 1) {
                // Fade out
                element.fadeOut('fast', function() {
                    element.html(text);
                    element.show();
                });              
            };
            if (useTransition == 2) {
                // Fade in-out
                element.fadeOut('fast', function() {
                    element.html(text);
                    element.fadeIn('fast');
                });
            };
            if (useTransition == 3) {
                // Side down & up
                element.slideUp('fast', function() {
                    element.html(text);
                    element.slideDown('normal');
                });
            };
        }
    }

    // initial update
    updateElement

    this.setValue = function (newValue) {
        text = newValue;
        updateElement();
        return;
    }

    this.getValue = function () {
        return text;
    }

    this.useTransition = function (number) {
        useTransition = number;
        return;
    }
};