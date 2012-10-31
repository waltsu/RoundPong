<?php

// credentials
$host = 'jsalovaara.com';
$dbname = 'roundpong';
$user = 'gamedev';
$pass = 'ThisShouldBeOver9000';

$nick = $_POST['nick'];
$score = $_POST['score'];
$time = $_POST['time'];

try {
    $db = new PDO('mysql:host=localhost;dbname=roundpong', $user, $pass);
    $sth = $dbh->prepare('INSERT INTO score (nick, time, score) VALUES (:nick, :time, :score)');
	$sth->bindParam(':nick', $nick, PDO::PARAM_STR);
	$sth->bindParam(':score', $score, PDO::PARAM_STR);
	$sth->bindParam(':time', $time, PDO::PARAM_STR);
	$sth->execute();
    $db = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

?>