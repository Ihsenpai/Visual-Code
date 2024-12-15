<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if(isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    $query = "SELECT profile_picture FROM user_profiles WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);
    
    if($result && mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_assoc($result);
        if($data['profile_picture'] && file_exists('../' . $data['profile_picture'])) {
            echo json_encode(['success' => true, 'image' => $data['profile_picture']]);
        } else {
            echo json_encode(['success' => true, 'image' => 'assets/img/6522516.png']);
        }
    } else {
        echo json_encode(['success' => true, 'image' => 'assets/img/6522516.png']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
}

mysqli_close($conn);
?> 