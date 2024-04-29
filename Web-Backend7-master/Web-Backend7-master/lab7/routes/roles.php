<?php
session_start();
$db = new DatabaseConnector();
function route($method, $urlData, $formData)
{
    if (sizeof($urlData) > 1) {
        header('HTTP/1.0 501 Not Implemented');
        return;
    } else {
        switch ($method) {
            case 'GET':
                Get($urlData, $formData);
                break;
            case 'POST':
                Post($urlData, $formData);
                break;
            case 'PATCH':
                Patch($urlData, $formData);
                break;
            case 'DELETE':
                Delete($urlData, $formData);
                break;
            default:
                header('HTTP/1.0 501 Not Implemented');
                break;
        }
    }

    function Get($urlData, $formData)
    {
    }


}



?>