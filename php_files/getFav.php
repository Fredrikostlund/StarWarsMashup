<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$user = $data->userName;

$sql = mysqli_query($conn, "
SELECT Tbl_favorites.Fav_name, Tbl_favorites.Fav_id, Tbl_user.User_name FROM Tbl_hasFav
INNER JOIN Tbl_favorites ON Tbl_favorites.Fav_id = Tbl_hasFav.hasFav_Favid
INNER JOIN Tbl_user ON Tbl_user.User_id = Tbl_hasFav.hasFav_Userid
WHERE User_name = '$user';
");
$data = array();

if(mysqli_num_rows($sql) > 0) {
  while($row = mysqli_fetch_array($sql)) {
    $data[] = $row;

  }
} else {
  $data = 1;
}
echo json_encode($data);
?>
