<?php
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$host = 'localhost';
$db_name = 'aycmzkkt_hafa_db';
$username = 'aycmzkkt_root';
$password = '55443322@Ad';

try {
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(["error" => "Database connection failed: " . $e->getMessage()]));
}

try {
    // SQL query to fetch featured projects
    $sql = "SELECT id, title, location, year, category, owner, is_featured, 
            TO_BASE64(image) AS image FROM projects WHERE is_featured = 1";
    $stmt = $pdo->query($sql);

    // Fetch all results
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return as JSON
    echo json_encode($projects);
} catch (PDOException $e) {
    echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
}
?>
