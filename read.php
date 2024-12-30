<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'db.php';

$query = "SELECT * FROM projects";
$stmt = $pdo->prepare($query);
$stmt->execute();

$projects = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $row['image'] = 'data:image/jpeg;base64,' . base64_encode($row['image']); // Convert binary to Base64
    $projects[] = $row;
}

echo json_encode($projects);
?>
