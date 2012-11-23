

	// add highscore entries to table
	function loadHighscore(){
		$.getJSON("commit.php",function(result){
			$('.score-board table').empty();
			$('.score-board table').append('<tr><th class="refresh-highscore"></th><th>Nickname</th><th>Time played</th><th>Score</th></tr>');
    		$.each(result, function(i){
      			$('.score-board table').append('<tr><td>' + i+1 + '.</td><td>' + result[i].nick + '</td><td>' + result[i].time + '</td><td>' + result[i].score + '</td></tr>');
    		});
  		});
	}

	setInterval(loadHighscore, 30000);

	loadHighscore();
