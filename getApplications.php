<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Database connection
$host = 'localhost';
$user = 'aycmzkkt_root';
$pass = '55443322@Ad';
$db = 'aycmzkkt_hafa_db';

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Set the charset
$conn->set_charset('utf8mb4');

$sql = "SELECT * FROM `applications`";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => $conn->error]);
} else {
    $applications = [];
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }
    echo json_encode($applications, JSON_PRETTY_PRINT);
}

$conn->close();
