<?php

// credentials for database
$user = 'gamedev';
$pass = 'ThisShouldBeOver9000';

if('POST' == $_SERVER['REQUEST_METHOD']){
	$nick = wordwrap($_POST['nick'], 15);
	$score = $_POST['score'];
	$time = $_POST['time'];

	if(empty($nick)){ $nick = "anonymous"; }

	try {
	    $db = new PDO('mysql:host=localhost;dbname=roundpong', $user, $pass);
	    $sth = $db->prepare('INSERT INTO score (nick, time, score) VALUES (:nick, :time, :score)');
		$sth->bindParam(':nick', $nick, PDO::PARAM_STR);
		$sth->bindParam(':score', $score, PDO::PARAM_STR);
		$sth->bindParam(':time', $time, PDO::PARAM_STR);
		$sth->execute();
		$id = $db->lastInsertId();
		$sth = $db->prepare("SELECT RowNr FROM ( SELECT ROW_NUMBER() OVER (ORDER BY score DESC, time ASC) AS RowNr, id FROM score ) sub WHERE sub.id = :id");
		$sth->bindParam(':id', $id, PDO::PARAM_STR);
		$sth->execute();
		$results = $sth->fetchAll(PDO::FETCH_ASSOC);
		print_r $results;
	    $db = null;
	} catch (PDOException $e) {
	    print "Error!: " . $e->getMessage() . "<br/>";
	    die();
	}
} else {
	header('Content-type: application/json');
	$db = new PDO('mysql:host=localhost;dbname=roundpong', $user, $pass);
	$statement = $db->prepare("SELECT nick, time, score FROM score ORDER BY score DESC, time ASC LIMIT 10");
	$statement->execute();
	$results = $statement->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($results);
	echo $json;
	$db = null;
}

?>