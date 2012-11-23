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
// This function is not general in any way and thus it can not be used elsewhere 
var toggleMute = function(arrayOfSounds) {
  for (var i = 0; i < arrayOfSounds.length; i++) {
      if (arrayOfSounds[i].isFading()) {
        arrayOfSounds[i].forceStopFade();
      };
  };
  if (Cookies.enabled) {
    if (Cookies.get("pongMuteState") == 1) {
      Cookies.set("pongMuteState", '0');
      arrayOfSounds[0].setVolume(0.5); // Theme
      arrayOfSounds[1].setVolume(1); // Hit
      arrayOfSounds[2].setVolume(1); // Gameover
    } else {
      Cookies.set("pongMuteState", '1');
      arrayOfSounds[0].setVolume(0); // Theme
      arrayOfSounds[1].setVolume(0); // Hit
      arrayOfSounds[2].setVolume(0); // Gameover
    }
  };
}