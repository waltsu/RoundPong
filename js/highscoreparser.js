// add highscore entries to table
function loadHighscore(xnick, xtime, xscore) {
	$.getJSON("commit.php",function(result){
		$('.score-board table').empty();
		$('.score-board table').append('<tr><th class="refresh-highscore"></th><th>Nickname</th><th>Time played</th><th>Score</th></tr>');
		$.each(result, function(i){
			var n = Number(i) + 1;
			if(xnick == result[i].nick && xtime == result[i].time && xscore == result[i].score) {
				$('.score-board table').append('<tr class="hilight"><td>' + n + '.</td><td>' + result[i].nick + '</td><td>' + result[i].time + '</td><td>' + result[i].score + '</td></tr>');
			} else {
				$('.score-board table').append('<tr><td>' + n + '.</td><td>' + result[i].nick + '</td><td>' + result[i].time + '</td><td>' + result[i].score + '</td></tr>');
			}
  			
		});
		});
}

setInterval(loadHighscore, 30000);

loadHighscore(null, null, null);