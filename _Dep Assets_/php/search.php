<?php
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf8_unicode_ci">';

$username = "waronter_jpw";
$password = "@1094jord";
$servername = "localhost";
$database = "waronter_veteran";

$conn = mysqli_connect($servername, $username, $password, $database);

if(mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " + mysqli_connect_error();
}
echo '<ul id="list-top">';
$target = $_POST['target'];
$query3 = mysqli_query($conn, "select Name from veteran where Name like '%$target%' or Rank like '%$target%' or Cause like '%$target%' or Province like '%$target%' or Branch like '%$target%' or State like '%$target%' or City like '%$target%' or Unit like '%$target%' or Stationed like '%$target%'");
$ctr = 0;
while($data = mysqli_fetch_array($query3)){
    echo '<li>';
    echo '<span id="vet-name' . $ctr . '">';
    echo $data[0];
    echo '</span>';
    echo '<button id="results-button' . $ctr . '" onclick="loadVetInfo(' . $ctr . ')">';
    echo 'View Information';
    echo '</button>';
    echo '<button id="view-results-button' . $ctr . '" onclick="viewVet(' . $ctr . ')">';
    echo 'View on Memorial';
    echo '</button>';
    echo '</li>';
    echo '<hr />';
    $ctr += 1;
}
echo '</ul>';
?>
