$(document).ready(function(){
  $.getJSON("commit.php",function(result){
    $.each(result, function(i){
      $.each(result[i], function(nick, time, score){
        console.log('nick: ' + nick + ' time: ' + time + ' score: ' + score);
      });
    });
  });
});