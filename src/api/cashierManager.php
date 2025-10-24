<?php
header('Content-Type: application/json');
require_once 'dbConn.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';
$formData = $input['data'] ?? '';

if ($action === "addCashier") {
    if($formData['password'] !== $formData['confirmPassword']) {
        echo json_encode(['success' => false, 'message' => "Password does not match!", 'data' => $formData]);
        exit;
    }

    $hashedPassword = password_hash($formData['password'], PASSWORD_DEFAULT);

    $statement = $pdo->prepare(
        'INSERT INTO cashier (first_name, last_name, user_email, user_password, user_role, contact_number)
        VALUES (?, ?, ?, ?, ?, ?)'
    );
    $statement->execute([
        $formData['firstName'],
        $formData['lastName'],
        $formData['email'],
        $formData['password'],
        $formData['userRole'],
        $formData['contactNumber']
    ]);

    echo json_encode(['success' => true, 'data' => $formData]);
    exit;
}

if($action == "getCashiers") {
    $search = '%' . ($input['search'] ?? '') . '%';
    $statement = $pdo->prepare(
        'SELECT * FROM cashier ORDER BY last_name ASC'
    );
    $statement->execute();
    $inventoryItems = $statement->fetchAll();

    echo json_encode(['success' => true, 'data' => $inventoryItems]);
}