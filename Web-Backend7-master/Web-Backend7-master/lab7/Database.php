<?php

use mysqli;

class Database
{
    private function GetDatabase(): mysqli
    {
        global  $host, $user, $password, $database;
        $db = mysqli_connect($host, $user, $password, $database)
        or die("Ошибка " . mysqli_error($db));
        return $db;
    }

    function GetAllRoles(): array {
        $db = $this->GetMySqlLink();
        $result = mysqli_query($db, "SELECT * FROM `roles`") or die(mysqli_error($db));
        $rowsAmount = mysqli_num_rows($result);
        $data = array();
        $dataFromRow = array();
        for ($i = 0; $i < $rowsAmount; $i++) {
            $temp_data = mysqli_fetch_assoc($result);
            foreach ($temp_data as $key => $value) {
                $dataFromRow[$key] = $value;
            }
            $data[] = $dataFromRow;
            $dataFromRow = array();
        }
        $db->close();
        return $data;

    }
}

?>