<?php
header('Content-Type: application/json');
require_once 'dbConn.php';

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';
$formData = $input['data'] ?? '';

if ($action === "addCashier") {
    if($formData['password'] !== $formData['confirmPassword']) {
        echo json_encode(['success' => false, 'message' => "Password does not match!"]);
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
        $hashedPassword,
        $formData['userRole'],
        $formData['contactNumber']
    ]);

    echo json_encode(['success' => true]);
    exit;
}

if($action == "getCashiers") {
    $search = '%' . ($input['search'] ?? '') . '%';
    $statement = $pdo->prepare(
        'SELECT 
            cashier_id,
            first_name, last_name,
            user_email, user_role, user_status,
            contact_number,
            date_added
        FROM cashier ORDER BY last_name ASC'
    );
    $statement->execute();
    $inventoryItems = $statement->fetchAll();

    echo json_encode(['success' => true, 'data' => $inventoryItems]);
}