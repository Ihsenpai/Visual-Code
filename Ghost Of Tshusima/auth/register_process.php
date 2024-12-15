<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validasi input kosong
    if(empty($_POST['username']) || empty($_POST['email']) || empty($_POST['password']) || empty($_POST['confirm_password'])) {
        echo json_encode(['success' => false, 'message' => 'Semua field harus diisi']);
        exit();
    }

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    
    if ($password !== $confirm_password) {
        echo json_encode(['success' => false, 'message' => 'Password tidak cocok']);
        exit();
    }
    
    // Check if username exists
    $check_username = "SELECT id FROM users WHERE username = '$username'";
    $username_result = mysqli_query($conn, $check_username);
    
    if (mysqli_num_rows($username_result) > 0) {
        echo json_encode(['success' => false, 'message' => 'Username sudah digunakan']);
        exit();
    }
    
    // Check if email exists
    $check_email = "SELECT id FROM users WHERE email = '$email'";
    $email_result = mysqli_query($conn, $check_email);
    
    if (mysqli_num_rows($email_result) > 0) {
        echo json_encode(['success' => false, 'message' => 'Email sudah digunakan']);
        exit();
    }
    
    // Insert new user
    $insert_query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    
    if (mysqli_query($conn, $insert_query)) {
        $user_id = mysqli_insert_id($conn);
        
        // Create user profile
        $profile_query = "INSERT INTO user_profiles (user_id) VALUES ($user_id)";
        if (mysqli_query($conn, $profile_query)) {
            echo json_encode(['success' => true, 'message' => 'Registrasi berhasil! Silakan login.']);
        } else {
            // If profile creation fails, delete the user
            mysqli_query($conn, "DELETE FROM users WHERE id = $user_id");
            echo json_encode(['success' => false, 'message' => 'Gagal membuat profil: ' . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal registrasi: ' . mysqli_error($conn)]);
    }
    
    mysqli_close($conn);
}
?> 