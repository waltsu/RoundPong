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
    echo '1';
    $db->exec("insert into score (nick, time, score) values ($nick, $time, $score)");
    echo '2';
    $db = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

?>