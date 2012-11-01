$(document).ready(function(){
  $.getJSON("commit.php",function(result){
    $.each(result, function(i, field){
      $(".score-board").append(field + " ");
    });
  });
});