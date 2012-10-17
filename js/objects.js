var centerX = 400;
var centerY = 300;

function Ball(ctx, x, y) {
    this.ctx = ctx;
    this.x = x; 
    this.y = y;
    this.movingVector = $V([0,0]);

    Ball.prototype.render = function() {
        // TODO: DEBUG MOVING VECTOR
        this.ctx.strokeStyle='#cc0000';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        var dMovingVector = this.movingVector.x(10);
        this.ctx.lineTo(this.x + dMovingVector.elements[0], this.y + dMovingVector.elements[1]);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.strokeStyle='#000000';

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
}

function Paddle(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.length = 70;
    this.width = 10; 
    this.rotation = 0;

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
        // Draw debug-line for paddle rotation
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        rotationVector = this.getDirectionVector().multiply(200);
        this.ctx.lineTo(this.x + rotationVector.elements[0], this.y + rotationVector.elements[1]);
        this.ctx.stroke();
        this.ctx.closePath();


        // TODO: End of debug
        drawVector = $V([0, 1]);

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        
        firstSide = rotateVector(this.rotation, drawVector);
        firstSide = firstSide.multiply(this.length); 
        this.ctx.lineTo(this.x + firstSide.elements[0], this.y + firstSide.elements[1]);
        

        secondSide = rotateVector(Math.PI / 2, firstSide);
        secondSide = secondSide.toUnitVector().multiply(this.width);
        this.ctx.lineTo(this.x + firstSide.elements[0] + secondSide.elements[0], this.y + firstSide.elements[1] + secondSide.elements[1]);

        thirdSide = rotateVector(Math.PI / 2, secondSide);
        thirdSide = thirdSide.toUnitVector();
        this.ctx.lineTo(this.x + secondSide.elements[0] + thirdSide.elements[0], this.y + secondSide.elements[1] + thirdSide.elements[1]);

        // Back to start
        this.ctx.lineTo(this.x, this.y);
        
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.closePath();
    }

}

function Area(ctx) {
    this.ctx = ctx;

    Area.prototype.render = function() {
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 200, 0, Math.PI*2, true);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
