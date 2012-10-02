var rotateVector = function(angle, vector) {
    x = vector.elements[0];
    y = vector.elements[1];
    cos = Math.cos
    sin = Math.sin

    newX = x*cos(angle) - y*sin(angle);
    newY = x*sin(angle) + y*cos(angle);

    return $V([newX, newY]);
}

var getMagnitude = function(vector) {
   pow = Math.pow;
   sqrt = Math.sqrt;
   x = vector.elements[0];
   y = vector.elements[1];

   return sqrt(pow(x,2) + pow(y,2))
}
