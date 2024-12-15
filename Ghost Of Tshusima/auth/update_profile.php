<?php
session_start();
require_once '../config/database.php';

header('Content-Type: application/json');

if(isset($_SESSION['user_id']) && $_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_SESSION['user_id'];
    
    // Ambil data dari form
    $name = mysqli_real_escape_string($conn, $_POST['name'] ?? '');
    $bio = mysqli_real_escape_string($conn, $_POST['bio'] ?? '');
    $birthday = mysqli_real_escape_string($conn, $_POST['birthday'] ?? '');
    $country = mysqli_real_escape_string($conn, $_POST['country'] ?? '');
    $phone = mysqli_real_escape_string($conn, $_POST['phone'] ?? '');

    // Check if profile exists
    $check_query = "SELECT id FROM user_profiles WHERE user_id = '$user_id'";
    $check_result = mysqli_query($conn, $check_query);

    if(mysqli_num_rows($check_result) > 0) {
        // Update existing profile
        $query = "UPDATE user_profiles SET 
                  name = '$name',
                  bio = '$bio',
                  birthday = NULLIF('$birthday', ''),
                  country = '$country',
                  phone = '$phone'
                  WHERE user_id = '$user_id'";
    } else {
        // Create new profile
        $query = "INSERT INTO user_profiles (user_id, name, bio, birthday, country, phone) 
                  VALUES ('$user_id', '$name', '$bio', NULLIF('$birthday', ''), '$country', '$phone')";
    }

    if(mysqli_query($conn, $query)) {
        echo json_encode(['success' => true, 'message' => 'Profile updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . mysqli_error($conn)]);
    }
}

mysqli_close($conn);
?> 