<?php

// Replace with your frontend's domain
header("Access-Control-Allow-Origin: *"); // Allow origin for all requests
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allowed request methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

require 'db.php';
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "your_secret_key";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Username and password are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->execute(['username' => $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit;
    }

    $payload = [
        "iss" => "http://istore.x10.mx/", // Issuer
        "aud" => "http://istore.x10.mx/", // Audience
        "iat" => time(),           // Issued at
        "exp" => time() + (60 * 60), // Token expiry (1 hour)
        "username" => $user['username'],
        "role" => $user['role']
    ];

    $jwt = JWT::encode($payload, $secretKey, 'HS256');

    echo json_encode(['token' => $jwt, 'role' => $user['role']]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
?>
