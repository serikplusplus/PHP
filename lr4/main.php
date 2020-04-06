<?php

$fname = $_POST['fname'];
$secondname = $_POST['secondname'];
$lastname = $_POST['lastname'];
$ktel = $_POST['ktel'];
$mtel = $_POST['mtel'];
$email = $_POST['email'];
$contri = $_POST['contri'];
$lab = $_POST['lab'];
$gor = $_POST['gor'];
$otv = true;


$a = str_split($secondname);
sort($a);
if ($secondname == "") {
  echo "<b>Введите фамилию</b>".
  '<br>';
  $otv = false;
}
elseif (is_numeric($a[0]))
{
  echo "<b>Фамилия содержит цифры</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($secondname) < 2) {
  echo "<b>Фамилия меньше 2 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
$b = str_split($fname);
sort($b);
if ($fname == "") {
  echo "<b>Введите имя</b>".
  '<br>';
  $otv = false;
}
else if(is_numeric($b[0]))
{
  echo "<b>Имя содержит цифры</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($fname) < 2) {
  echo "<b>Имя меньше 2 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
$c = str_split($lastname);
sort($c);
if ($lastname == "") {
  echo "<b>Введите отчество</b>".
  '<br>';
  $otv = false;
}
else if(is_numeric($c[0]))
{
  echo "<b>Отчество содержит цифры</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($lastname) < 2) {
  echo "<b>Отчество меньше 2 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
if ($ktel == "") {
  echo "<b>Введите контактный телефон</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($ktel) < 5) {
  echo "<b>Контактный телефон меньше 5 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
if ($mtel == "") {
  echo "<b>Введите мобильный телефон</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($mtel) < 10) {
  echo "<b>Мобильный телефон меньше 10 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
if ($email == "") {
  echo "<b>Введите E-mail</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($email) < 7) {
  echo "<b>E-mail меньше 7 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
if ($lab == "") {
  echo "<b>Введите учебное заведение</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($lab) < 5) {
  echo "<b>Учебное заведение меньше 5 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
$d = str_split($gor);
sort($d);
if ($gor == "") {
  echo "<b>Введите город</b>".
  '<br>';
  $otv = false;
}
else if(is_numeric($d[0]))
{
  echo "<b>Город содержит цифры</b>".
  '<br>';
  $otv = false;
}
elseif(mb_strlen($gor) < 2) {
  echo "<b>Город меньше 2 символов</b>".
  '<br>';
  $otv = false;
}
//////////////////////////
$user = 'root';
$password = 'root';
$db = 'lr4-php';
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
  echo 'Не могу соединиться с БД. Код ошибки: '.mysqli_connect_errno().
  ', ошибка: '.mysqli_connect_error();
  exit;
}
if ($otv == true) {
  $sql = mysqli_query($link, "INSERT INTO `users` 
      (`secondname`, `name`, `lastname`, `kont-tel`, `mob-tel`, `email`, `contri`, `lab`, `gorod`) VALUES('{$secondname}', '{$fname}', '{$lastname}', '{$ktel}', '{$mtel}', '{$email}', '{$contri}', '{$lab}', '{$gor}')
      ");

      if ($sql) {
        echo '<p>Данные отправлены</p>';
      } else {
        echo '<p>Произошла ошибка: '.mysqli_error($link).
        '</p>';
      }
    }

?>