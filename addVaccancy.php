<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$host = 'localhost';
$db_name = 'aycmzkkt_hafa_db';
$username = 'aycmzkkt_root';
$password = '55443322@Ad';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("INSERT INTO vacancies (title, location, type, description) VALUES (:title, :location, :type, :description)");
    $stmt->execute([
        ':title' => $data['title'],
        ':location' => $data['location'],
        ':type' => $data['type'],
        ':description' => $data['description']
    ]);

    echo json_encode(['success' => true, 'message' => 'Vacancy added successfully.']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
