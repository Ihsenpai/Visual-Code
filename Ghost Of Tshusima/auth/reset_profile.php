<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if(isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    // Hapus foto profil lama
    $query = "SELECT profile_picture FROM user_profiles WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);
    if($result && mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_assoc($result);
        if($data['profile_picture'] && 
           $data['profile_picture'] != 'assets/img/6522516.png' && 
           file_exists('../' . $data['profile_picture'])) {
            unlink('../' . $data['profile_picture']);
        }
    }
    
    // Reset data profil
    $reset_query = "UPDATE user_profiles SET 
                    name = NULL,
                    bio = NULL,
                    birthday = NULL,
                    country = NULL,
                    phone = NULL,
                    profile_picture = 'assets/img/6522516.png'
                    WHERE user_id = '$user_id'";
                    
    if(mysqli_query($conn, $reset_query)) {
        echo json_encode(['success' => true, 'message' => 'Profile has been reset']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to reset profile']);
    }
}

mysqli_close($conn);
?> 