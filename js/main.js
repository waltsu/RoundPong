$(function () {
    var ctx = $('#main-canvas')[0].getContext("2d");
    

    ctx.beginPath();
    ctx.arc(400, 300, 200, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(250, 300, 15, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.fillRect(195, 270, 10, 70)

});
