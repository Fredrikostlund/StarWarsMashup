<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$character = $data->User_character;
$name = $data->User_name;

$sql = "INSERT INTO `Tbl_user`(`User_character`, `User_name`) VALUES ('$character', '$name')";

if (mysqli_query($conn, $sql)) {
  echo "Data successfully added";
}
else {
  echo "Error: Not able to execute $sql" .mysqli_error($conn);
}
mysqli_close($conn);
?>
