<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$character = $data->character;
$name = $data->name;



$sqlCheck = mysqli_query($conn, "SELECT * FROM `Tbl_user` WHERE `User_name`='$name'");
$data = array();

if(mysqli_num_rows($sqlCheck) > 0) {
  echo json_encode(1);
  } else {
  $sql = "INSERT INTO `Tbl_user`(`User_character`, `User_name`) VALUES ('$character', '$name')";

  if (mysqli_query($conn, $sql)) {
    echo "Data successfully added";
  }
  else {
    echo "Error: Not able to execute $sql" .mysqli_error($conn);
  }
  mysqli_close($conn);
}
?>
