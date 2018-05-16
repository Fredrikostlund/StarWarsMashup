<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$starship = $data->starship;
$name = $data->name;
$checkHasFav = "hej hej";

$User_id = mysqli_fetch_object(mysqli_query($conn, "SELECT User_id FROM Tbl_user WHERE User_name = '$name'"))->User_id;

$favExists = mysqli_query($conn, "SELECT * FROM Tbl_favorites WHERE Fav_name = '$starship'");
if(mysqli_num_rows($favExists) < 1) {
  mysqli_query($conn, "INSERT INTO Tbl_favorites (`Fav_name`) VALUES ('$starship')");
  echo "inne i if-sats i createFav.php";
}
$starshipId = mysqli_fetch_object(mysqli_query($conn, "SELECT Fav_id FROM Tbl_favorites WHERE Fav_name = '$starship'"))->Fav_id;

//$query = "SELECT * FROM Tbl_hasFav WHERE hasFav_Userid = $User_id AND hasFav_Favid = $starshipId";


$checkHasFav = mysqli_query($conn, "SELECT * FROM Tbl_hasFav WHERE hasFav_Userid = $User_id AND hasFav_Favid = $starshipId");

if(mysqli_num_rows($checkHasFav) < 1) {
  mysqli_query($conn, "INSERT INTO Tbl_hasFav (`hasFav_Userid`, `hasFav_Favid`) VALUES ($User_id, $starshipId)");
  echo "Favorite added";
}
else {
  echo json_encode(1);
}
?>
