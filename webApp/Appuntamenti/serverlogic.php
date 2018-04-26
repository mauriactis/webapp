<?php
	 
     $user = "root"; $pwd = ""; $risposta = ""; $conn = null;
     try{
         // connessione
         $conn = new PDO("mysql:host=localhost;dbname=provadb", $user, $pwd);
         // abilita gestione errori tramite try … catch  (Exception)
         $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     } catch(PDOException $ex){
        $risposta = "Errore connessione: ".$ex->getMessage();
 }

    if(isset($_POST['azione']) && !empty($_POST['azione'])) {   //variabili tutte con minuscole con upper su prima lettere della seconda parola
        $azione = $_POST['azione'];
        switch($azione) {
            case 'caricaNomiPersone' : 
                caricaNomiPersone($conn);
            break;
            case 'mostraDettagliAppuntamento' :
                $idPersona = $_POST['id'];
                $data = $_POST['data'];
                mostraDettagliAppuntamento($conn,$idPersona,$data);
            break;
        }
    }

    $conn=null;

    function local_encode ($var){
        if (is_string ($var))
            return utf8_encode ($var);
        if (is_array ($var))
            return array_map ('local_encode', $var);
        return $var;
    }

    function caricaNomiPersone($conn){
        $query="SELECT anagrafica.ID, CONCAT(Nome,' ',Cognome) AS NomeCognome FROM anagrafica";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $persona);
        $stmSql ->bindParam(2, $persona);
        $result = $stmSql ->execute();
        $ret= array();

        while($row = $stmSql->fetch()){
            array_push ($ret, $row);
        }
        
    echo json_encode(local_encode($ret)); //tommy prendi questo e costruisci la tabella (ho modificato il js ed ho aggiunto una funzione che mi passava il nomePersona con ajax)

    }



// #1 funzione che da l'ultimo appuntamento quando si clicca sull'occhietto di un appuntamento gia fissato
// #1 funzione che da l'ultimo appuntamento quando si clicca sull'occhietto di un appuntamento gia fissato
// #1 funzione che da l'ultimo appuntamento quando si clicca sull'occhietto di un appuntamento gia fissato
// #1 funzione che da l'ultimo appuntamento quando si clicca sull'occhietto di un appuntamento gia fissato

    function mostraDettagliAppuntamento($conn,$idPersona,$data){
        $query="SELECT Descrizione FROM interventi WHERE AnaID=? ORDER BY Data DESC";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $idPersona);
        $result = $stmSql ->execute();
        $row=$stmSql->fetch();
        if($row == NULL || empty($row))     // DA TESTARE SE ($row == NULL  FA QUALCOSA)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            $row['Descrizione']="Nessun intervento passato";

        $query="SELECT Note FROM appuntamenti WHERE AnaID=? AND DataOra=?";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $idPersona);
        $stmSql ->bindParam(2, $data);
        $result = $stmSql ->execute();
        $row2=$stmSql->fetch();
        $ret= array();

        if($row2 == NULL || empty($row2))
            $row2['Note']="Nessuna nota";

        array_push ($ret, $row);
        array_push ($ret, $row2);     
        
        echo json_encode(local_encode($ret)); 
        
    }

    















?>











/* #1  funzione che restituisce l ultimo appuntamwento di interventi


#2