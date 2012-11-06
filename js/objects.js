var centerX = 400;
var centerY = 300;

function Ball(ctx, x, y) {
    this.ctx = ctx;
    this.x = x; 
    this.y = y;
    this.movingVector = $V([0,0]);

    Ball.prototype.drawDebug = function() {
        // MOVING VECTOR
        this.ctx.strokeStyle='#cc0000';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        var dMovingVector = this.movingVector.x(10);
        this.ctx.lineTo(this.x + dMovingVector.elements[0], this.y + dMovingVector.elements[1]);
        this.ctx.stroke();
        this.ctx.closePath();

        // Center vector
        var centerVector = this.getCenterVector();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + centerVector.elements[0], this.y + centerVector.elements[1]);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle='#000000';
    
    }

    Ball.prototype.render = function() {
        this.drawDebug();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, Math.PI*2, true);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    Ball.prototype.applyMovingVector = function() {
        this.x += this.movingVector.elements[0];
        this.y += this.movingVector.elements[1];
    }

    Ball.prototype.getNextPosition = function() {
        return [this.x + this.movingVector.elements[0], this.y + this.movingVector.elements[1]];
    }

    Ball.prototype.getCenterVector = function() {
        return $V([centerX - this.x, centerY - this.y]);
    }

    Ball.prototype.getBallDistanceFromCenter = function() {
        return getMagnitude(this.getCenterVector());
    }
      
      

}

function Paddle(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.length = 70;
    this.width = 10; 
    this.rotation = 0;

    this.drawDebug = function() {
        // Draw debug-line for paddle rotation
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        rotationVector = this.getDirectionVector().multiply(200);
        this.ctx.lineTo(this.x + rotationVector.elements[0], this.y + rotationVector.elements[1]);
        this.ctx.stroke();
        this.ctx.closePath();

        // Draw line for center to circle
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        centerVector = this.getCenterVector();
        this.ctx.lineTo(this.x + centerVector.elements[0], this.y + centerVector.elements[1]);
        this.ctx.stroke();
        this.ctx.closePath();

    };

    Paddle.prototype.calculateRotation = function() {
        xCoordVector = $V([1,0]); 
        centerVector = this.getCenterVector();

        this.rotation = centerVector.angleFrom(xCoordVector);
        // Because angleFrom returns only angles [0, Math.PI], we need to check if paddle is at the lower part of the circle. And if it is, calculate real angle with 2*PI - angle
        if (centerVector.elements[1] < 0) {
            this.rotation = 2*Math.PI - this.rotation;
        }
    }

    Paddle.prototype.getCenterVector = function() {
        return $V([centerX - this.x, centerY - this.y]);
    }

    Paddle.prototype.movePaddleRight = function() {
        directionVector = this.getDirectionVector();
        this.x -= directionVector.elements[0];
        this.y -= directionVector.elements[1];
        this.calculateRotation();
    }

    Paddle.prototype.movePaddleLeft = function() {
        directionVector = this.getDirectionVector();
        this.x += directionVector.elements[0];
        this.y += directionVector.elements[1];
        this.calculateRotation();
    }

    Paddle.prototype.getOuterVector = function() {
        rotationVector = rotateVector(this.rotation, $V([0,1]));
        ret = rotateVector(Math.PI / 2, rotationVector);
        return ret;
    }

    Paddle.prototype.getDirectionVector = function() {
        return rotateVector(this.rotation, $V([0,1]));
    }

    Paddle.prototype.render = function() {
        // TODO: debug
        //this.drawDebug();
        // TODO: End of debug
        drawVector = $V([0, 1]);

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        
        firstSide = rotateVector(this.rotation, drawVector);
        firstSide = firstSide.multiply(this.length / 2);
        firstCornerX = this.x + firstSide.elements[0];
        firstCornerY = this.y + firstSide.elements[1];
        this.ctx.lineTo(firstCornerX, firstCornerY);

        secondSide = rotateVector(Math.PI / 2, firstSide);
        secondSide = secondSide.toUnitVector().multiply(this.width);
        secondCornerX  = firstCornerX + secondSide.elements[0];
        secondCornerY  = firstCornerY + secondSide.elements[1];
        this.ctx.lineTo(secondCornerX, secondCornerY);

        thirdSide = rotateVector(Math.PI / 2, secondSide);
        thirdSide = thirdSide.toUnitVector().multiply(this.length);
        thirdCornerX = secondCornerX + thirdSide.elements[0];
        thirdCornerY = secondCornerY + thirdSide.elements[1];
        this.ctx.lineTo(thirdCornerX, thirdCornerY);

        fourthSide = rotateVector(Math.PI / 2, thirdSide);
        fourthSide = fourthSide.toUnitVector().multiply(this.width);
        fourthCornerX = thirdCornerX + fourthSide.elements[0];
        fourthCornerY = thirdCornerY + fourthSide.elements[1];
        this.ctx.lineTo(fourthCornerX, fourthCornerY);
        
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.closePath();
    }

}

function Area(ctx) {
    this.ctx = ctx;
    this.radius = 200;

    Area.prototype.render = function() {
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, this.radius, 0, Math.PI*2, true);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    Area.prototype.getRadius = function() {
        return this.radius;
    }
}
