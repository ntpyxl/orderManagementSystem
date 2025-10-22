<?php
header('Content-Type: application/json');
require_once 'dbConn.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';
$formData = $input['data'] ?? '';

if($action === "addItem") {
    $statement = $pdo->prepare('INSERT INTO inventory (item_name, item_image, price, added_by) VALUES (?, ?, ? ,?)');
    $statement->execute([$formData['itemName'], "image", $formData['itemPrice'], 1]);
    # TODO: CHANGE ITEM IMAGE TO BE FORMDATA'S ITEM IMAGE
    # TODO: CHANGE ADDED BY TO BE SESSION USER ID

    echo json_encode(['success' => true]);
    exit;
}

if($action == "getInventoryItems") {
    $search = '%' . ($input['search'] ?? '') . '%';
    $statement = $pdo->prepare('SELECT * FROM inventory
                            ORDER BY item_name DESC');
        
    $statement->execute([]);
    $inventoryItems = $statement->fetchAll();

    echo json_encode(['success' => true, 'data' => $inventoryItems]);
}