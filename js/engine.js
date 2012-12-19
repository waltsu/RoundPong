function PongEngine(ballImg) {
    var ballStartPosition = {'x': 350, 'y': 300},
        paddleStartPosition = {'x': 200, 'y': 300};

    this.canvas = $('#main-canvas');
    this.ctx = $('#main-canvas')[0].getContext("2d");
    this.ball = new Ball(this.ctx, ballStartPosition['x'], ballStartPosition['y'], ballImg);
    this.paddle = new Paddle(this.ctx, paddleStartPosition['x'], ballStartPosition['y']);
    this.area = new Area(this.ctx);
    this.runLoopId = 0;
    this.movingCount = 0;
    this.engineRunning = null;

    PongEngine.prototype.startEngine = function() {
        // Initialize
        this.ball.movingVector.elements = [-2,0];

        var runLoop = _.bind(this.runLoop, this);
        this.runLoopId = setInterval(runLoop, 33);
        this.engineRunning = true;
    }

    PongEngine.prototype.stopEngine = function() {
        clearInterval(this.runLoopId);
        this.engineRunning = false;
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
        this.movePaddle();
        this.renderGame();
    }

    PongEngine.prototype.increaseBallSpeed = function() {
        this.ball.movingVector = this.ball.movingVector.multiply(1.1);
    }

    PongEngine.prototype.movePaddle = function() {
        if (this.movingCount > 0) {
            for (i = 0; i < this.movingCount; i++) {
              this.paddle.movePaddleRight();
            }
        } else if (this.movingCount < 0) {
            for (i = 0; i > this.movingCount; i--) {
              this.paddle.movePaddleLeft();
            }
        }
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
        if (getMagnitude(ballToPaddleVector) < (this.paddle.length / 2)) {
            // If outer angle is smaller than PI/2, we are in the same line (or over) that paddle
            outerAngle = paddleOuterVector.angleFrom(ballToPaddleVector);
            // If directionAngle is smaller than PI/2, then ball is in the right side of paddle, so it might hit it
            directionAngle = paddleDirectionVector.angleFrom(ballToPaddleVector);

            var isBallBetweenPaddle = directionAngle >= 0 && directionAngle <= Math.PI;

            var ballDistance = this.ball.getBallDistanceFromCenter() + this.ball.img.width / 2;
            var isBallInSameLineWithPaddle = ballDistance >= this.area.getRadius(); 
            if (isBallBetweenPaddle && isBallInSameLineWithPaddle) {
                return true;
            }
        }
        return false;
    }

    PongEngine.prototype.isGameOver = function() {
        var ballDistance = this.ball.getBallDistanceFromCenter();
        // TODO: Fix this!
        return ballDistance > this.area.getRadius() - 10; // raja-arvo 17
    }

    PongEngine.prototype.getMovingVectorAfterCollide = function() {
        paddleDirectionVector = this.paddle.getDirectionVector();
        movingVector = this.ball.movingVector.dup();

        crossCollisionAngle = Math.PI - paddleDirectionVector.angleFrom(movingVector);

        return rotateVector(crossCollisionAngle * 2, movingVector);
        
    }

    PongEngine.prototype.isEngineRunning = function() {
        return this.engineRunning;
    }
}
