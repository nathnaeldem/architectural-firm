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

    // Fetch vacancies
    $stmt = $pdo->query("SELECT * FROM vacancies");
    $vacancies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($vacancies);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
