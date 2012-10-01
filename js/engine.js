var PI = 3.14159265359

function PongEngine() {
    this.ctx = $('#main-canvas')[0].getContext("2d");
    this.ball = new Ball(this.ctx, 50,50);
    this.paddle = new Paddle(this.ctx, 200, 260)
    this.area = new Area(this.ctx);

    PongEngine.prototype.startEngine = function() {

        var runLoop = _.bind(this.runLoop, this);
        setInterval(runLoop, 33);
    }


    PongEngine.prototype.renderGame = function() {
        this.ctx.clearRect(0, 0, 800, 600);
        this.ball.render(); 
        this.paddle.render(); 
        this.area.render(); 
    }

    PongEngine.prototype.runLoop = function() {
        this.ball.applyMovingVector();
        this.renderGame();
    }
}
