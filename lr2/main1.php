<?php

$tname = $_POST['ServerNameList'];
$tnames = explode(",", $tname);
$countr = count($tnames)-1;
$otv = true;

if ($tname == "") {
    echo "<b>Список имен пуст</b>" . '<br>';
    $otv = false;
}

$user = 'root';
$password = 'root';
$db = 'lr2-php';
$host = 'localhost';
$port = 3303;
$link = mysqli_init();
$success = mysqli_real_connect(
   $link, 
   $host, 
   $user, 
   $password, 
   $db,
   $port
);

if (!$link) {
  echo 'Не могу соединиться с БД. Код ошибки: ' . mysqli_connect_errno() . ', ошибка: ' . mysqli_connect_error();
  exit;
}
if ($otv == true) {
    for ($i=0; $i < $countr ; $i++) { 
        $sql = NUll;
        $names = explode(" ", $tnames[$i]);
        $sname = $names[0];
        $fname = $names[1];
        $lname = $names[2];

        $sql = mysqli_query($link, "INSERT INTO `users` (`secondname`, `name`, `lastname`) VALUES('{$sname}', '{$fname}', '{$lname}')");

        if ($sql) {
            echo '<p>'.$sname.' '.$fname.' '.$lname.'</p>';
          } else {
            echo '<p>Произошла ошибка: ' . mysqli_error($link) . '</p>';
          }
    }
    
}

?>