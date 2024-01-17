<?php

    $xml = simplexml_load_file('https://www.cbr.ru/scripts/XML_daily.asp?date_req=' . date('d/m/Y'));
    $charCodes = $xml->xpath('//Valute/CharCode');

    echo json_encode($charCodes);