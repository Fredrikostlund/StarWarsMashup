<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$user = $data->userName;

$sql = mysqli_query($conn, "SELECT * FROM `Tbl_user` WHERE `User_name`=$user");
$data = array();

if(mysqli_num_rows($sql) > 0) {
  while($row = mysqli_fetch_array($sql)) {
    $data[] = $row;
    echo json_encode($data);
  }
} else {
  echo json_encode(1);
}

?>
