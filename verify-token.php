<?php
header("Access-Control-Allow-Origin: *"); // Replace with your frontend's domain
header("Access-Control-Allow-Methods: *"); // Allowed request methods
header("Access-Control-Allow-Headers: *"); // Allowed headers
header("Access-Control-Allow-Credentials: true");
require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secretKey = "your_secret_key";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$token = $data['token'] ?? '';

if (!$token) {
    http_response_code(400);
    echo json_encode(['valid' => false, 'error' => 'Token is required']);
    exit;
}

try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    echo json_encode(['valid' => true, 'decoded' => $decoded]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['valid' => false, 'error' => $e->getMessage()]);
}
?>
