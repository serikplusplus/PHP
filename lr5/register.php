
<?php
  session_start();
  $post = $_POST;//Получение массива ответов
  $host = 'localhost:3303';  // Хост, у нас все локально
  $user = 'root';    // Имя созданного вами пользователя
  $pass = 'root'; // Установленный вами пароль пользователю
  $db_name = 'mm';   // Имя базы данных
  $link = mysqli_connect($host, $user, $pass, $db_name); // Соединяемся с базой

   if(isset($post['sub']))//Если нажата кнопка отправки
   {

       $errors = array();//Массив ошибок
       $sql = mysqli_query($link, 'SELECT `login` FROM `mm`');//Запрос на получение данных с базы

       if (!$link) { // Если БД не отвечает
        $errors[] = "Не могу соединиться с БД.";
      }

       if (trim($post['login'])=="") { //Если логин пуст
           $errors[] = "Введите логин";
       }

       if (!preg_match('~^[a-z0-9_\-]*$~i',trim($post['login']))) {
            $errors[] = "Логин должен содержать только латиницу и цифры";
        }

       while ($result = mysqli_fetch_array($sql)) { //Проверка на уже существующего пользователя с данным логином
            if($result['login'] == trim($post['login']))
            {
                $errors[] = "Данный пользователь уже зарегестрирован";
            break;
            }
      }

       if ( $post['password'] =="") { //Не введен пароль
        $errors[] = "Введите пароль";
        }
        if ( $post['password2'] =="") { //Не введен пароль
            $errors[] = "Введите повторный пароль";
            }
        if(preg_match("/[а-я]/i", $post['password'])){
            $errors[] = "Пароль не  должен содержать кирилицу";
        }
        if($post['password'] != $post['password2']){
            $errors[] = "Пароли не совпадают";
        }


        if (trim($post['secondname']) == "") {
            $errors[] = "Введите фамилию";
          }
        if(!preg_match("/[а-яА-Я]/i",trim($post['secondname']))){
            $errors[] = "Фамилия должена содержать только кирилицу";
        }
        if(preg_match("/[\d]+/", trim($post['secondname']))){
            $errors[] = "Фамилия должена содержать только кирилицу";
        }
        if(mb_strlen(trim($post['secondname'])) < 2) {
            $errors[] = "Фамилия меньше 2 символов";
          }

          if (trim($post['fname']) == "") {
            $errors[] = "Введите имя";
          }
        if(!preg_match("/[а-яА-Я]/i", trim($post['fname']))){
            $errors[] = "Имя должено содержать только кирилицу";
        }
        if(preg_match("/[\d]+/", trim($post['fname']))){
            $errors[] = "Имя должено содержать только кирилицу";
        }
        if(mb_strlen(trim($post['fname'])) < 2) {
            $errors[] = "Имя меньше 2 символов";
          }


          if (trim($post['lastname']) == "") {
            $errors[] = "Введите отчество";
          }
        if(!preg_match("/[а-яА-Я]/i", trim($post['lastname']))){
            $errors[] = "Отчество должено содержать только кирилицу";
        }
        if(preg_match("/[\d]+/", trim($post['lastname']))){
            $errors[] = "Отчество должено содержать только кирилицу";
        }

        if(mb_strlen(trim($post['lastname'])) < 2) {
            $errors[] = "Отчество меньше 2 символов";
          }


          if (trim($post['ktel']) == "") {
            $errors[] = "Введите контактный телефон";
          }
          if(mb_strlen(trim($post['ktel'])) < 5) {
            $errors[] = "Контактный телефон меньше 5 символов</b>";
          }
          if (!preg_match("/^([0-9])+$/",trim($post['ktel']))) {
            $errors[] = "Контактный телефон должен содержать только цифры";
        }

        
        if (trim($post['mtel']) == "") {
            $errors[] = "Введите мобильный телефон";
          }
          if(mb_strlen(trim($post['mtel'])) < 5) {
            $errors[] = "Мобильный телефон меньше 5 символов</b>";
          }
          if (!preg_match("/^([0-9])+$/",trim($post['mtel']))) {
            $errors[] = "Мобильный телефон должен содержать только цифры";
        }


        if (trim($post['email']) == "") {
            $errors[] = "Введите E-mail";
          }
        if(mb_strlen(trim($post['mtel'])) < 7) {
            $errors[] = "E-mail меньше 5 символов</b>";
          }


          if ($post['lab'] == "") {
            $errors[] = "Введите учебное заведение";
          }
        if(mb_strlen($post['lab']) < 5) {
            $errors[] = "Учебное заведение меньше 5 символов";
          }


          if (trim($post['gor']) == "") {
            $errors[] = "Введите Город";
          }
        if(!preg_match("/[а-яА-Я]/i", trim($post['gor']))){
            $errors[] = "Город должен содержать только кирилицу";
        }
        if(preg_match("/[\d]+/", trim($post['gor']))){
            $errors[] = "Город должен содержать только кирилицу";
        }

        if(mb_strlen(trim($post['gor'])) < 2) {
            $errors[] = "Город меньше 2 символов";
          }


        if (empty($errors)) { //Если ошибок нет
            $log = trim($post['login']);
            $pas = password_hash($post['password'],PASSWORD_DEFAULT);//Хешированый пароль
            $secondname = trim($post['secondname']);
            $fname = trim($post['fname']);
            $lastname = trim($post['lastname']);
            $ktel = trim($post['ktel']);
            $mtel = trim($post['mtel']);
            $email = trim($post['email']);
            $contri = trim($post['contri']);
            $lab = $post['lab'];
            $gor = trim($post['gor']);

            $sql = mysqli_query($link, "INSERT INTO `mm` (`login`, `password`, `secondname`, `name`, `lastname`, `kontTel`, `mobTel`, `email`, `contri`, `stud`, `gorod`) 
            VALUES ('{$log}', '{$pas}', '{$secondname}', '{$fname}', '{$lastname}', '{$ktel}', '{$mtel}', '{$email}', '{$contri}', '{$lab}', '{$gor}')");//Запрос на добавление в Бд

            if ($sql) { //Если данные добавлены
              echo '<div style="color:green;font-size:25px;text-align:center;">Вы успешно зарегестрированы<br><a href="login.php">Войти</a></div><br>';
            } 
            else { //Если ошибка при добавлении
              echo '<div style="color:red;font-size:25px;text-align:center;">Произошла ошибка попробуйте еще раз</div><br>';
            }    
        }
        else { //Если ошибки имеются
           echo '<div style="color:red;font-size:25px;text-align:center;">'.array_shift($errors).'</div>';
        }
   }

?>

<link rel="stylesheet" href="register.css">
<form action="/register.php" method="POST" class="form">
        <label>
            Логин
            <input type="text" name="login" value="<?php echo @$post['login'];?>">
        </label>
        <label>
            Пароль
            <input type="password" name="password" value="<?php echo @$post['password'];?>">
        </label>
        <label>
            Пароль еще раз
            <input type="password" name="password2" value="<?php echo @$post['password2'];?>">
        </label>
        <label>
            Фамилия:
            <input type="text" name="secondname" id="secondname"  value="<?php echo @$post['secondname'];?>">
        </label>
        <label>
            Имя:
            <input type="text" name="fname" id="fname"  value="<?php echo @$post['fname'];?>">
        </label>
        <label>
            Отчество:
            <input type="text" name="lastname"  id="lastname" value="<?php echo @$post['lastname'];?>">
        </label>
        <label>
            Телефон контактный:
            <input type="tel" name="ktel" id="ktel" value="<?php echo @$post['ktel'];?>">
        </label>
        <label>
            Телефон мобильный:
            <input type="tel" name="mtel" id="tel" value="<?php echo @$post['mtel'];?>">
        </label>
        <label>
            Адрес электронной почты:
            <input type="email" name="email" value="<?php echo @$post['email'];?>">
        </label>

        <label>
            Страна:
            <select name="contri" id="" >
                <option value="Uk">Украина</option>
                <option value="Bl">Беларусь</option>
                <option value="Ru">Россия</option>
                <option value="Pl">Польша</option>
                <option value="Mol">Молдова</option>
            </select>
        </label>

        <fieldset>
            <legend>Информация об учебном заведении:</legend>
            <label>
                Название:
                <input type="text" name="lab" value="<?php echo @$post['lab'];?>">
            </label>
            <label>
                Город:
                <input type="text" name="gor" id="gor" value="<?php echo @$post['gor'];?>">
            </label>
        </fieldset>
        <button type="submit" class="button sub" name="sub">Отправить</button>
        <button type="reset" class="button res">Очистить</button>
</form>

