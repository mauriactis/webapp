<?php
$user ="root";
$pwd="";

try{
    $conn = new PDO("mysql:host=localhost;dbname=provadb",$user,$pwd);
}catch(PDOException $ex){
    echo "errore: ".$ex->getMessage();
}

if(isset($_POST['chiave']) && $_POST['chiave'] === "Gino"){
    $username = $_POST['username'];
    $password = $_POST['password'];
    provaLogin($conn,$username,$password);
}
$conn = null;

function provaLogin($conn,$username,$password){
    $username = sha1($username);
    $password = sha1($password);
    $query = "SELECT username FROM amministratori WHERE username = ? AND password = ?";
    $stmSql = $conn->prepare($query);
    $stmSql->bindParam(1,$username);
    $stmSql->bindParam(2,$password);
    $result = $stmSql ->execute();
    if(!$result){
        echo -1;
    }

    $row = $stmSql->fetch();
    if(empty($row) || $row == NULL){
        echo -2;
    }else{
        
    session_start();
    $_SESSION['id'] = "CiSiamo";
    echo 0;
    }

}

?>