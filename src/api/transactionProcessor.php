<?php
header('Content-Type: application/json');
require_once 'dbConn.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';
$formData = $input['data'] ?? '';

if ($action === "checkOutCart") {
    $statement = $pdo->prepare(
        'INSERT INTO transactions (item_id, item_quantity) VALUES (?, ?)'
    );

    foreach($formData as $item) {
        $statement->execute([
            $item['itemId'],
            $item['itemQuantity']
        ]);
    }

    echo json_encode(['success' => true]);
}