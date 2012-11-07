$(document).ready(function(){

	// add highscore entries to table
	function loadHighscore(){
		$.getJSON("commit.php",function(result){
			$('.score-board table').empty();
    		$.each(result, function(i){
      			$('.score-board table').append('<tr><td>' + result[i].nick + '</td><td>' + result[i].time + '</td><td>' + result[i].score + '</td></tr>');
    		});
  		});
	}

	setInterval(loadHighscore, 30000);

	loadHighscore();
});