$(function () {
    var canvas = $('#main-canvas')[0].getContext("2d");

    canvas.beginPath();
    canvas.arc(140, 80, 50, 0, Math.PI*2, true); 
    canvas.closePath();
    canvas.stroke();
});
