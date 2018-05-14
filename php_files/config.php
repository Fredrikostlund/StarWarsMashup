<?php
$host = "127.0.0.1"; /* Host name */
$user = "root"; /* User */
$password = "admin"; /* Password */
$dbname = "Afi_3"; /* Database name */

$conn = mysqli_connect($host, $user, $password, $dbname);
// Check connection
if (!$conn) {
 die("Connection failed: " . mysqli_connect_error());
}
?>
