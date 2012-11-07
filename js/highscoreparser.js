$(document).ready(function(){

	// add highscore entries to table
	function loadHighscore(){
		$.getJSON("commit.php",function(result){
    		$.each(result, function(i){
      			$('.score-board table').html('<tr><td>' + result[i].nick + '</td><td>' + result[i].time + '</td><td>' + result[i].score + '</td></tr>');
    		});
  		});
	}

	setInterval(loadHighscore, 30000);

	loadHighscore();
});