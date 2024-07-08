<?php
// api.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");

$conn = new mysqli("localhost:3306", "root", "", "locker_db");


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if (isset($data->mode) && $data->mode === 'dropoff') {
        $contactInfo = $data->contactInfo;
        $otp = rand(100000, 999999);
        $stmt = $conn->prepare("INSERT INTO orders (contact, otp, status) VALUES (?, ?, 0)");
        $stmt->bind_param("ss", $contactInfo, $otp);
        $stmt->execute();
        
        // Simulating sending OTP to customer
        echo json_encode(["message" => "Order received. Your OTP is: $otp"]);
    }
    elseif (isset($data->mode) && $data->mode === 'pickup') {
        $otp = $data->otp;
        $stmt = $conn->prepare("SELECT * FROM orders WHERE otp = ? AND status = 2");
        $stmt->bind_param("s", $otp);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $stmt = $conn->prepare("UPDATE orders SET status = 3 WHERE otp = ?");
            $stmt->bind_param("s", $otp);
            $stmt->execute();
            echo json_encode(["message" => "Order picked up successfully"]);
        } else {
            echo json_encode(["message" => "Invalid OTP or order not ready for pickup"]);
        }
    }
    elseif (isset($data->action) && $data->action === 'updateStatus') {
        $orderId = $data->orderId;
        $newStatus = $data->newStatus;
        $stmt = $conn->prepare("UPDATE orders SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $newStatus, $orderId);
        $stmt->execute();
        
        // Simulating sending status update to customer
        $stmt = $conn->prepare("SELECT contact FROM orders WHERE id = ?");
        $stmt->bind_param("i", $orderId);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $contactInfo = $row['contact'];
        
        echo json_encode(["message" => "Status updated. Notification sent to $contactInfo"]);
    }
}
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] === 'getOrders') {
        $result = $conn->query("SELECT * FROM orders");
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
        echo json_encode($orders);
    }
}

$conn->close();
?>