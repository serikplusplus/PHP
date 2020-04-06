<?php
 session_start();

 // Версия через куки
 // setcookie("loged_user[1]",'',time()-3600);
 // setcookie("loged_user[2]",'',time()-3600);
 // setcookie("loged_user[3]",'',time()-3600);

 //Версия через сессию	
 unset($_SESSION['loged_user']);



 header("Location: index.php");
 exit();
?>
