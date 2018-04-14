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
				case 'cercaPersona' : 
					$persona = $_POST['nomePersona'];
					cercaPersona($conn,$persona);
					break;
				case 'cercaContabilita' :
					$persona = $_POST['nomePersona'];
					cercaContabilita($conn,$persona);
					break;
				case 'caricaUltimoIntervento' :
					$idPersona = $_POST['id'];
					$data = $_POST['data'];
					caricaUltimoIntervento($conn,$idPersona,$data);
					break;
				case 'caricaUltimoInterventoAnagrafica' :
					$idPersona = $_POST['id'];
					caricaUltimoIntervento($conn,$idPersona);
					break;
				case 'inserisciPagamentoDesc' :
					$idPersona = $_POST['id'];
					$importo = $_POST['importo'];
					$pagato = $_POST['pagato'];
					$descrizione = $_POST['descrizione'];
					$data = $_POST['data'];
					inserisciPagamentoDesc($conn,$idPersona,$data,$importo,$pagato,$descrizione);
					break;
				case 'inserisciNuovoPaziente' :
					$nome = $_POST['nome'];
					$cognome = $_POST['cognome'];
					$dataNascita = $_POST['dataNascita'];
					$luogoNascita = $_POST['luogoNascita'];
					$medicoProv = $_POST['medicoProv'];
					$residenza = $_POST['residenza'];
					$indirizzo = $_POST['indirizzo'];
					$cap = $_POST['cap'];
					$telefono1 = $_POST['telefono1'];
					$telefono2 = $_POST['telefono2'];
					$motivo = $_POST['motivo'];
					$anamnesi = $_POST['anamnesi'];
					$codFisc = $_POST['codFisc'];
					inserisciNuovoPaziente($conn,$nome,$cognome,$dataNascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc);
					break;
				case 'visualizzaStoricoInterventi' :
					$idPersona = $_POST['id'];
					visualizzaStoricoInterventi($conn,$idPersona);
					break;
				case 'visualizzaContabilitaPersona' :
					$idPersona = $_POST['id'];
					visualizzaContabilitaPersona($conn,$idPersona);
					break;
				case 'aggiornaPagamento' :
					$idPersona = $_POST['id'];
					$data = $_POST['dataIntervento'];
					$importo = $_POST['importo'];
					aggiornaPagamento($conn,$idPersona,$data,$importo);
					break;
				case 'pagaInterventoPassato' :
					$idPersona = $_POST['id'];
					$data = $_POST['dataIntervento'];
					pagaInterventoPassato($conn,$idPersona,$dataIntervento);
					break;
				case 'pagaTuttiInterventiPassati' :
					$idPersona = $_POST['id'];
					pagaTuttiInterventiPassati($conn,$idPersona);
					break;
				case 'aggiornaAnagraficaRequest' :
					$idPersona = $_POST['id'];
					aggiornaAnagraficaRequest($conn,$idPersona);
					break;
				case 'aggiornaAnagraficaUpdate':
					$idPersona = $_POST['id'];
					$nome = $_POST['nome'];
					$cognome = $_POST['cognome'];
					$dataNascita = $_POST['dataNascita'];
					$luogoNascita = $_POST['luogoNascita'];
					$medicoProv = $_POST['medicoProv'];
					$residenza = $_POST['residenza'];
					$indirizzo = $_POST['indirizzo'];
					$cap = $_POST['cap'];
					$telefono1 = $_POST['telefono1'];
					$telefono2 = $_POST['telefono2'];
					$motivo = $_POST['motivo'];
					$anamnesi = $_POST['anamnesi'];
					$codFisc = $_POST['codFisc'];
					aggiornaAnagraficaUpdate($conn,$idPersona,$nome,$cognome,$dataNascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc);
					break;
				case 'inserisciCodApp' :
					$user = $_POST['codice'];
					$idPersona = $_POST['id'];
					inserisciCodApp($conn,$user,$idPersona);
					break;
				case 'visualizzaDocumenti' :
					$idPersona = $_POST['id'];
					visualizzaDocumenti($conn,$idPersona);
					break;
				case 'visualizzaAnamnesi' :
					$idPersona = $_POST['id'];
					visualizzaAnamnesi($conn,$idPersona);
					break;
				case 'caricaComuni' :
					$ricerca = $_POST['ricerca'];
					caricaComuni($conn,$ricerca);
					break;
				case 'caricaMotivi' :
					caricaMotivi($conn);
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

		function cercaPersona($conn,$persona){   //La funzione che permette di usare la barra di ricerca con la scheda anagrafica attiva

			$persona = strtoupper($persona);
			$persona = "%".$persona."%";
			$query="SELECT anagrafica.ID,Nome,Cognome,DataNascita,LuogoNascita,MedicoProvenienza,comuni.Comune AS Residenza,Indirizzo,CAP,Telefono1,Telefono2,motivi.Descrizione AS Motivo, Anamnesi, CodFisc FROM anagrafica LEFT JOIN motivi ON (anagrafica.Motivo = motivi.ID) JOIN comuni ON(anagrafica.Residenza = comuni.ID) WHERE upper(Cognome) LIKE ? OR upper(Nome) LIKE ? ORDER BY Cognome,Nome DESC LIMIT 0,100 ";
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

		function cercaContabilita($conn,$persona){  //La funzione che permette di usare la barra di ricerca con la scheda contabilita attiva

			$persona = strtoupper($persona);   
			$persona = "%".$persona."%";             //ricerca se c e persona dentro alla stringa che scriviamo
			$query="SELECT AnaID,Nome,Cognome,Data,Pagamento,Pagato FROM contabilita WHERE upper(Cognome) LIKE ? OR upper(Nome) LIKE ? ORDER BY Cognome,Nome,Data";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $persona);
			$stmSql ->bindParam(2, $persona);
			$result = $stmSql ->execute();
			$ret= array();

			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret)); 

		}

		function caricaUltimoIntervento($conn,$idPersona,$data){   //carica i dati dell'ultimo intervento e per contabilità

			$query="SELECT anagrafica.Nome,anagrafica.Cognome,interventi.Descrizione,interventi.Data,pagamenti.Pagamento,pagamenti.Pagato FROM interventi,anagrafica,pagamenti WHERE anagrafica.ID=interventi.AnaID AND interventi.AnaID=pagamenti.AnaID AND interventi.Data=pagamenti.Data AND interventi.AnaID=? AND interventi.Data=? ORDER BY Data DESC";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();

			if($ret == NULL){
				echo 1;
			}else{
				echo json_encode(local_encode($ret)); 
			}
		}

		function caricaUltimoInterventoAnagrafica($conn,$idPersona){   //carica i dati dell'ultimo intervento per anagrafica

			$query="SELECT Descrizione FROM interventi WHERE AnaID=? ORDER BY Data DESC";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();

			if($ret == NULL){
				echo 1;
			}else{
				echo json_encode(local_encode($ret)); 
			}
		}


		function inserisciPagamentoDesc($conn,$idPersona,$data,$importo,$pagato,$descrizione){   //inserisce il pagamento nel database dopo che la dott. ha finito e aggiunge il costo delle seduto con descrizione
			$query = "INSERT INTO interventi VALUES(?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $descrizione);

			$result = $stmSql ->execute();


			$query="INSERT INTO pagamenti VALUES(?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $importo);
			$stmSql ->bindParam(4, $pagato);
			
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da echo vero

		}

		function inserisciNuovoPaziente($conn,$nome,$cognome,$dataNascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc){   //inserisce un nuovo utente nel db

			$query="INSERT INTO anagrafica VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nome);
			$stmSql ->bindParam(2, $cognome);
			$stmSql ->bindParam(3, $dataNascita);
			$stmSql ->bindParam(4, $luogoNascita);
			$stmSql ->bindParam(5, $medicoProv);
			$stmSql ->bindParam(6, $residenza);
			$stmSql ->bindParam(7, $indirizzo);
			$stmSql ->bindParam(8, $cap);
			$stmSql ->bindParam(9, $telefono1);
			$stmSql ->bindParam(10, $telefono2);
			$stmSql ->bindParam(11, $motivo);
			$stmSql ->bindParam(12, $anamnesi);
			$stmSql ->bindParam(13, strtoupper($codFisc));
			
			$result = $stmSql ->execute();
			
		echo $result;			//faccio restituire solo vero o falso se riesce eseguire la query da echo vero

		}

		function visualizzaStoricoInterventi($conn,$idPersona){   //pulsante che chiede tutti gli ultimi interventi

			$query="SELECT AnaID,Data,Descrizione FROM interventi WHERE AnaID = ? ORDER BY data DESC";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret= array();

			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret));

		}

		function visualizzaContabilitaPersona($conn,$idPersona){  //restituisce i record riguardati la contabilita del paziente dal menu a scorrimento a destra

			$query="SELECT * FROM contabilita WHERE AnaID=?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret= array();

			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret));

		}

		function aggiornaPagamento($conn,$idPersona,$data,$importo){   //bottone paga che permette di modificare l'importo di un intervento
			$query="UPDATE pagamenti SET Pagamento= ? WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $importo);
			$stmSql ->bindParam(2, $idPersona);
			$stmSql ->bindParam(3, $data);
		
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da come risultato echo = true
		}		
		
		function pagaInterventoPassato($conn,$idPersona,$dataIntervento){  //bottone 'paga' nella scheda di contabilità che permette di pagare un intervento passato
			$query="SELECT Pagamento FROM pagamenti WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $dataIntervento);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();

		echo $ret[0];
		}
		
		function pagaTuttiInterventiPassati($conn,$idPersona){  // funzione che permette di sommar el'importo di tutte le sessioni passate per pagare tutte in una sola volta
			$query="SELECT SUM(Pagamento) FROM pagamenti WHERE AnaID = ? AND Pagato=0";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();
					
		echo $ret[0]; //restituisco la prima cella del array perche tanto restituisce solo un dato
		}

		function aggiornaAnagraficaRequest($conn,$idPersona){   //funzione che restituisce tutti i dati di una persona per metterli nel pop-up che permette di modificare i dati del paziente
			
			$query="SELECT Nome,Cognome,DataNascita,LuogoNascita,MedicoProvenienza,Residenza,Indirizzo,CAP,Telefono1,Telefono2,Motivo,Anamnesi,CodFisc FROM anagrafica WHERE ID = ? ";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret= array();

			while($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}

		echo json_encode(local_encode($ret)); 
		}

		function aggiornaAnagraficaUpdate($conn,$idPersona,$nome,$cognome,$dataNascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc){   //funzione che esegue l update dopo che e stato cliccato il pulsante aggiorna campi nel pop-up del aggirona campi del paziente

			$query="UPDATE anagrafica SET Nome = ?, Cognome = ?, DataNascita = ?, LuogoNascita = ?, MedicoProvenienza = ?, Residenza = ?, Indirizzo = ?, CAP = ?, Telefono1 = ?, Telefono2 = ?, Motivo = ?, Anamnesi = ?, CodFisc = ?";
			
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nome);
			$stmSql ->bindParam(2, $cognome);
			$stmSql ->bindParam(3, $datanascita);
			$stmSql ->bindParam(4, $luogoNascita);
			$stmSql ->bindParam(5, $medicoProv);
			$stmSql ->bindParam(6, $residenza);
			$stmSql ->bindParam(7, $indirizzo);
			$stmSql ->bindParam(8, $cap);
			$stmSql ->bindParam(9, $telefono1);
			$stmSql ->bindParam(10, $telefono2);
			$stmSql ->bindParam(11, $motivo);
			$stmSql ->bindParam(12, $anamnesi);
			$stmSql ->bindParam(13, strtoupper($codFisc));
			
			$result = $stmSql ->execute();
			
		echo $result;			//faccio restituire solo vero o falso se riesce eseguire la query da echo vero

		}

		function inserisciCodApp($conn,$user,$idPersona){ //inserisce il codice richiamando la funzione sotto per fare controlli se e presente/modificato/null
			$risposta = visualizzaCodApp($conn,$idPersona);
			if($risposta==-1){
				$query="INSERT INTO utenti VALUES(?,?,'')";
				$stmSql = $conn->prepare($query);
				$stmSql ->bindParam(1, $idPersona);
				$stmSql ->bindParam(2, $user);

				$result = $stmSql ->execute();
			
				if($result){
					echo 0;
				}else{
					echo-1;
				}

			}elseif($risposta== -2){
				echo -2;
			}else{
				echo $risposta;
			}
		}

		function visualizzaCodApp($conn,$idPersona){   //funzione che controlla se un pazienete ha gia un codice generato o se ha gia inserito la propria mail al posto di questo codice

			$query="SELECT user FROM utenti WHERE AnaID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);

			$result = $stmSql ->execute();

			$row = $stmSql->fetch();
			
			if(is_numeric($row[0])){
				return $row[0];
			}elseif(empty($row)){
				return -1;
			}else{
				return -2;
			}		
		}

		function visualizzaDocumenti($conn,$idPersona){  //funzione che permette di visualizzare tutti i documenti di una data persona nella schermata anagrafica

			$query="SELECT AnaID,Data,Descrizione,Allegato FROM documenti WHERE AnaID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();

			$ret= array();

			while($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}

		echo json_encode(local_encode($ret)); 
		}

		function visualizzaAnamnesi($conn,$idPersona){ //funzione che restituisce l'anamnesi

			$query="SELECT Anamnesi FROM anagrafica WHERE ID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			
			$row = $stmSql->fetch();
			if(empty($row)){
				$row['Anamnesi']=0;
			}

			echo local_encode($row['Anamnesi']);
		}

		function caricaComuni($conn,$ricerca){  //restituisce l elenco dei comuni
			$i=0;
			$ricerca = $ricerca."%";
			$query="SELECT * FROM comuni WHERE Comune LIKE ? ORDER BY Comune";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $ricerca);
			$result = $stmSql ->execute();

			$ret= array();

			while($i<10 && $row = $stmSql->fetch()){
					$i=$i+1;
					array_push ($ret, $row);
			}

		echo json_encode(local_encode($ret)); 
		}


		function caricaMotivi($conn){  //restituisce l elenco dei motivi

			$query="SELECT * FROM motivi";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();

			$ret= array();

			while($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}

		echo json_encode(local_encode($ret)); 
		}



?>
