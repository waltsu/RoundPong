// add highscore entries to table
function loadHighscore(position, xnick, xtime, xscore) {
	var timer = new Timer();
	// is your score at top10?
	var added = 0;
	$.getJSON("commit.php",function(result){
		$('.score-board table').empty();
		$('.score-board table').append('<tr><th class="refresh-highscore"></th><th>Nickname</th><th>Time played</th><th>Score</th></tr>');
		$.each(result, function(i){
			var n = Number(i) + 1;
			if(xnick == result[i].nick && xtime == result[i].time && xscore == result[i].score) {
				$('.score-board table').append('<tr class="hilight"><td>' + n + '.</td><td>' + result[i].nick + '</td><td>' + timer.getFormattedTime(result[i].time) + '</td><td>' + result[i].score + '</td></tr>');
				// your score is found from top10
				added = 1;
			} else {
				$('.score-board table').append('<tr><td>' + n + '.</td><td>' + result[i].nick + '</td><td>' + timer.getFormattedTime(result[i].time) + '</td><td>' + result[i].score + '</td></tr>');
			}
		});
		if(added == 0 && xtime != null && xscore != null) {
			// if your score is not found from top10 it will be added at the bottom of the list
			$('.score-board table').append('<tr class="hilight hilight-last"><td>' + position + '.</td><td>' + xnick + '</td><td>' + timer.getFormattedTime(xtime) + '</td><td>' + xscore + '</td></tr>');
		}
	});
}

//setInterval(loadHighscore, 30000);

loadHighscore(null, null, null, null);