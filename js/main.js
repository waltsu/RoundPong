$(function () {
    var canvas = $('#main-canvas')[0].getContext("2d");
    

    canvas.beginPath();
    canvas.arc(400, 300, 200, 0, Math.PI*2, true); 
    canvas.stroke();
    canvas.closePath();
});
