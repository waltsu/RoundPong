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

// Toggles the mute state of all the sounds in the passed array of soundGun objects
// The toggling decition is made based on the sound level of the last element in the array
// This function is not general in any way and thus it can not be used elsewhere 
var toggleMute = function(arrayOfSounds) {
  if (arrayOfSounds[arrayOfSounds.length-1].getVolume() > 0) {
    for (var i = 0; i < arrayOfSounds.length; i++) {
      if (arrayOfSounds[i].isFading()) {
        arrayOfSounds[i].forceStopFade();
      };
      arrayOfSounds[i].setVolume(0);
    };
    if (Cookies.enabled) {
      Cookies.set('pongMuteState', '1');
    };
  } else {
    arrayOfSounds[0].setVolume(0.5); // Theme
    arrayOfSounds[1].setVolume(1); // Hit
    arrayOfSounds[2].setVolume(1); // Gameover
    if (Cookies.enabled) {
      Cookies.set('pongMuteState', '0');
    };
  }
}