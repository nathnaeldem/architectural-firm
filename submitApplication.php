<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$host = "localhost";
$username = 'aycmzkkt_root';
$password = '55443322@Ad';
$dbname = "aycmzkkt_hafa_db";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        empty($_POST['fullName']) ||
        empty($_POST['email']) ||
        empty($_POST['phone']) ||
        empty($_POST['position']) ||
        empty($_POST['experience'])
    ) {
        http_response_code(400);
        echo json_encode(['error' => 'All required fields must be filled out.']);
        exit();
    }

    // Sanitize input data
    $fullName = htmlspecialchars($_POST['fullName']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $position = htmlspecialchars($_POST['position']);
    $experience = htmlspecialchars($_POST['experience']);
    $coverLetter = !empty($_POST['coverLetter']) ? htmlspecialchars($_POST['coverLetter']) : null;

    // Handle resume file
    $resumeContent = null;
    $resumeType = null;
    $resumeName = null;
    
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $resumeContent = file_get_contents($_FILES['resume']['tmp_name']);
        $resumeType = $_FILES['resume']['type'];
        $resumeName = $_FILES['resume']['name'];
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Resume file is required.']);
        exit();
    }

    // Insert into database
    try {
        $stmt = $pdo->prepare("
            INSERT INTO applications (
                full_name, email, phone, position, 
                experience, cover_letter, resume_content, 
                resume_type, resume_name
            )
            VALUES (
                :fullName, :email, :phone, :position, 
                :experience, :coverLetter, :resumeContent, 
                :resumeType, :resumeName
            )
        ");

        $stmt->execute([
            ':fullName' => $fullName,
            ':email' => $email,
            ':phone' => $phone,
            ':position' => $position,
            ':experience' => $experience,
            ':coverLetter' => $coverLetter,
            ':resumeContent' => $resumeContent,
            ':resumeType' => $resumeType,
            ':resumeName' => $resumeName
        ]);

        http_response_code(201);
        echo json_encode(['message' => 'Application submitted successfully!']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save application: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>