var centerX = 400;
var centerY = 300;
var areaRadius = 200;

function Ball(ctx, x, y, img) {
    this.ctx = ctx;
    this.x = x; 
    this.y = y;
    this.img = img;
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
        this.ctx.drawImage(this.img, this.x - this.img.width/2, this.y - this.img.height/2);
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

    Paddle.prototype.fixDistance = function() {
        var distance = getMagnitude(this.getCenterVector());
        var unitCenterVEctor = this.getCenterVector().toUnitVector();
        while (distance > areaRadius) {
            unitCenterVector = this.getCenterVector().toUnitVector();
            this.x += unitCenterVector.elements[0];
            this.y += unitCenterVector.elements[1];
            distance = getMagnitude(this.getCenterVector());
        }

    }

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
        this.fixDistance();
    }

    Paddle.prototype.movePaddleLeft = function() {
        directionVector = this.getDirectionVector();
        this.x += directionVector.elements[0];
        this.y += directionVector.elements[1];
        this.calculateRotation();
        this.fixDistance();
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
        var drawLineFromVector = _.bind(
            function(startPoint, vector) {
                cornerX = startPoint.x + vector.elements[0];
                cornerY = startPoint.y + vector.elements[1];
                this.ctx.lineTo(cornerX, cornerY);
                return {"x": cornerX, "y": cornerY};
            }, this);
        // TODO: debug
        //this.drawDebug();
        // TODO: End of debug
        drawVector = $V([0, 1]);

        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        
        firstSide = rotateVector(this.rotation, drawVector);
        firstSide = firstSide.multiply(this.length / 2);
        firstCorner = drawLineFromVector({"x": this.x, "y": this.y}, firstSide);

        secondSide = rotateVector(Math.PI / 2, firstSide);
        secondSide = secondSide.toUnitVector().multiply(this.width);
        secondCorner = drawLineFromVector(firstCorner, secondSide);

        thirdSide = rotateVector(Math.PI / 2, secondSide);
        thirdSide = thirdSide.toUnitVector().multiply(this.length);
        thirdCorner = drawLineFromVector(secondCorner, thirdSide);

        fourthSide = rotateVector(Math.PI / 2, thirdSide);
        fourthSide = fourthSide.toUnitVector().multiply(this.width);
        fourthCorner = drawLineFromVector(thirdCorner, fourthSide);
        
        this.ctx.fillStyle = "rgba(255,255,255,0.6)";
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.closePath();
    }

}

function Area(ctx) {
    this.ctx = ctx;
    this.radius = areaRadius;

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
