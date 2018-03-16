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
				/*case 'caricaAnagrafica' :
					caricaAnagrafica($conn);
					break;*/
				case 'caricaUltimoIntervento' :
					$idPersona = $_POST['id'];
					caricaUltimoIntervento($conn,$id);
					break;
				case 'inserisciPagamentoDesc' :
					$idPersona = $_POST['id'];
					$importo = $_POST['importo'];
					$pagato = $_POST['pagato'];
					$descrizione = $_POST['descrizione'];
					inserisciPagamentoDesc($conn,$idPersona,$importo,$pagato,$descrizione,$data);
					break;
				case 'inserisciNuovoPaziente' :
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
					$telefono2 = $_POST['pagato'];
					$motivo = $_POST['motivo'];
					$anamnesi = $_POST['anamnesi'];
					$codFisc = $_POST['codFisc'];
					inserisciNuovoPaziente($conn,$idPersona,$nome,$cognome,$datanascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc);
					break;
				case 'visualizzaStoricoInterventi' :
					$idPersona = $_POST['id'];
					visualizzaStoricoInterventi($conn,$idPersona);
					break;
				case 'visualizzaContabilitaPersona' :
					$idPersona = $_POST['id'];
					visualizzaContabilitaPersona($conn,$idPersona);
					break;
				}
			}
	
		$conn=null;

		function cercaPersona($conn,$persona){   //Il cerca nella scheda anagrafica

			$persona = strtoupper($persona);
			$persona = $persona."%";
			$query="SELECT ID,Nome,Cognome,DataNascita,LuogoNascita,MedicoProvenienza,Residenza,Indirizzo,CAP,Telefono1,Telefono2,Motivo,Anamnesi,CodFisc FROM anagrafica where upper(Nome) Like ? or upper(Cognome) Like ? order by Cognome,Nome LIMIT 0,100";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $persona);
			$stmSql ->bindParam(2, $persona);
			$result = $stmSql ->execute();
			$ret= array();

			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret)); //tommy prendi questo e costruisci la tabella (ho modificato il js ed ho aggiunto una funzione che mi passava il nomePersona con ajax)

		}


		function cercaContabilita($conn,$persona){   //Il cerca nella scheda contabilita

			$persona = strtoupper($persona);   
			$persona = "%".$persona."%";             //ricerca se c e persona dentro alla stringa che scriviamo
			$query="select AnaID,Nome,Cognome,Data,Pagamento,Pagato from anagrafica,pagamenti where anagrafica.ID = pagamenti.AnaID AND upper(Nome) Like ? or upper(Cognome) Like ? order by Cognome,Nome,Data";
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

		/*function caricaAnagrafica($conn){   //funzione che viene richiamata appena viene startata la pagina
			
			$query="SELECT ID,Nome,Cognome,DataNascita,LuogoNascita,MedicoProvenienza,Residenza,Indirizzo,CAP,Telefono1,Telefono2,Motivo,Anamnesi,CodFisc FROM anagrafica ORDER BY
			Cognome,Nome LIMIT 0,100";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();
			$ret= array();

			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret));

		}*/

		function local_encode ($var){
			if (is_string ($var))
				return utf8_encode ($var);
			if (is_array ($var))
				return array_map ('local_encode', $var);
			return $var;
		}

		function caricaUltimoIntervento($conn,$idPersona){   //carica l ultimo intervento da mettere nella casella a destra per far vedere cosa è stato fatto la volta precedente

			$query="select Data,Descrizione from interventi where AnaID = ? order by Data DESC";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret= array();

			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret));

		}


		function inserisciPagamentoDesc($conn,$idPersona,$data,$importo,$pagato,$descrizione){   //inserisce il pagamento nel database dopo che la dott. ha finito e aggiunge il costo delle seduto con descrizione

			$query="insert into pagamenti values(?,?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $importo);
			$stmSql ->bindParam(4, $descrizione);
			$stmSql ->bindParam(5, $pagato);
			
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da echo vero

		}

		function inserisciNuovoPaziente($conn,$idPersona,$nome,$cognome,$datanascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc){   //inserisce un nuovo utente nel db

			$query="insert into anagrafica values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $nome);
			$stmSql ->bindParam(3, $cognome);
			$stmSql ->bindParam(4, $datanascita);
			$stmSql ->bindParam(5, $luogoNascita);
			$stmSql ->bindParam(6, $medicoProv);
			$stmSql ->bindParam(7, $residenza);
			$stmSql ->bindParam(8, $indirizzo);
			$stmSql ->bindParam(9, $cap);
			$stmSql ->bindParam(10, $telefono1);
			$stmSql ->bindParam(11, $telefono2);
			$stmSql ->bindParam(12, $motivo);
			$stmSql ->bindParam(13, $anamnesi);
			$stmSql ->bindParam(14, $codFisc);
			
			$result = $stmSql ->execute();
			
		echo $result;			//faccio restituire solo vero o falso se riesce eseguire la query da echo vero

		}

		function visualizzaStoricoInterventi($conn,$idPersona){   //pulsante che chiede tutti gli ultimi interventi

			$query="select AnaId,Data,Importo,Descrizione,Pagato from interventi where AnaID = ? order by data DESC";
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

			$query="select AnaId,Data,Importo,Descrizione,Pagato from interventi where AnaID = ? order by data DESC";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret= array();

			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret));

		}

		

?>

