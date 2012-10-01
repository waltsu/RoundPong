function Ball(ctx, x, y) {
    this.ctx = ctx;
    this.x = x; 
    this.y = y;
    this.movingVector = $V([0,0]);

    this.render = function() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, Math.PI*2, true);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    this.applyMovingVector = function() {
        this.x += this.movingVector.elements[0];
        this.y += this.movingVector.elements[1];
    }
}

function Paddle(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.render = function() {
        this.ctx.fillRect(this.x, this.y, 10, 70)
    }
}

function Area(ctx) {
    this.ctx = ctx;

    this.render = function() {
        this.ctx.beginPath();
        this.ctx.arc(400, 300, 200, 0, Math.PI*2, true);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
