function PongEngine() {
    var ballStartPosition = {'x': 350, 'y': 300},
        paddleStartPosition = {'x': 200, 'y': 300};

    this.canvas = $('#main-canvas');
    this.ctx = $('#main-canvas')[0].getContext("2d");
    this.ball = new Ball(this.ctx, ballStartPosition['x'], ballStartPosition['y']);
    //this.paddle = new Paddle(this.ctx, 200, 260)
    this.paddle = new Paddle(this.ctx, paddleStartPosition['x'], ballStartPosition['y']);
    this.area = new Area(this.ctx);

    PongEngine.prototype.startEngine = function() {
        // Initialize
        this.ball.movingVector.elements = [-2,0];

        var runLoop = _.bind(this.runLoop, this);
        setInterval(runLoop, 33);
    }

    PongEngine.prototype.stopEngine = function() {
        this.ball.movingVector.elements = [0,0]; 
    }

    PongEngine.prototype.restartEngine = function() {
        this.ball.movingVector.elements = [-2,0];
        // Reset ball and paddle for start positions
        this.ball.x = ballStartPosition['x'];
        this.ball.y = ballStartPosition['y'];
        this.paddle.x = paddleStartPosition['x'];
        this.paddle.y = paddleStartPosition['y'];
        this.paddle.rotation = 0;
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
            newMovVect = this.getMovingVectorAfterCollide();
            this.ball.movingVector = newMovVect;
            this.canvas.trigger('collision');
        } else if(this.isGameOver()) {
            this.canvas.trigger('gameOver');
        }

        this.ball.applyMovingVector();
    }

    PongEngine.prototype.willCollide = function() {
        paddleOuterVector = this.paddle.getOuterVector();
        paddleDirectionVector = this.paddle.getDirectionVector();
        ballToPaddleVector = $V([this.ball.x - this.paddle.x, this.ball.y - this.paddle.y]);
        // If ballToPaddleVector magnitude is smaller than paddle length, we might have hit
        if (getMagnitude(ballToPaddleVector) < this.paddle.length) {
            // If outer angle is smaller than PI/2, we are in the same line (or over) that paddle
            outerAngle = paddleOuterVector.angleFrom(ballToPaddleVector);
            // If directionAngle is smaller than PI/2, then ball is in the right side of paddle, so it might hit it
            directionAngle = paddleDirectionVector.angleFrom(ballToPaddleVector);
            if (outerAngle < Math.PI / 2 && directionAngle < Math.PI / 2) {
                return true;
            }
        }
        return false;
    }

    PongEngine.prototype.isGameOver = function() {
        var ballDistance = this.ball.getBallDistanceFromCenter();
        // TODO: Fix this!
        return ballDistance > this.area.getRadius() + 10; // + 10 because for now the engine is a bit buggy, and hit will occur more or less over this.area.getRadius
    }

    PongEngine.prototype.getMovingVectorAfterCollide = function() {
        paddleDirectionVector = this.paddle.getDirectionVector();
        movingVector = this.ball.movingVector.dup();

        crossCollisionAngle = Math.PI - paddleDirectionVector.angleFrom(movingVector);

        return rotateVector(crossCollisionAngle * 2, movingVector);
        
    }
}
