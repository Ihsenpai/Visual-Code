<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if(isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    // Ambil data user terlebih dahulu
    $user_query = "SELECT username, email FROM users WHERE id = '$user_id'";
    $user_result = mysqli_query($conn, $user_query);
    $user_data = mysqli_fetch_assoc($user_result);
    
    // Kemudian ambil data profile
    $profile_query = "SELECT * FROM user_profiles WHERE user_id = '$user_id'";
    $profile_result = mysqli_query($conn, $profile_query);
    $profile_data = mysqli_fetch_assoc($profile_result);
    
    // Gabungkan data
    $data = array_merge($user_data, $profile_data ?: []);
    
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
}

mysqli_close($conn);
?> 