<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if(isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    $query = "SELECT u.username, p.name, p.profile_picture 
              FROM users u 
              LEFT JOIN user_profiles p ON u.id = p.user_id 
              WHERE u.id = '$user_id'";
              
    $result = mysqli_query($conn, $query);
    
    if($result && mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_assoc($result);
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to load profile']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
}

mysqli_close($conn);
?> 