$(document).ready(function(){
  $.getJSON("commit.php",function(result){
    $.each(result, function(i){
      $.each(result[i], function(a, b){
        console.log(a + " x " + b)
      });
    });
  });
});