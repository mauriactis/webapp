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
				//-----sidenav a destra-----//
				case 'caricaUltimoIntervento' :
					$idPersona = $_POST['id'];
					$data = $_POST['data'];
					caricaUltimoIntervento($conn,$idPersona,$data);
					break;
				case 'caricaUltimoInterventoAnagrafica' :
					$idPersona = $_POST['id'];
					caricaUltimoInterventoAnagrafica($conn,$idPersona);
					break;
				//-----sidenav a destra-----//
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
					$dataNascitaFP = $_POST['dataNascitaFP'];
					$luogoNascitaFP = $_POST['luogoNascitaFP'];
					$medicoProv = $_POST['medicoProv'];
					$residenza = $_POST['residenza'];
					$residenzaFP = $_POST['residenzaFP'];
					$indirizzo = $_POST['indirizzo'];
					$cap = $_POST['cap'];
					$telefono1 = $_POST['telefono1'];
					$telefono2 = $_POST['telefono2'];
					$motivo = $_POST['motivo'];
					$anamnesi = $_POST['anamnesi'];
					$codFisc = $_POST['codFisc'];
					$foglioPrivacy = $_POST['foglioPrivacy'];
					inserisciNuovoPaziente($conn,$nome,$cognome,$dataNascita,$luogoNascita,$dataNascitaFP,$luogoNascitaFP,$medicoProv,$residenza,$residenzaFP,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc,$foglioPrivacy);
					break;
				case 'visualizzaStoricoInterventi' :
					$idPersona = $_POST['id'];
					visualizzaStoricoInterventi($conn,$idPersona);
					break;
				case 'visualizzaContabilitaPersona' :
					$idPersona = $_POST['id'];
					visualizzaContabilitaPersona($conn,$idPersona);
					break;
				//-----pagamento-----//
				case 'aggiornaPagamento' :
					$idPersona = $_POST['id'];
					$data = $_POST['data'];
					$importo = $_POST['importo'];
					aggiornaPagamento($conn,$idPersona,$data,$importo);
					break;
				case 'selezionaImportoInterventoPassato' :
					$idPersona = $_POST['id'];
					$data = $_POST['dataIntervento'];
					selezionaImportoInterventoPassato($conn,$idPersona,$data);
					break;
				case 'selezionaImportoTuttiInterventiPassati' :
					$idPersona = $_POST['id'];
					$data = $_POST['data'];
					selezionaImportoTuttiInterventiPassati($conn,$idPersona,$data);
					break;
				case 'controlloPiuPagamenti' :
					$idPersona = $_POST['id'];
					controlloPiuPagamenti($conn,$idPersona);
					break;
				case 'aggiornaPagatoFatturaSingolo' :
					$idPersona = $_POST['id'];
					$data = $_POST['dataIntervento'];
					aggiornaPagatoFatturaSingolo($conn,$idPersona,$data);
				 	break;
				/*case 'aggiornaPagatoFatturaMultipla' :
					$idPersona = $_POST['id'];
				 	aggiornaPagatoFatturaMultipla($conn,$idPersona);
				 	break;*/
					//-----pagamento-----//
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
				case 'inserisciDocumento' :
					$idPersona = $_POST['id'];
					$data = $_POST['data'];
					$allegato = $_POST['allegato'];
					$descrizione = $_POST['descrizione'];
					inserisciDocumento($conn,$idPersona,$data,$allegato,$descrizione);
					break;
				case 'eliminaDocumento' :
					$idDocumento = $_POST['id'];
					eliminaDocumento($conn,$idDocumento);
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
				case 'foglioToHTML' :
					$doc = $_POST['foglioPrivacy'];
					foglioToHTML($conn,$doc);
					break;
				case 'convertToPDF' :
					$id = $_POST['id'];
					$data = $_POST['data'];
					convertToPDF($conn,$id,$data);
					break;
				case 'trovaAppuntamenti' :
					trovaAppuntamenti($conn);
					break;
				case 'dettagliPaziente' :
				$id = $_POST['id'];
					dettagliPaziente($conn,$id);
					break;
				case 'compilaFattura' :
					$id = $_POST['id'];
					$importo = $_POST['importo'];
					$descrizione = $_POST['descrizione'];
					$data = $_POST['data'];
					$dataFattura = $_POST['dataFattura'];
					$fattura = $_POST['fattura'];
					$cognomeNome = $_POST['cognomeNome'];
					$indirizzo = $_POST['indirizzo'];
					$residenza = $_POST['residenza'];
					$cap = $_POST['cap'];
					$cfisc = $_POST['cfisc'];
					$totale = $_POST['totale'];
					$bolloiva = $_POST['iva'];
					$daPagare = $_POST['daPagare'];
					$dataEmissione = $_POST['dataEmissione'];
					compilaFattura($conn, $id, $importo, $descrizione, $data, $dataFattura, $fattura, $cognomeNome, $indirizzo, $residenza, $cap, $cfisc, $totale, $bolloiva, $daPagare,$dataEmissione);
					break;
				case 'ricevutaPagamentoEsistente' :
					$id = $_POST['id'];
					$data = $_POST['data'];
					ricevutaPagamentoEsistente($conn, $id, $data);
					break;
				case 'datiFatturaSingola' : 
					$id = $_POST['id'];
					$data = $_POST['data'];
					datiFatturaSingola($conn, $id, $data);
					break;
				case 'datiFatturaMultipla' : 
					$id = $_POST['id'];
					datiFatturaMultipla($conn, $id);
					break;
				case 'stampaFatturaSingola' : 
					$id = $_POST['id'];
					$dataEmissione = $_POST['dataEmissione'];
					$cognomeNome = $_POST['cognomeNome'];
					$indirizzo = $_POST['indirizzo'];
					$residenza = $_POST['residenza'];
					$cap = $_POST['cap'];
					$cfisc = $_POST['cfisc'];
					$bolloiva = $_POST['bolloiva'];
					$importo = $_POST['importo'];
					$descrizione = $_POST['descrizione'];
					$totale = $_POST['totale'];
					$fattura = $_POST['fattura'];
					$data = $_POST['data'];
					stampaFatturaSingola($conn, $id,$data, $dataEmissione, $cognomeNome, $indirizzo, $residenza,$cap,$cfisc,$bolloiva,$importo,$descrizione,$totale,$fattura);
					break;
				case 'stampaFatturaMultipla' : 
					$dataEmissione = $_POST['dataEmissione'];
					$cognomeNome = $_POST['cognomeNome'];
					$indirizzo = $_POST['indirizzo'];
					$residenza = $_POST['residenza'];
					$cap = $_POST['cap'];
					$cfisc = $_POST['cfisc'];
					$bolloiva = $_POST['bolloiva'];
					$importo = $_POST['importo'];
					$descrizione = $_POST['descrizione'];
					$totale = $_POST['totale'];
					$fattura = $_POST['fattura'];
					$id = $_POST['id'];
					stampaFatturaMultipla($conn,$id, $dataEmissione, $cognomeNome, $indirizzo, $residenza,$cap,$cfisc,$bolloiva,$importo,$descrizione,$totale,$fattura);
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
			$query="SELECT anagrafica.ID,Nome,Cognome,DataNascita,comuninascitaanagrafica.LuogoNascita,MedicoProvenienza,comuni.Comune AS Residenza,Indirizzo,CAP,Telefono1,Telefono2,motivi.Descrizione AS Motivo, Anamnesi, CodFisc FROM anagrafica LEFT JOIN motivi ON (anagrafica.Motivo = motivi.ID) JOIN comuni ON(anagrafica.Residenza = comuni.ID) JOIN comuninascitaanagrafica ON (comuninascitaanagrafica.ID=anagrafica.ID) WHERE upper(Cognome) LIKE ? OR upper(Nome) LIKE ? ORDER BY Cognome,Nome DESC LIMIT 0,100 ";
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
			$persona = "%".$persona."%";             //ricerca se c'è 'persona' dentro alla stringa che scriviamo
			$query="SELECT AnaID,Nome,Cognome,Data,Pagamento,Pagato FROM contabilita WHERE upper(Cognome) LIKE ? OR upper(Nome) LIKE ? ORDER BY Data DESC,Cognome,Nome";
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

		function caricaUltimoIntervento($conn,$idPersona,$data){   //funzione che carica i dati dell'ultimo intervento(anagrafica/contabilità)
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

		function caricaUltimoInterventoAnagrafica($conn,$idPersona){   //funzione che carica i dati dell'ultimo intervento per anagrafica
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

		function inserisciNuovoPaziente($conn,$nome,$cognome,$dataNascita,$luogoNascita,$dataNascitaFP,$luogoNascitaFP,$medicoProv,$residenza,$residenzaFP,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc,$foglioPrivacy){   //funzione che inserisce un nuovo utente nel db e prepara gia i dati per stampare il foglio privacy
			$codFisc = strtoupper($codFisc);
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
			$stmSql ->bindParam(13, $codFisc);
			
			$result = $stmSql ->execute();


			$foglioPrivacy = str_replace("@cognomeNome@",$cognome . " " . $nome,$foglioPrivacy);
			$foglioPrivacy = str_replace("@luogoNascita@",$luogoNascitaFP,$foglioPrivacy);
			$foglioPrivacy = str_replace("@dataNascita@",$dataNascitaFP,$foglioPrivacy);
			$foglioPrivacy = str_replace("@residenza@",$residenzaFP,$foglioPrivacy);
			$foglioPrivacy = str_replace("@indirizzo@",$indirizzo,$foglioPrivacy);
			$foglioPrivacy = str_replace("@cap@",$cap,$foglioPrivacy);
			$foglioPrivacy = str_replace("@cfisc@",$codFisc,$foglioPrivacy);
			$foglioPrivacy = str_replace("@telefono@",$telefono1,$foglioPrivacy);
			$foglioPrivacy = str_replace("@dataOggi@",date("d/m/Y"),$foglioPrivacy);
			
			echo $foglioPrivacy;			
		}

		function inserisciPagamentoDesc($conn,$idPersona,$data,$importo,$pagato,$descrizione){   // funzione che inserisce il pagamento nel database dopo che il dott. ha finito ed aggiunge il costo della seduta con descrizione
			$query = "INSERT INTO interventi VALUES(?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $descrizione);
			$result = $stmSql ->execute();

			if(!$result){
				echo 0;
			}

			//inseriamo sia nella tabella interventi che nella tabella pagamenti

			$query="INSERT INTO pagamenti (AnaID, Data, Pagamento, Pagato) VALUES(?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $importo);
			$stmSql ->bindParam(4, $pagato);
			
			$result = $stmSql ->execute();

			echo $result;          //faccio restituire solo vero o falso, se riesce eseguire la query restituisce vero
		}

		function visualizzaStoricoInterventi($conn,$idPersona){   //pulsante che fa vedere tutti gli ultimi interventi
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

		function visualizzaContabilitaPersona($conn,$idPersona){  //funzione restituisce i record riguardati la contabilita del paziente dal menu a scorrimento a destra in anagrafica
			$query="SELECT * FROM contabilita WHERE AnaID=?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret= array();
			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}

			if(empty($ret)){
				echo -1;
			}else{
				echo json_encode(local_encode($ret));
		
			}
			
		}

//--------------------------inizio funzioni pagamento--------------------------------//

		function aggiornaPagamento($conn,$idPersona,$data,$importo){   //bottone paga che permette di modificare l'importo di un intervento
			$query="UPDATE pagamenti SET Pagamento= ? WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $importo);
			$stmSql ->bindParam(2, $idPersona);
			$stmSql ->bindParam(3, $data);
		
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso, se riesce eseguire la query da come risultato echo = true
		}		

		function selezionaImportoInterventoPassato($conn,$idPersona,$dataIntervento){  //funzione che estrae l'importo da inserire nella ricevuta dopo aver cliccato sul bottone che si è sicuri di fare il pagamento
			$query="SELECT Pagamento FROM contabilita WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $dataIntervento);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();
		echo $ret[0];
		}
		
		function selezionaImportoTuttiInterventiPassati($conn,$idPersona,$data){  // funzione che permette di sommar el'importo di tutte le sessioni passate per controllare (quanto dovrei pagare se pago tutto in una volta) e per (dare il totale da mettere nella fattura)
			$query="SELECT SUM(Pagamento) FROM contabilita WHERE AnaID = ? AND Data<>? AND Pagato=0";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();
					
			echo $ret[0]; //restituisco il totale
		}

		function controlloPiuPagamenti($conn,$idPersona){   //funzione che controlla per vedere se il paziente ha piu di 1 pagamento in sopeso (per anagrafica e per contabilita)
			$query="SELECT Pagamento FROM contabilita WHERE AnaID = ? AND Pagato=0";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();
			if($ret=$stmSql->fetch()){
				$ret=1;    						//c'e piu di un pagamento da pagare
			}else{
				$ret=0;	   						//c'e solo un pagamento da effetture
			}
		echo $ret; //restituisco 0 o 1
		}

		function aggiornaPagatoFatturaSingolo($conn,$idPersona,$data){   //funzione che aggiorna la variabile pagato a 1 nella fattura di un singolo pagamento
			$query="UPDATE pagamenti SET Pagato=1 WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
		
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da come risultato echo = true
		}	

		function aggiornaPagatoFatturaMultipla($conn,$idPersona,$nFattura){   //funzione che aggiorna la variabile pagato a 1 nella fattura di un pagamento multiplo
			$query="UPDATE pagamenti SET Pagato=1, nFattura=? WHERE AnaID = ? AND Pagato=0";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nFattura);
			$stmSql ->bindParam(2, $idPersona);
			
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da come risultato echo = true
		}		

//--------------------------fine funzioni pagamento--------------------------------//
//---------------------------------------------------------------------------------//
//----------------------funzionipop-up modifica paziente---------------------------//

		function aggiornaAnagraficaRequest($conn,$idPersona){   //funzione che restituisce tutti i dati di una persona per metterli nel pop-up che permette di modificare i dati del paziente
			
			$query="SELECT Nome,Cognome,DataNascita,LuogoNascita,MedicoProvenienza,Residenza,Indirizzo,CAP,Telefono1,Telefono2,Motivo,Anamnesi,CodFisc FROM anagrafica WHERE anagrafica.ID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();

			$query2 = 'SELECT CONCAT(Comune,", ",LuogoNascita) AS luogoNascita FROM anagrafica,comuni WHERE anagrafica.LuogoNascita = comuni.ID AND anagrafica.ID = ?';
			$stmSql2 = $conn->prepare($query2);
			$stmSql2 ->bindParam(1, $idPersona);
			$result2 = $stmSql2 ->execute();
			$luogoNascita = $stmSql2->fetch();

			$query3 = 'SELECT CONCAT(Comune,", ",Residenza) AS residenza FROM anagrafica,comuni WHERE anagrafica.Residenza = comuni.ID AND anagrafica.ID = ?';
			$stmSql3 = $conn->prepare($query3);
			$stmSql3 ->bindParam(1, $idPersona);
			$result3 = $stmSql3 ->execute();
			$residenza = $stmSql3->fetch();


			$ret= array();
			$row = $stmSql->fetch();
			$row['LuogoNascita'] = $luogoNascita;
			$row['Residenza'] = $residenza;
			
		echo json_encode(local_encode($row)); 
		}

		function aggiornaAnagraficaUpdate($conn,$idPersona,$nome,$cognome,$dataNascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc){   //funzione che esegue l'update dopo che è stato cliccato il pulsante aggiorna campi nel pop-up del aggirona campi del paziente
			
			$query="UPDATE anagrafica SET Nome = ?, Cognome = ?, DataNascita = ?, LuogoNascita = ?, MedicoProvenienza = ?, Residenza = ?, Indirizzo = ?, CAP = ?, Telefono1 = ?, Telefono2 = ?, Motivo = ?, Anamnesi = ?, CodFisc = ? WHERE ID=?";

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
			$stmSql ->bindParam(14, $idPersona);

			$result = $stmSql ->execute();
			
		echo $result;			//faccio restituire solo vero o falso se riesce eseguire la query da echo vero
		}

//---------------------- fine funzioni pop-up modifica paziente--------------------//
//---------------------------------------------------------------------------------//
//--------------------------------funzioni codice app------------------------------//

		function inserisciCodApp($conn,$user,$idPersona){	//funzione inserisce il codice richiamando la funzione sotto per fare controlli se è presente/modificato/null
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

		function visualizzaCodApp($conn,$idPersona){   //funzione che controlla se un pazienete ha gia un codice generato o se ha già inserito la propria mail al posto di questo codice
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


//---------------------------fine funzioni codice app------------------------------//
//---------------------------------------------------------------------------------//
//------------------funzioni per visualizzare l'insieme di docs--------------------//

		function visualizzaDocumenti($conn,$idPersona){		//funzione che permette di visualizzare tutti i documenti di una data persona nella schermata anagrafica
			$query="SELECT ID,AnaID,Data,Descrizione,Allegato FROM documenti WHERE AnaID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret= array();
			while($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			echo json_encode(local_encode($ret)); 
		}

		function inserisciDocumento($conn,$idPersona,$data,$allegato,$descrizione){		//funzione che permette di inserire un documento nella scheda anagrafica
			$query="INSERT INTO documenti(AnaID,Data,Allegato,Descrizione) VALUES(?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $allegato);
			$stmSql ->bindParam(4, $descrizione);
			
			$result = $stmSql ->execute();

			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da echo vero
		}

		function eliminaDocumento($conn,$idDocumento){		//funzione che permette di eliminare un documento quando entriamo in visualizza documenti
			$query="DELETE FROM documenti WHERE ID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idDocumento);
			
			$result = $stmSql ->execute();
		}

		function visualizzaAnamnesi($conn,$idPersona){ 		//funzione che restituisce l'anamnesi di un paziente
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

//-------------------fine funzioni per visualizzare l'insieme di docs----------------------//
//-----------------------------------------------------------------------------------------//
//------------------funzioni per caricamenti nel pop-up aggiungi nuovo---------------------//


		function caricaComuni($conn,$ricerca){  //funzione che restituisce l'elenco dei comuni
			$i=0;
			$ricerca = $ricerca."%";
			$query="SELECT * FROM comuni WHERE Comune LIKE upper(?) ORDER BY Comune";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $ricerca);
			$result = $stmSql ->execute();
			$ret= array();
			while($i<10 && $row = $stmSql->fetch()){
					$i=$i+1;
					$row['Comune'] = str_replace("'", "\'", $row['Comune']);
					$stringa = $row['Comune'].", ".$row['ID'];
					array_push ($ret, $stringa);
			}
			echo json_encode(local_encode($ret)); 
		}
		function caricaMotivi($conn){  //funzione che restituisce l'elenco dei motivi
			$query="SELECT * FROM motivi";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();
			$ret= array();
			while($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
		echo json_encode(local_encode($ret)); 
		}

		function foglioToHTML($conn, $doc){ 	//funzione che
			$fileHtml = fopen("../tmp/tmpFoglioPrivacy.html", "w");
			fwrite($fileHtml, $doc);
			fclose($fileHtml);

			$query="SELECT ID FROM anagrafica ORDER BY ID DESC LIMIT 0,1";
			$stmSql = $conn->prepare($query);
			
			$result = $stmSql ->execute();
			$ret = $stmSql ->fetch();
			
			echo $ret[0];  
		}

		function convertToPDF($conn,$id,$data){		//funzione che 
			//linux
			//$mainPath = "../docs/" . $id;
			//windows
			$mainPath = "..\\docs\\" . $id;

			$descrizione = "Foglio privacy";
			//linux
			//$downloadPath = $mainPath . "/foglioPrivacy.html";
			//windows
			$downloadPath = $mainPath . "\\foglioPrivacy.html";

//linux
			//$cmd1 = "mkdir -m777 $mainPath";
			//exec($cmd1);
//windows
			$cmd1 = "mkdir " . $mainPath;
			error_log($cmd1);
			shell_exec($cmd1);
			//sleep(2);
//linux
			//$cmd2 = '/home/ec2-user/wkhtmltox/bin/wkhtmltopdf /var/www/html/webApp/tmp/tmpFoglioPrivacy.html /var/www/html/webApp/docs/foglioPrivacy.pdf';
			//$ret = exec($cmd2);
//windows
			$cmd2 = "copy ..\\tmp\\tmpFoglioPrivacy.html ..\\docs\\" . $id . "\\foglioPrivacy.html";
			error_log($cmd2);
			$ret = shell_exec($cmd2);
			//sleep(2);
			$query="INSERT INTO documenti VALUES(NULL,?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $downloadPath);
			$stmSql ->bindParam(4, $descrizione);
			
			$result = $stmSql ->execute();

			echo $downloadPath;
		}

//----------------------fine funzioni per caricamenti nel pop-up aggiungi nuovo-----------------------------//

		function trovaAppuntamenti($conn){ 		//funzione che permette di trovare i prossimi due appuntamenti da mettere in alto a destra
			$query="SELECT anagrafica.Nome,anagrafica.Cognome,time(DataOra) as Ora,date(DataOra) as Data FROM appuntamenti,anagrafica WHERE appuntamenti.AnaID = anagrafica.ID AND DataOra>= now() ORDER BY DataOra LIMIT 2";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();
			$ret= array();
			$i = 0;
			while ($row = $stmSql->fetch()){
				array_push ($ret, $row);
				$i = $i + 1;
			}

			//Se non trova due appuntamenti riempie un record o due a seocnda di quanti ne ha trovati di campi vuoti
			if($i < 2){
				while($i != 2){
					$row['Nome'] = "Nessuno";
					$row['Cognome'] = "";
					$row['Ora'] = "";
					$row['Data'] = "";
					array_push ($ret, $row);
					$i = $i + 1;
				}
			}
			
		echo json_encode(local_encode($ret));
		}

		/**
		* funzione che visualizza i dettagli di un paziente
		*/
		function dettagliPaziente($conn,$id){	
			$query = 'SELECT CONCAT(Cognome," ",Nome) as cognomeNome, Indirizzo, comuni.Comune as residenza, CAP, CodFisc as cfisc, now() as dataEmissione FROM anagrafica,comuni WHERE Residenza = comuni.ID AND anagrafica.ID = ?';
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			$result = $stmSql ->execute();
			$ret = array();
			$row = $stmSql->fetch();
			array_push($ret, $row);

			echo json_encode(local_encode($ret));
		}

		/**
		* funzione che permette di compilare la fattura con i dati della contabilità
		*/
		function compilaFattura($conn, $id, $importo, $descrizione, $data, $dataFattura, $fattura, $cognomeNome, $indirizzo, $residenza, $cap, $cfisc, $totale, $bolloiva, $daPagare, $dataEmissione){
			$query = "start transaction;";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();
			$anno = substr($dataEmissione,0,4);
			//Progressivo che indica il numero della fattura
			$query = "SELECT numerFattura FROM gestionefatture WHERE Anno = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $anno);
			$result = $stmSql ->execute();
			$row = $stmSql->fetch();

			$row[0] = $row[0] + 1;
			$nFattura = $row[0];

			$query = "UPDATE gestionefatture SET numeroFattura = ? WHERE Anno = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nFattura);
			$stmSql ->bindParam(2, $anno);
			$result = $stmSql ->execute();

			$fattura = str_replace("@nFattura@",$nFattura,$fattura);
			$fattura = str_replace("@importo@",$importo,$fattura);
			$fattura = str_replace("@descrizione@",$descrizione,$fattura);
			$fattura = str_replace("@dataEmissione@",$dataEmissione,$fattura);
			$fattura = str_replace("@totale@",$totale,$fattura);
			$fattura = str_replace("@daPagare@",($totale*$bolloiva)+$totale,$fattura);
			$fattura = str_replace("@bolloIva@",($bolloiva*100),$fattura);
			$fattura = str_replace("@cfiscPaziente@",$cfisc,$fattura);
			$fattura = str_replace("@cap@",$cap,$fattura);
			$fattura = str_replace("@residenza@",$residenza,$fattura);
			$fattura = str_replace("@indirizzo@",$indirizzo,$fattura);
			$fattura = str_replace("@nomeCognomePaziente@",$cognomeNome,$fattura);
			$fattura = str_replace("@annoEmissione@",substr($dataEmissione,0,4),$fattura);

			$fileHtml = fopen("../tmp/tmpFattura.html", "w");
			fwrite($fileHtml, $fattura);
			fclose($fileHtml);

			$query = "commit;";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();

			//linux
			//$mainPath = "../docs/" . $id;
			//windows
			$mainPath = "..\\fatture\\" . $id;

			//linux
			//$downloadPath = $mainPath . "/foglioPrivacy.html";
			//windows
			$downloadPath = $mainPath ."\\". substr($dataEmissione,0,10) . "_" . $nFattura . "_"  ."fattura.html";


//linux
			//$cmd1 = "mkdir -m777 $mainPath";
			//exec($cmd1);
//windows
			$cmd1 = "mkdir " . $mainPath;
			shell_exec($cmd1);

//linux
			//$cmd2 = '/home/ec2-user/wkhtmltox/bin/wkhtmltopdf /var/www/html/webApp/tmp/tmpFoglioPrivacy.html /var/www/html/webApp/docs/foglioPrivacy.pdf';
			//$ret = exec($cmd2);
//windows
			$cmd2 = "copy ..\\tmp\\tmpFattura.html " . $downloadPath;
			error_log($cmd2);
			$ret = shell_exec($cmd2);
			//sleep(2);

			$query="INSERT INTO fatture VALUES(NULL,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $dataEmissione);
			$stmSql ->bindParam(2, $downloadPath);
			$stmSql ->bindParam(3, $nFattura);
			$result = $stmSql ->execute();

			$query = "INSERT INTO interventi VALUES(?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $descrizione);
			$result = $stmSql ->execute();

			if(!$result){
				echo 0;
			}

			$query="INSERT INTO pagamenti VALUES(?,?,?,1,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $importo);
			$stmSql ->bindParam(4, $nFattura);
			
			$result = $stmSql ->execute();

			echo $downloadPath;
		}

		function ricevutaPagamentoEsistente($conn, $id, $data){
			$query="SELECT nFattura FROM pagamenti WHERE AnaId = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			$stmSql ->bindParam(2, $data);
			$result = $stmSql ->execute();

			$nFattura = $stmSql ->fetch();

			$query="SELECT Percorso FROM fatture WHERE nFattura = ? AND year(DataOraEmissione) = year(?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nFattura[0]);
			$stmSql ->bindParam(2, $data);
			
			$result = $stmSql ->execute();
			$ret = $stmSql ->fetch();

			echo $ret[0];
		}

		function datiFatturaSingola($conn, $id, $data){
			$query = 'SELECT NOW() as dataEmissione, CONCAT(Cognome," ",Nome) as cognomeNome, Indirizzo, comuni.Comune as residenza, CAP, CodFisc as cfisc, interventi.Descrizione as descrizione, pagamenti.Pagamento as importo 
			FROM anagrafica,comuni,interventi,pagamenti WHERE comuni.ID = anagrafica.Residenza AND interventi.Data = pagamenti.Data AND interventi.AnaID = pagamenti.AnaID AND interventi.AnaID = anagrafica.ID AND 
			anagrafica.ID = ? AND interventi.Data = ?';
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			$stmSql ->bindParam(2, $data);
			
			$result = $stmSql ->execute();
			$ret = $stmSql ->fetch();
			echo json_encode(local_encode($ret));
		}

		function datiFatturaMultipla($conn, $id){
			$query = 'SELECT NOW() as dataEmissione, CONCAT(Cognome," ",Nome) as cognomeNome, Indirizzo, comuni.Comune as residenza, CAP, CodFisc as cfisc, interventi.Descrizione as descrizione, pagamenti.Pagamento as importo 
			FROM anagrafica,comuni,interventi,pagamenti WHERE comuni.ID = anagrafica.Residenza AND interventi.Data = pagamenti.Data AND interventi.AnaID = pagamenti.AnaID AND interventi.AnaID = anagrafica.ID AND 
			anagrafica.ID = ? AND Pagato = 0';
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			
			$ret = array();
			$result = $stmSql ->execute();
			while($row = $stmSql ->fetch()){
				array_push($ret, $row);
			}

			echo json_encode(local_encode($ret));
		}

		function stampaFatturaSingola($conn, $id,$data, $dataEmissione, $cognomeNome, $indirizzo, $residenza,$cap,$cfisc,$bolloiva,$importo,$descrizione,$totale,$fattura){
			$query = "start transaction;";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();
			$anno = substr($dataEmissione,0,4);
			//Progressivo che indica il numero della fattura
			$query = "SELECT numerFattura FROM gestionefatture WHERE Anno = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $anno);
			$result = $stmSql ->execute();
			$row = $stmSql->fetch();

			$row[0] = $row[0] + 1;
			$nFattura = $row[0];

			$query = "UPDATE gestionefatture SET numeroFattura = ? WHERE Anno = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nFattura);
			$stmSql ->bindParam(2, $anno);
			$result = $stmSql ->execute();

			$fattura = str_replace("@nFattura@",$nFattura,$fattura);
			$fattura = str_replace("@importo@",$importo,$fattura);
			$fattura = str_replace("@descrizione@",$descrizione,$fattura);
			$fattura = str_replace("@dataEmissione@",$dataEmissione,$fattura);
			$fattura = str_replace("@totale@",$totale,$fattura);
			$fattura = str_replace("@daPagare@",($totale*$bolloiva)+$totale,$fattura);
			$fattura = str_replace("@bolloIva@",($bolloiva*100),$fattura);
			$fattura = str_replace("@cfiscPaziente@",$cfisc,$fattura);
			$fattura = str_replace("@cap@",$cap,$fattura);
			$fattura = str_replace("@residenza@",$residenza,$fattura);
			$fattura = str_replace("@indirizzo@",$indirizzo,$fattura);
			$fattura = str_replace("@nomeCognomePaziente@",$cognomeNome,$fattura);
			$fattura = str_replace("@annoEmissione@",substr($dataEmissione,0,4),$fattura);

			$fileHtml = fopen("../tmp/tmpFattura.html", "w");
			fwrite($fileHtml, $fattura);
			fclose($fileHtml);

			$query = "commit;";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();

			//linux
			//$mainPath = "../docs/" . $id;
			//windows
			$mainPath = "..\\fatture\\" . $id;

			//linux
			//$downloadPath = $mainPath . "/foglioPrivacy.html";
			//windows
			$downloadPath = $mainPath ."\\". substr($dataEmissione,0,10) . "_" . $nFattura . "_"  ."fattura.html";


//linux
			//$cmd1 = "mkdir -m777 $mainPath";
			//exec($cmd1);
//windows
			$cmd1 = "mkdir " . $mainPath;
			shell_exec($cmd1);

//linux
			//$cmd2 = '/home/ec2-user/wkhtmltox/bin/wkhtmltopdf /var/www/html/webApp/tmp/tmpFoglioPrivacy.html /var/www/html/webApp/docs/foglioPrivacy.pdf';
			//$ret = exec($cmd2);
//windows
			$cmd2 = "copy ..\\tmp\\tmpFattura.html " . $downloadPath;
			error_log($cmd2);
			$ret = shell_exec($cmd2);
			//sleep(2);

			$query="INSERT INTO fatture VALUES(NULL,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $dataEmissione);
			$stmSql ->bindParam(2, $downloadPath);
			$stmSql ->bindParam(3, $nFattura);
			$result = $stmSql ->execute();

			$query = "UPDATE pagamenti SET pagato = 1, nFattura = ?, Pagamento = ? WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nFattura);
			$stmSql ->bindParam(2, $importo);
			$stmSql ->bindParam(3, $id);
			$stmSql ->bindParam(4, $data);
			$result = $stmSql ->execute();

			echo $downloadPath;
		}

		function stampaFatturaMultipla($conn,$id, $dataEmissione, $cognomeNome, $indirizzo, $residenza,$cap,$cfisc,$bolloiva,$importo,$descrizione,$totale, $fattura){
			$query = "start transaction;";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();
			$anno = substr($dataEmissione,0,4);
			//Progressivo che indica il numero della fattura
			$query = "SELECT numerFattura FROM gestionefatture WHERE Anno = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $anno);
			$result = $stmSql ->execute();
			$row = $stmSql->fetch();

			$row[0] = $row[0] + 1;
			$nFattura = $row[0];

			$query = "UPDATE gestionefatture SET numeroFattura = ? WHERE Anno = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $nFattura);
			$stmSql ->bindParam(2, $anno);
			$result = $stmSql ->execute();

			$fattura = str_replace("@nFattura@",$nFattura,$fattura);
			$fattura = str_replace("@importo@",$importo,$fattura);
			$fattura = str_replace("@descrizione@",$descrizione,$fattura);
			$fattura = str_replace("@dataEmissione@",$dataEmissione,$fattura);
			$fattura = str_replace("@totale@",$totale,$fattura);
			$fattura = str_replace("@daPagare@",($totale*$bolloiva)+$totale,$fattura);
			$fattura = str_replace("@bolloIva@",($bolloiva*100),$fattura);
			$fattura = str_replace("@cfiscPaziente@",$cfisc,$fattura);
			$fattura = str_replace("@cap@",$cap,$fattura);
			$fattura = str_replace("@residenza@",$residenza,$fattura);
			$fattura = str_replace("@indirizzo@",$indirizzo,$fattura);
			$fattura = str_replace("@nomeCognomePaziente@",$cognomeNome,$fattura);
			$fattura = str_replace("@annoEmissione@",substr($dataEmissione,0,4),$fattura);

			$fileHtml = fopen("../tmp/tmpFattura.html", "w");
			fwrite($fileHtml, $fattura);
			fclose($fileHtml);

			$query = "commit;";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();

			//linux
			//$mainPath = "../docs/" . $id;
			//windows
			$mainPath = "..\\fatture\\" . $id;

			//linux
			//$downloadPath = $mainPath . "/foglioPrivacy.html";
			//windows
			$downloadPath = $mainPath ."\\". substr($dataEmissione,0,10) . "_" . $nFattura . "_" ."fattura.html";
			error_log($downloadPath);


//linux
			//$cmd1 = "mkdir -m777 $mainPath";
			//exec($cmd1);
//windows
			$cmd1 = "mkdir " . $mainPath."\\";
			shell_exec($cmd1);

//linux
			//$cmd2 = '/home/ec2-user/wkhtmltox/bin/wkhtmltopdf /var/www/html/webApp/tmp/tmpFoglioPrivacy.html /var/www/html/webApp/docs/foglioPrivacy.pdf';
			//$ret = exec($cmd2);
//windows
			$cmd2 = "copy ..\\tmp\\tmpFattura.html " . $downloadPath;
			error_log($cmd2);
			$ret = shell_exec($cmd2);
			//sleep(2);
			error_log($downloadPath);
			$query="INSERT INTO fatture VALUES(NULL,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $dataEmissione);
			$stmSql ->bindParam(2, $downloadPath);
			$stmSql ->bindParam(3, $nFattura);
			$result = $stmSql ->execute();

			aggiornaPagatoFatturaMultipla($conn,$id,$nFattura);

			error_log($downloadPath);
			echo $downloadPath;
		}
		
?>
