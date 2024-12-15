<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if(isset($_SESSION['user_id']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    $current_password = $_POST['current_password'];
    $new_password = $_POST['new_password'];
    
    $check_query = "SELECT password FROM users WHERE id = '$user_id' AND password = '$current_password'";
    $result = mysqli_query($conn, $check_query);
    
    if(mysqli_num_rows($result) > 0) {
        $update_query = "UPDATE users SET password = '$new_password' WHERE id = '$user_id'";
        
        if(mysqli_query($conn, $update_query)) {
            echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Current password is incorrect']);
    }
}

mysqli_close($conn);
?> 