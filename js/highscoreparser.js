$(document).ready(function(){
  $.getJSON("commit.php",function(result){
    console.log(result);
  });
});