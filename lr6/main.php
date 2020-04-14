<?php
$host = 'localhost:3306';  // Хост
$user = 'root';    // Имя  пользователя
$pass = 'root'; // пароль 
$db_name = 'menu';   // Имя базы данных
$link = mysqli_connect($host, $user, $pass, $db_name);// ссылка на подключение
if (!$link) { // Если БД не отвечает
    echo "LOL";
}


$mm = mysqli_query($link, "SHOW COLUMNS FROM menu");// получение наименований колонок таблицы
$sql = mysqli_query($link, "SELECT * FROM `menu` ORDER BY `id`");// получение всех строк таблицы

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="font-size:20px;">
    <table border="2px" cellpadding="15px" cellspacing="0">
    <thead >
    <tr>
        <?php // вывод названий колонок таблицы
            while($t = mysqli_fetch_array($mm)){ 
                if($t[0] == 'id') continue;
            echo '<th>'.$t[0].'</th>';
            }
        ?>
    </tr>
    </thead>
    <tbody>
        <?php // вывод всех строк таблицы
            while($data = mysqli_fetch_array($sql)){ 
            echo '<tr>';
            echo '<td>'. $data['Блюдо'].'</td>';
            echo '<td>'. $data['Вес'].' гр.'.'</td>';
            echo '<td>'. $data['Цена'].' грн.'.'</td>';
            echo '<td>'. $data['Время приготовления'].' мин.'.'</td>';
            echo '<td>'. $data['Наличие'].'</td>';
            echo '</tr>';
            }
        ?>
    </tbody>
    </table>
</body>
</html>

