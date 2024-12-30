<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$servername = "localhost";
$username = 'aycmzkkt_root';  // Replace with your database username
$password = '55443322@Ad';      // Replace with your database password
$dbname = "aycmzkkt_hafa_db"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$request_method = $_SERVER['REQUEST_METHOD'];
$table = isset($_GET['table']) ? $_GET['table'] : '';
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($request_method) {
    case 'GET':
        if ($table) {
            getAllRecords($table);
        } else {
            echo json_encode(["error" => "Table name is required"]);
        }
        break;
    case 'DELETE':
        if ($table && $id) {
            deleteRecord($table, $id);
        } else {
            echo json_encode(["error" => "Table name and ID are required"]);
        }
        break;
    case 'PUT':
        if ($table && $id) {
            $input = json_decode(file_get_contents('php://input'), true);
            updateRecord($table, $id, $input);
        } else {
            echo json_encode(["error" => "Table name and ID are required"]);
        }
        break;
    default:
        echo json_encode(["error" => "Invalid request method"]);
        break;
}

function getAllRecords($table) {
    global $conn;
    $allowed_tables = ['announcements', 'projects', 'tasks', 'users', 'vacancies'];

    // Validate the table name
    if (!in_array($table, $allowed_tables)) {
        echo json_encode(["error" => "Invalid table name"]);
        return;
    }

    // Modify the SQL query for the projects table to exclude the 'image' column
    if ($table === 'projects') {
        $sql = "SELECT id, title, description, location, year, category, created_at, owner, is_featured FROM $table";
    } else {
        $sql = "SELECT * FROM $table";
    }

    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $data = [];
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        // Log the data to check its structure
        error_log(json_encode($data)); // This will log data to your PHP error log
        echo json_encode($data);
    } else {
        echo json_encode([]); // Ensure an empty array is returned if no data is found
    }
}

function deleteRecord($table, $id) {
    global $conn;
    $sql = "DELETE FROM $table WHERE id = $id";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Record deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete record"]);
    }
}

function updateRecord($table, $id, $data) {
    global $conn;
    $set_values = '55443322@Ad';
    foreach ($data as $key => $value) {
        $set_values .= "$key = '$value', ";
    }
    $set_values = rtrim($set_values, ", ");
    
    $sql = "UPDATE $table SET $set_values WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Record updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to update record"]);
    }
}

$conn->close();
?>
