<?php

    global $connection;
    include_once 'connect_db.php';

    $sql = "SELECT * FROM balance ORDER BY `currencies_char_code`";

    $result = $connection->query($sql)->fetch_all();

    echo json_encode($result);