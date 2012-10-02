var getMagnitude = function(vector) {
   pow = Math.pow;
   sqrt = Math.sqrt;
   x = vector.elements[0];
   y = vector.elements[1];

   return sqrt(pow(x,2) + pow(y,2))
}
var PI = 3.14159265359

function PongEngine() {
    this.ctx = $('#main-canvas')[0].getContext("2d");
    this.ball = new Ball(this.ctx, 350, 300);
    this.paddle = new Paddle(this.ctx, 200, 260)
    this.area = new Area(this.ctx);

    PongEngine.prototype.startEngine = function() {
        // Initialize
        this.ball.movingVector.elements = [-4,1];

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
        this.calculateGame();
        this.renderGame();
    }

    PongEngine.prototype.calculateGame = function() {
        if(this.willCollide()) {
            this.ball.movingVector.elements = [0, 0];
        }
        this.ball.applyMovingVector();
    }

    PongEngine.prototype.willCollide = function() {
        paddleOuterVector = this.paddle.getOuterVector();
        paddleDirectionVecor = this.paddle.getDirectionVector();
        ballToPaddleVector = $V([this.ball.x - this.paddle.x, this.ball.y - this.paddle.y]);
        if (getMagnitude(ballToPaddleVector) < this.paddle.length) {
            // If outer angle is smaller than PI/2, we are in the same line (or over) that paddle
            outerAngle = paddleOuterVector.angleFrom(ballToPaddleVector);
            directionAngle = paddleDirectionVecor.angleFrom(ballToPaddleVector);
            if (outerAngle < Math.PI / 2 && directionAngle < Math.PI / 2) {
                console.log("collission");
                return true;
            }
        }
        return false;
    }
}
