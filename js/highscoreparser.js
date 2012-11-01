$(document).ready(function(){
  $.getJSON("commit.php",function(result){
    $.each(result, function(i){
      console.log('nick: ' + result[i]);
    });
  });
});