<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if(isset($_SESSION['user_id']) && isset($_FILES['profile_picture'])) {
    $user_id = $_SESSION['user_id'];
    $file = $_FILES['profile_picture'];
    
    // Cek dan buat direktori jika belum ada
    $upload_dir = '../uploads/profile_pictures/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    
    // Cek file lama dan hapus
    $query = "SELECT profile_picture FROM user_profiles WHERE user_id = '$user_id'";
    $result = mysqli_query($conn, $query);
    if($result && mysqli_num_rows($result) > 0) {
        $old_data = mysqli_fetch_assoc($result);
        if($old_data['profile_picture'] && 
           $old_data['profile_picture'] != 'assets/img/6522516.png' && 
           file_exists('../' . $old_data['profile_picture'])) {
            unlink('../' . $old_data['profile_picture']);
        }
    }
    
    // Upload file baru
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed_types = ['jpg', 'jpeg', 'png', 'gif'];
    
    if(!in_array($file_extension, $allowed_types)) {
        echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG and GIF allowed']);
        exit();
    }
    
    $file_name = $user_id . '_' . time() . '.' . $file_extension;
    $file_path = $upload_dir . $file_name;
    $relative_path = 'uploads/profile_pictures/' . $file_name;
    
    if(move_uploaded_file($file['tmp_name'], $file_path)) {
        $query = "UPDATE user_profiles SET profile_picture = '$relative_path' WHERE user_id = '$user_id'";
        
        if(mysqli_query($conn, $query)) {
            echo json_encode([
                'success' => true,
                'message' => 'Profile picture updated successfully',
                'path' => $relative_path
            ]);
        } else {
            unlink($file_path);
            echo json_encode(['success' => false, 'message' => 'Database update failed']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
    }
}

mysqli_close($conn);
?> 