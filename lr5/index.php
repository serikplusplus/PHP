<?php
session_start();
?>
<link rel="stylesheet" href="index.css">

<!--Версия через куки 
< ?php  if( $_COOKIE['loged_user_name'] != ''): ?>
      <p class="status_ok">Авторизован</p>

    <p class="info"> < ?=$_COOKIE['loged_user_name'];?> </p>
    <p class="info"> < ?=$_COOKIE['loged_user_sname'];?> </p>
    <p class="info"> < ?=$_COOKIE['loged_user_lname'];?> </p>

    <a href="logout.php" class="button">Выйти</a> -->



<!--Версия через сессию -->
<?php  if(isset($_SESSION['loged_user'])): ?>
    <p class="status_ok">Авторизован</p>
    <p class="info"><?php echo 'Фамилия: '.$_SESSION['loged_user']->secondname;?></p>
    <p class="info"><?php echo 'Имя: '.$_SESSION['loged_user']->name;?></p>
    <p class="info"><?php echo 'Отчество: '.$_SESSION['loged_user']->lastname;?></p>
    <a href="logout.php" class="button">Выйти</a>



<?php  else: ?>    
    <p class="status_bud">Не авторизован</p>
    <a href="login.php" class="button">Войти</a>
    <a href="register.php" class="button">Регистрация</a>
<?php  endif; ?> 