$(document).ready(function(){
  $.getJSON("commit.php",function(result){
    $.each(result, function(a, b){
      console.log(result[a])
    });
  });
});