<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$name = $data->Fav_name;

$sql = "INSERT INTO `Tbl_favorites`(`Fav_name`) VALUES ('$name')";

if (mysqli_query($conn, $sql)) {
  echo "Data successfully added";
}
else {
  echo "Error: Not able to execute $sql" .mysqli_error($conn);
}
mysqli_close($conn);
?>
