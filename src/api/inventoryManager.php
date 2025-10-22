<?php
header('Content-Type: application/json');
require_once 'dbConn.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';
$formData = $input['data'] ?? '';

if($action === "addItem") {
    echo json_encode(['status' => 'success', 'data' => $formData]);
    exit;
}