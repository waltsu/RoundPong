<?php

// credentials for database
$user = 'gamedev';
$pass = 'ThisShouldBeOver9000';

if(isset($_POST)){
	$nick = $_POST['nick'];
	$score = $_POST['score'];
	$time = $_POST['time'];

	try {
	    $db = new PDO('mysql:host=localhost;dbname=roundpong', $user, $pass);
	    $sth = $db->prepare('INSERT INTO score (nick, time, score) VALUES (:nick, :time, :score)');
		$sth->bindParam(':nick', $nick, PDO::PARAM_STR);
		$sth->bindParam(':score', $score, PDO::PARAM_STR);
		$sth->bindParam(':time', $time, PDO::PARAM_STR);
		$sth->execute();
	    $db = null;
	} catch (PDOException $e) {
	    print "Error!: " . $e->getMessage() . "<br/>";
	    die();
	}
} else {
	echo "apina";
	$db = new PDO('mysql:host=localhost;dbname=roundpong', $user, $pass);
	$statement = $db->prepare("SELECT nick, time, score FROM score");
	$statement->execute();
	$results = $statement->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($results);
	echo $json;
	$db = null;
}

?>