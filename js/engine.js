var PI = 3.14159265359

function pongEngine() {
    this.ctx = $('#main-canvas')[0].getContext("2d");
    this.ball = new Ball(this.ctx, 50,50);
    this.paddle = new Paddle(this.ctx, 200, 260)
    this.area = new Area(this.ctx);

    this.init = function() {
    }
    this.startEngine = function() {
        this.init()

        var runLoop = _.bind(this.runLoop, this);
        setInterval(runLoop, 33);
    }


    this.renderGame = function() {
        this.ctx.clearRect(0, 0, 800, 600);
        this.ball.render(); 
        this.paddle.render(); 
        this.area.render(); 
    }

    this.runLoop = function() {
        this.ball.applyMovingVector();
        this.renderGame();
    }
}
