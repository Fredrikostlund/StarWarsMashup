<?php

include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$favId = $data->favId;
$name = $data->name;

$User_id = mysqli_fetch_object(mysqli_query($conn, "SELECT User_id FROM Tbl_user WHERE User_name = '$name'"))->User_id;
var_dump($User_id);
$sql = "DELETE FROM Tbl_hasFav WHERE `hasFav_Userid` = $User_id AND `hasFav_Favid` = $favId";

if(mysqli_query($conn, $sql)){
  echo "successfully deleted " .$User_id. "";
}else {
  echo "The favorite was not deleted " .$User_id. "";
}

?>
