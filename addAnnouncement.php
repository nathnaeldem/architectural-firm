<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$db_name = 'aycmzkkt_hafa_db';
$username = 'aycmzkkt_root';
$password = '55443322@Ad';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("INSERT INTO announcements (date, title, content, link) VALUES (:date, :title, :content, :link)");
    $stmt->execute([
        ':date' => $data['date'],
        ':title' => $data['title'],
        ':content' => $data['content'],
        ':link' => $data['link']
    ]);

    echo json_encode(['success' => true, 'message' => 'Announcement added successfully.']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
