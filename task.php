<?php
// Include database credentials
header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow origin for all requests
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allowed request methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");  // Make sure the response is JSON

$host = 'localhost';
$db_name = 'aycmzkkt_hafa_db';
$username = 'aycmzkkt_root';
$password = '55443322@Ad';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Return a JSON error response if the database connection fails
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['description']) && !empty($input['description'])) {
        $description = $input['description'];
        $assigned_to = isset($input['assigned_to']) ? $input['assigned_to'] : null;

        try {
            // Insert task into the database using PDO
            $stmt = $pdo->prepare("INSERT INTO tasks (description, assigned_to) VALUES (?, ?)");
            $stmt->bindParam(1, $description);
            $stmt->bindParam(2, $assigned_to);

            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Task added successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to add task']);
            }
        } catch (PDOException $e) {
            // Catch any errors and return them as JSON
            echo json_encode(['status' => 'error', 'message' => 'Database query error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
