$(document).ready(function(){
  $.getJSON("commit.php",function(result){
    $.each(result, function(i){
      $('.score-board table').append('<tr><td>' + result[i].nick + '</td><td>' + result[i].time + '</td><td>' + result[i].score + '</td></tr>');
    });
  });
});