<?php
session_start();
$post = $_POST;
$host = 'localhost:3303';  // Хост, у нас все локально
$user = 'root';    // Имя созданного вами пользователя
$pass = 'root'; // Установленный вами пароль пользователю
$db_name = 'mm';   // Имя базы данных
$link = mysqli_connect($host, $user, $pass, $db_name);

if(isset($post['sub']))//Если нажата кнопка отправки
{
    $otv = 0;
    $errors = array();//Массив ошибок

      if (trim($post['login'])=="") { //Если логин пуст
        $errors[] = "Введите логин";
    }
    if (!preg_match('~^[a-z0-9_\-]*$~i',trim($post['login']))) {
        $errors[] = "Логин должен содержать только латиницу и цифры";
    }
    if ( $post['password'] =="") { //Не введен пароль
        $errors[] = "Введите пароль";
        }
    if(preg_match("/[а-я]/i", $post['password'])){
            $errors[] = "Пароль не  должен содержать кирилицу";
        }


    $log = trim($post['login']);
    $pas = $post['password'];
    $sql = mysqli_query($link, "SELECT * FROM `mm` WHERE `login` = '$log' ");//Запрос на получение данных с базы
    $result1 = mysqli_fetch_array($sql);
    $result = (object)$result1;
    if (!$link) { // Если БД не отвечает
        $errors[] = "Не могу соединиться с БД.";
    }

    if(count($result1)==0)
    {
        $errors[] = "Логин или пароль не верны";
    }
    if(!(password_verify($post['password'],$result->password)))
    {
        $errors[] = "Логин или пароль не верны";
    }

    if (empty($errors)) {

        // Версия через куки
        // setcookie('loged_user_name', $result1["name"], time() + 3600, "/");
        // setcookie('loged_user_sname',$result1["secondname"],time() + 3600,"/");
        // setcookie('loged_user_lname',$result1["lastname"],time() + 3600,"/");

        // Версия через сессию
        $_SESSION['loged_user'] = $result;

        header("Location: index.php");
         exit();
        }

    else { //Если ошибки имеются
            echo '<div style="color:red;font-size:25px;text-align:center;">'.array_shift($errors).'</div>';
         }
}

?>


<link rel="stylesheet" href="register.css">
<form action="login.php" method="POST" class="form">
    <label >
        Логин
        <input type="text" name="login">
    </label>
    <label >
         Пароль
        <input type="password" name="password">
    </label>
    <button type="submit" name="sub" class="button">Отправить</button>
    <a href="/register.php" class="button">Регистрация</a>
</form>


