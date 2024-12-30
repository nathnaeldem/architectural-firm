<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'db.php';

$response = [];

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Validate required fields
        $title = $_POST['title'] ?? null;
        $description = $_POST['description'] ?? null;
        $location = $_POST['location'] ?? null;
        $year = $_POST['year'] ?? null;
        $category = $_POST['category'] ?? null;
        $owner = $_POST['owner'] ?? null;
        $is_featured = $_POST['is_featured'] ?? false;

        if (!$title || !$description || !$location || !$year || !$category || !isset($_FILES['image'])) {
            $response['success'] = false;
            $response['message'] = "All fields and an image are required.";
            echo json_encode($response);
            exit();
        }

        // Read the image as binary data
        $imageData = file_get_contents($_FILES['image']['tmp_name']);

        // Save data to the database
        $query = "INSERT INTO projects (title, description, location, image, year, category, owner, is_featured)
        VALUES (:title, :description, :location, :image, :year, :category, :owner, :is_featured)";
        
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':image', $imageData, PDO::PARAM_LOB);
        $stmt->bindParam(':year', $year);
        $stmt->bindParam(':category', $category);
        $stmt->bindParam(':owner', $owner);
        $stmt->bindParam(':is_featured', $is_featured, PDO::PARAM_BOOL);

        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = "Project uploaded successfully.";
        } else {
            $response['success'] = false;
            $response['message'] = "Failed to save project to the database. Error: " . implode(", ", $stmt->errorInfo());
        }
    } else {
        $response['success'] = false;
        $response['message'] = "Invalid request method.";
    }
} catch (Exception $e) {
    $response['success'] = false;
    $response['message'] = "An error occurred: " . $e->getMessage();
}

echo json_encode($response);
?>
