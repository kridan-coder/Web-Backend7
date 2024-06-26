<?php
session_start();

// Определяем метод запроса
$method = $_SERVER['REQUEST_METHOD'];
// Получаем данные из тела запроса
$formData = getFormData($method);

// Разбираем url
$url = (isset($_GET['q'])) ? $_GET['q'] : '';
$url = rtrim($url, '/');
$urls = explode('/', $url);

// Определяем роутер и url data
$router = $urls[0];
$urlData = array_slice($urls, 1);

if (isset($url) && $router != ""){
    // Подключаем файл-роутер и запускаем главную функцию
    include_once 'routers/' . $router . '.php';
    route($method, $urlData, $formData);
}
else {
    header('HTTP/1.0 400 Bad Request');
    echo json_encode(array(
        'error' => 'Bad Request'
    ));
}

function getFormData($method) {

    // GET или POST: данные возвращаем как есть
    if ($method === 'GET') return $_GET;
    if ($method === 'POST') return $_POST;

    // PUT, PATCH или DELETE
    $data = array();
    $exploded = explode('&', file_get_contents('php://input'));

    foreach($exploded as $pair) {
        $item = explode('=', $pair);
        if (count($item) == 2) {
            $data[urldecode($item[0])] = urldecode($item[1]);
        }
    }

    return $data;
}

?>