<?php

    $user = "root"; $pwd = "root"; $risposta = ""; $conn = null;
    date_default_timezone_set('Europe/Rome');
    
		try{
			// connessione
			$conn = new PDO("mysql:host=localhost;dbname=provadb", $user, $pwd);
			// abilita gestione errori tramite try … catch  (Exception)
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch(PDOException $ex){
		   $risposta = "Errore connessione: ".$ex->getMessage();
	}

    switch($_GET['op']){
        case 'caricaHome':
            $id = $_POST['id'];
            caricaHome($conn,$id);
        break;

        case 'login':
            $username = $_POST['username'];
            $password = $_POST['password'];
            login($conn,$username,$password);
        break;

        case 'registrazione':
            $username = $_POST['username'];
            $password = $_POST['password'];
            $id = $_POST['id'];
            registrazione($conn,$id,$username,$password);
        break;

        case 'richiestaAppuntamento':
            $id = $_POST['id'];
            $note = $_POST['note'];
            richiesta($conn,$id,$note);
        break;

        case 'caricaRichieste':
            $id = $_POST['id'];
            $data = $_POST['data'];
            $ora = $_POST['ora'];
            caricaRichieste($conn,$id);
        break;

        case 'messaggio':
            $id = $_POST['id'];
            $note = $_POST['note'];
            messaggio($conn,$id,$note);
        break;

        case 'salvaAppuntamento':
            $id = $_POST['id'];
            $data = $_POST['dataAppuntamento'];
            $dataMessaggio = $_POST['dataMessaggio'];
            salvaAppuntamento($conn,$id,$data, $dataMessaggio);
        break;
    }

    function salvaAppuntamento($conn,$id,$data, $dataMessaggio){
        $query = "INSERT INTO appuntamenti VALUES(?,?)";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $id);
        $stmSql ->bindParam(2, $data);
        $result = $stmSql ->execute();
        $risposta = array();
        if($result){
            $query = "UPDATE richiesteappuntamenti SET Letto = 1 WHERE AnaID = ? AND DataOraInvio = ?";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $id);
            $stmSql ->bindParam(2, $dataMessaggio);
            $result = $stmSql ->execute();
            if($result){
                $risposta['error'] = false;
                $risposta['message'] = "appuntamento registrato con successo!";
            }else{
                $risposta['error'] = true;
                $risposta['message'] = "qualcosa non va";
            }
        }else{
            $risposta['error'] = true;
            $risposta['message'] = "qualcosa non va";
        }
        echo json_encode($risposta);
    }

    function messaggio($conn,$id,$note){
        $query = "SELECT CASE 
        WHEN TIMESTAMPDIFF(SECOND,  (SELECT DataOraInvio FROM messaggi WHERE AnaID = ? AND Richiesta = 0 ORDER BY DataOraInvio DESC LIMIT 1),
                                    (SELECT DataOraInvio FROM messaggi WHERE AnaID = ? AND Richiesta = 1 ORDER BY DataOraInvio DESC LIMIT 1)) > 0 
        THEN 1 
        WHEN NOT EXISTS (SELECT * FROM messaggi WHERE AnaID = ?) THEN 1
        ELSE 0
        END
        FROM anagrafica LIMIT 1";

        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $id);
        $stmSql ->bindParam(2, $id);
        $stmSql ->bindParam(3, $id);
        $result = $stmSql ->execute();
        $row = $stmSql ->fetch();
        if($row[0] == 1){
            $query = "INSERT INTO messaggi VALUES(?,NOW(),0,?)";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $id);
            $stmSql ->bindParam(2, $note);
            $result = $stmSql ->execute();
            $risposta = array();
            if($result){
                $risposta['error'] = false;
                $risposta['message'] = "Richiesta mandata con successo!";
            }else{
                $risposta['error'] = true;
                $risposta['message'] = "qualcosa non va";
            }
        }else{
            $risposta['error'] = true;
            $risposta['message'] = "alert";
        }
        echo json_encode($risposta);
    }

    function caricaRichieste($conn,$id){
        $query = "SELECT DataOraInvio, DataOra1, DataOra2, DataOra3, Note FROM richiesteappuntamenti WHERE AnaID = ? AND Richiesta = 1 AND letto = 0 ORDER BY DataOraInvio";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $id);
        $result = $stmSql ->execute();
        $risposta = array();
        $temp = $stmSql->fetch();
        if(empty($temp)){
            $risposta['error'] = true;
            $risposta['message'] = "nessuna risposta trovata";
        }else{
            $risposta['error'] = false;
            $risposta['dataMessaggio'] = $temp['DataOraInvio'];
            $risposta['data1'] = $temp['DataOra1'];
            $risposta['data2'] = $temp['DataOra2'];
            $risposta['data3'] = $temp['DataOra3'];
            $risposta['note'] = $temp['Note'];
        }
        echo json_encode($risposta);
    }

    function richiesta($conn,$id,$note){
        $query = "SELECT CASE 
        WHEN TIMESTAMPDIFF(SECOND,  (SELECT DataOraInvio FROM richiesteappuntamenti WHERE AnaID = ? AND Richiesta = 0 ORDER BY DataOraInvio DESC LIMIT 1),
                                    (SELECT DataOraInvio FROM richiesteappuntamenti WHERE AnaID = ? AND Richiesta = 1 ORDER BY DataOraInvio DESC LIMIT 1)) > 0 
        THEN 1 
        WHEN NOT EXISTS (SELECT * FROM richiesteappuntamenti WHERE AnaID = ?) THEN 1
        ELSE 0
        END
        FROM anagrafica LIMIT 1";

        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $id);
        $stmSql ->bindParam(2, $id);
        $stmSql ->bindParam(3, $id);
        $result = $stmSql ->execute();
        $row = $stmSql ->fetch();
        if($row[0] == 1){
            $query = "INSERT INTO richiesteappuntamenti VALUES(?,NOW(),0,NULL,NULL,NULL,?,0)";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $id);
            $stmSql ->bindParam(2, $note);
            $result = $stmSql ->execute();
            $risposta = array();
            if($result){
                $risposta['error'] = false;
                $risposta['message'] = "Richiesta mandata con successo!";
            }else{
                $risposta['error'] = true;
                $risposta['message'] = "qualcosa non va";
            }
        }else{
            $risposta['error'] = true;
            $risposta['message'] = "alert";
        }
        echo json_encode($risposta);
    }

    function registrazione($conn,$id,$username,$password){
        $query = "UPDATE utenti SET User = ?, Password = ? WHERE AnaID = ?";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $username);
        $stmSql ->bindParam(2, $password);
        $stmSql ->bindParam(3, $id);
        $result = $stmSql ->execute();
        $risposta = array();
        if($result){
            $risposta['error'] = false;
            $risposta['message'] = "Ti sei registrato! ora effettua il login.";
        }else{
            $risposta['error'] = true;
            $risposta['message'] = "qualcosa non va";
        }
        echo json_encode($risposta);
    }

    function caricaHome($conn,$id){
        $query = "SELECT DATE(DataOra), TIME(DataOra) FROM appuntamenti WHERE AnaID = ? AND DataOra > NOW()";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $id);
        $result = $stmSql ->execute();
        $row = $stmSql->fetch();
        $risposta = array();
        if(empty($row) || $row[0]==null){
            $risposta['error'] = true; 
            $risposta['message'] = 'Non hai ancora nessun appuntamento fissato.';
        }else{
            $risposta['error'] = false; 
            $risposta['dataAppuntamento'] = $row[0];
            $risposta['oraAppuntamento'] = $row[1];
        }
        echo json_encode($risposta);
    }

    function login($conn,$username,$password){
        $query = "SELECT AnaID FROM utenti WHERE User = ? AND Password = ?";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $username);
        $stmSql ->bindParam(2, $password);
        $result = $stmSql ->execute();
        $row = $stmSql->fetch();
        $risposta = array();
        if($row[0]==null){
            $risposta['error'] = true;
            $risposta['message'] = 'Nome utente e/o password non corretti';
        }else{
            $risposta['error'] = false;
            $risposta['id'] = $row[0];
        }
        echo json_encode($risposta);
    }
?>