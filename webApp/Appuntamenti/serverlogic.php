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
            case 'nuoveRichiesteMessaggi' : 
                nuoveRichiesteMessaggi($conn);
                break;
            case 'mostraDettagliAppuntamento' :
                $idPersona = $_POST['id'];
                $data = $_POST['data'];
                mostraDettagliAppuntamento($conn,$idPersona,$data);
                break;
            case 'inserisciNuovoAppuntamento':
                $idPersona = $_POST['id'];
                $dataOra = $_POST['dataOra'];
                $descrizione = $_POST['descrizione'];
                inserisciNuovoAppuntamento($conn,$idPersona,$dataOra,$descrizione);
                break;
            case 'caricaAppuntamenti':
                $data = $_POST['data'];
                caricaAppuntamenti($conn,$data);
                break;
            case 'cancellaAppuntamento':
                $idPersona = $_POST['id'];
                $dataOra = $_POST['data'];
                cancellaAppuntamento($conn,$idPersona,$dataOra);
                break;
            case 'visualizzaRichiesteAppuntamento':
                visualizzaRichiesteAppuntamento($conn);
                break;
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
            case 'visualizzaMessaggi':
                visualizzaMessaggi($conn);
                break;
            case 'inviaRisposta':
                $idPersona = $_POST['id'];
                $dataOra = $_POST['dataOra'];
                $dataOra1 = $_POST['dataOra1'];
                $dataOra2 = $_POST['dataOra2'];
                $dataOra3 = $_POST['dataOra3'];
                $descrizione = $_POST['descrizione'];
                inviaRisposta($conn,$idPersona,$dataOra,$dataOra1,$dataOra2,$dataOra3,$descrizione);
                break;
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------
                //Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------//Aggiunto da tommy -----------------------------------------------------------------------------------------------------------------

            case 'inviaRispostaMessaggio':
                $idPersona = $_POST['id'];
                $dataOra = $_POST['dataOra'];
                $descrizione = $_POST['descrizione'];
                inviaRispostaMessaggio($conn,$idPersona,$dataOra,$descrizione);
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
        $query="SELECT ID, CONCAT(Nome,' ',Cognome) AS NomeCognome FROM anagrafica";
        $stmSql = $conn->prepare($query);
        $result = $stmSql ->execute();
        $ret= array();

        while($row = $stmSql->fetch()){
            array_push ($ret, $row);
        }
        
    echo json_encode(local_encode($ret)); 

    }

    function nuoveRichiesteMessaggi($conn){
        $query="SELECT count(*) FROM richiesteappuntamenti WHERE Richiesta = 0 AND Letto = 0";
        $stmSql = $conn->prepare($query);
        $result = $stmSql ->execute();
        
        $ret = $stmSql ->fetch()[0];

        $query="SELECT count(*) FROM messaggi WHERE Richiesta = 0 AND Letto = 0";
        $stmSql = $conn->prepare($query);
        $result = $stmSql ->execute();
        
        $ret += $stmSql ->fetch()[0];

        echo $ret;
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
            $row['Descrizione']="Nessun intervento passato.";

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

    function inserisciNuovoAppuntamento($conn,$idPersona,$dataOra,$descrizione){  //inserisce un nuovo appuntamento con il tasto nuovo appuntamento
            $query = "INSERT INTO appuntamenti VALUES(?,?,?)";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $idPersona);
            $stmSql ->bindParam(2, $dataOra);
            $stmSql ->bindParam(3, $descrizione);
            $result = $stmSql ->execute();

            echo $result;
    }

    function caricaAppuntamenti($conn,$data){   //FUNZIONA CHE CARICA GLI APPUNTAMENTI DI UN GIORNO

        $query="SELECT anagrafica.ID,date(appuntamenti.DataOra),time(appuntamenti.DataOra) AS Ora,anagrafica.Nome,anagrafica.Cognome FROM appuntamenti,anagrafica WHERE appuntamenti.AnaID=anagrafica.ID AND date(DataOra)=? ORDER BY hour(DataOra)";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $data);
        $result = $stmSql->execute();

        $ret=array();
          
        while ($row = $stmSql->fetch()){
            array_push ($ret, $row);
        }
            
        echo json_encode(local_encode($ret)); 
    }

    function cancellaAppuntamento($conn,$idPersona,$dataOra){  
        $query = "DELETE FROM appuntamenti WHERE AnaID=? AND DataOra=?";
        $stmSql = $conn->prepare($query);
        $stmSql ->bindParam(1, $idPersona);
        $stmSql ->bindParam(2, $dataOra);
        $result = $stmSql ->execute();

            echo $result;
    }

    function visualizzaRichiesteAppuntamento($conn){
        $query = "SELECT richiesteappuntamenti.AnaID,richiesteappuntamenti.DataOraInvio,richiesteappuntamenti.Note,anagrafica.Nome,anagrafica.Cognome FROM richiesteappuntamenti,anagrafica WHERE richiesteappuntamenti.AnaID = anagrafica.ID AND Richiesta=0 AND Letto=0";

        $stmSql = $conn->prepare($query);
        $result = $stmSql ->execute();
        $ret= array();
          
        while ($row = $stmSql->fetch()){
                    array_push ($ret, $row);
            }
            
        echo json_encode(local_encode($ret)); 
    }

    function visualizzaMessaggi($conn){
        $query = "SELECT messaggi.AnaID,messaggi.DataOraInvio,messaggi.Note,anagrafica.Nome,anagrafica.Cognome FROM messaggi,anagrafica WHERE messaggi.AnaID = anagrafica.ID AND Richiesta=0 AND Letto=0";

        $stmSql = $conn->prepare($query);
        $result = $stmSql ->execute();
        $ret= array();
          
        while ($row = $stmSql->fetch()){
                    array_push ($ret, $row);
            }
            
        echo json_encode(local_encode($ret)); 
    }

    function inviaRisposta($conn,$idPersona,$dataOra,$dataOra1,$dataOra2,$dataOra3,$descrizione){
            $query = "UPDATE richiesteappuntamenti SET Letto=1 WHERE AnaID=? AND DataOraInvio=?";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $idPersona);
            $stmSql ->bindParam(2, $dataOra);
            $result = $stmSql ->execute();

            if(!$result){
                echo 0;
            }

            if($dataOra2 == "false"){
                $dataOra2 = NULL;
            }
            if($dataOra3 == "false"){
                $dataOra3 = NULL;
            }

            $query = "INSERT INTO richiesteappuntamenti VALUES(?,now(),1,?,?,?,?,0)";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $idPersona);
            $stmSql ->bindParam(2, $dataOra1);
            $stmSql ->bindParam(3, $dataOra2);
            $stmSql ->bindParam(4, $dataOra3);
            $stmSql ->bindParam(5, $descrizione);


            $result = $stmSql ->execute();

            echo $result;
    }

    function inviaRispostaMessaggio($conn,$idPersona,$dataOra,$descrizione){
            $query = "UPDATE messaggi SET Letto=1 WHERE AnaID=? AND DataOraInvio=?";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $idPersona);
            $stmSql ->bindParam(2, $dataOra);
            $result = $stmSql ->execute();

            if(!$result){
                echo 0;
            }

            $query = "INSERT INTO messaggi VALUES(?,now(),1,?,0)";
            $stmSql = $conn->prepare($query);
            $stmSql ->bindParam(1, $idPersona);
            $stmSql ->bindParam(2, $descrizione);

            $result = $stmSql ->execute();

            echo $result;
    }

/*    function eliminaAppuntamento($conn,$idPersona){
        $query="DELETE FROM appuntamenti WHERE"



    }
*/
?>