<?php
header("Access-Control-Allow-Origin: *");
echo '<meta http-equiv="Content-Type" content="text/html; charset=utf8_unicode_ci">';
    $username = "waronter_jpw";
    $password = "@1094jord";
    $servername = "localhost";
    $database = "waronter_veteran";

    $conn = mysqli_connect($servername, $username, $password, $database);
    if(mysqli_connect_errno()){
      echo "Failed to connect to MySQL: " + mysqli_connect_error();
    }

    $target = $_POST['target'];
    $query = mysqli_query($conn, "SELECT * FROM veteran where  Name LIKE '%$target%'");

    while($data = mysqli_fetch_array($query)){
        echo '<b>Name: </b>';
        echo $data[3];
        echo '<br />';
        echo '<hr />';
        echo '<b>Age: </b>';
        echo $data[5];
        echo '<br />';
        echo '<hr />';
        echo '<b>From: </b>';
        $from = $data[11] . ", " . $data[10];
        echo $from;
        echo '<br />';
        echo '<hr />';
        echo '<b>Country: </b>';
        echo $data[2];
        echo '<br />';
        echo '<hr />';
        echo '<b>Rank: </b>';
        echo $data[4];
        echo '<br />';
        echo '<hr />';
        echo '<b>Branch: </b>';
        echo $data[9];
        echo '<br />';
        echo '<hr />';
        echo '<b>Unit: </b>';
        echo $data[12];
        echo '<br />';
        echo '<hr />';
        echo '<b>Stationed: </b>';
        echo $data[13];
        echo '<br />';
        echo '<hr />';
        echo '<b>Date of Death: </b>';
        echo $data[1];
        echo '<br />';
        echo '<hr />';
        echo '<b>Cause of Death: </b>';
        echo $data[6];
        echo '<br />';
        echo '<hr />';
        echo '<b>Place of Death: </b>';
        echo $data[8];
        echo '<br />';
        echo '<hr />';
        echo '<b>Province: </b>';
        echo $data[7];
        echo '<br />';

    }
?>