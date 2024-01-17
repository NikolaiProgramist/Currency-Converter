<?php

    global $connection;
    include_once 'connect_db.php';

    $currency_from = $_GET['currency_from'];
    $currency_to = $_GET['currency_to'];
    $count = $_GET['count'];

    $nominal = '';
    $value = '';
    $vunit_rate = '';

    $sql = "SELECT * FROM balance WHERE `currencies_char_code` = '$currency_from'";
    $balance_from = $connection->query($sql)->fetch_all();

    if (!empty($balance_from) && !empty($count) && $count != '0' && $count != 0 && $currency_from != $currency_to && $balance_from[0][2] >= $count) {

        $sql = "SELECT * FROM balance WHERE `currencies_char_code` = '$currency_to'";
        $balance_to = $connection->query($sql)->fetch_all();

        if (empty($balance_to)) {
            $balance = '0';

            $sql = "INSERT INTO balance (`currencies_char_code`, `balance`) VALUES ('$currency_to', '0')";
            $connection->query($sql);
        } else {

            $balance = $balance_to[0][2];
        }

        $xml = simplexml_load_file('https://www.cbr.ru/scripts/XML_daily.asp?date_req=' . date('d/m/Y'));

        $nominal_from = $xml->xpath("//Valute[CharCode='{$currency_from}']/Nominal");
        $value_from = $xml->xpath("//Valute[CharCode='{$currency_from}']/Value");
        $vunit_rate_from = $xml->xpath("//Valute[CharCode='{$currency_from}']/VunitRate");

        $nominal_to = $xml->xpath("//Valute[CharCode='{$currency_to}']/Nominal");
        $value_to = $xml->xpath("//Valute[CharCode='{$currency_to}']/Value");
        $vunit_rate_to = $xml->xpath("//Valute[CharCode='{$currency_to}']/VunitRate");

        $balance_from = $balance_from[0][2] - $count;

        $sql = "UPDATE balance SET `balance` = '$balance_from' WHERE `currencies_char_code` = '$currency_from'";
        $connection->query($sql);

        if ($balance_from == '0' || $balance_from == 0) {
            $sql = "DELETE FROM balance WHERE `currencies_char_code` = '$currency_from'";
            $connection->query($sql);
        }

        $balance_to = round($count * ($value_from[0] / $nominal_from[0]), 3);
        $balance_to = $balance_to / ($value_to[0] / $nominal_to[0]);
        $balance_to = round($balance_to, 3);

        $balance_to = $balance + $balance_to;

        $sql = "UPDATE balance SET `balance` = '$balance_to' WHERE `currencies_char_code` = '$currency_to'";
        $connection->query($sql);

        echo json_encode('SUCCESS');
    } else {

        echo json_encode('ERROR');
    }