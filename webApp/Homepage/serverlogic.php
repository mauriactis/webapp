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
				//-----sidenav a destra-----//
				//-----sidenav a destra-----//
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
				//-----sidenav a destra-----//
				//-----sidenav a destra-----//
				//-----sidenav a destra-----//
				case 'inserisciPagamentoDesc' :
					$idPersona = $_POST['id'];
					$importo = $_POST['importo'];
					$pagato = $_POST['pagato'];
					$descrizione = $_POST['descrizione'];
					$data = $_POST['data'];
					$dataFattura = $_POST['dataFattura'];
					$fattura = $_POST['fattura'];
					inserisciPagamentoDesc($conn,$idPersona,$data,$dataFattura,$importo,$pagato,$descrizione,$fattura);
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
				//-----pagamento-----//
				//-----pagamento-----//
				//-----pagamento-----//
				case 'aggiornaPagamento' :
					$idPersona = $_POST['id'];
					$data = $_POST['dataIntervento'];
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
				case 'aggiornaPagatoFatturaMultipla' :
					$idPersona = $_POST['id'];
				 	aggiornaPagatoFatturaMultipla($conn,$idPersona);
				 	break;
					//-----pagamento-----//
					//-----pagamento-----//
					//-----pagamento-----//
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
					//Tommy ha aggiunto questa funzione
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
				case 'fatturaToHTML' :
					$doc = $_POST['fattura'];
					fatturaToHTML($conn,$doc);
					break;
				case 'convertToPDF' :
					$id = $_POST['id'];
					$data = $_POST['data'];
					convertToPDF($conn,$id,$data);
					break;
				case 'fatturaToPDF' :
					$id = $_POST['id'];
					$data = $_POST['data'];
					convertToPDF($conn,$id,$data);
					break;
				case 'trovaAppuntamenti' :
					trovaAppuntamenti($conn);
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
			$persona = "%".$persona."%";             //ricerca se c e persona dentro alla stringa che scriviamo
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

		function inserisciNuovoPaziente($conn,$nome,$cognome,$dataNascita,$luogoNascita,$dataNascitaFP,$luogoNascitaFP,$medicoProv,$residenza,$residenzaFP,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc,$foglioPrivacy){   //inserisce un nuovo utente nel db
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

		function inserisciPagamentoDesc($conn,$idPersona,$data,$dataFattura,$importo,$pagato,$descrizione,$fattura){   //inserisce il pagamento nel database dopo che la dott. ha finito e aggiunge il costo delle seduto con descrizione
			$query = "INSERT INTO interventi VALUES(?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $descrizione);
			$result = $stmSql ->execute();

			if(!$result){
				echo 0;
			}

			$query="INSERT INTO pagamenti VALUES(?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $importo);
			$stmSql ->bindParam(4, $pagato);
			
			$result = $stmSql ->execute();

			$fattura = str_replace("@dataEmissione@",$dataFattura,$fattura);
			$fattura = str_replace("@daPagare@",$importo,$fattura);
			$fattura = str_replace("@importo@",$importo,$fattura);
			$fattura = str_replace("@quantita@","1",$fattura);
			$fattura = str_replace("@descrSeduta@",$descrizione,$fattura);

			
			echo $fattura;
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

			if(empty($ret)){
				echo -1;
			}else{
				echo json_encode(local_encode($ret));
		
			}
			
		}

//--------------------------inizio funzioni pagamento--------------------------------//
//--------------------------inizio funzioni pagamento--------------------------------//
//--------------------------inizio funzioni pagamento--------------------------------//


//aggiorna il prezzo #1
//aggiorna il prezzo #1
//aggiorna il prezzo #1   controllata
//aggiorna il prezzo #1
		function aggiornaPagamento($conn,$idPersona,$data,$importo){   //bottone paga che permette di modificare l'importo di un intervento
			$query="UPDATE pagamenti SET Pagamento= ? WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $importo);
			$stmSql ->bindParam(2, $idPersona);
			$stmSql ->bindParam(3, $data);
		
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da come risultato echo = true
		}		
//paga il singolo importo sia per anagrafica che per contabilita #2
//paga il singolo importo sia per anagrafica che per contabilita #2
//paga il singolo importo sia per anagrafica che per contabilita #2   controllato
//paga il singolo importo sia per anagrafica che per contabilita #2
		
		function selezionaImportoInterventoPassato($conn,$idPersona,$dataIntervento){  //selezione l'importo da inserire nella ricevuta dopo aver cliccato sul bottona che si è sicuri di fare il pagamento
			$query="SELECT Pagamento FROM contabilita WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $dataIntervento);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();
		echo $ret[0];
		}
//paga molteplici pagamenti(serve per controllare anche quanto ci sarebbe da pagare eventualmente se si paga tutto) #3
//paga molteplici pagamenti(serve per controllare anche quanto ci sarebbe da pagare eventualmente se si paga tutto) #3
//paga molteplici pagamenti(serve per controllare anche quanto ci sarebbe da pagare eventualmente se si paga tutto) #3  controllato
//paga molteplici pagamenti(serve per controllare anche quanto ci sarebbe da pagare eventualmente se si paga tutto) #3
		
		function selezionaImportoTuttiInterventiPassati($conn,$idPersona,$data){  // funzione che permette di sommar el'importo di tutte le sessioni passate per controllare (quanto dovrei pagare se pago tutto in una volta) e per (dare il totale da mettere nella fattura)
			$query="SELECT SUM(Pagamento) FROM contabilita WHERE AnaID = ? AND Data<>? AND Pagato=0";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();
					
		echo $ret[0]; //restituisco il totale
		}
//controllo se ci sono piu pagamenti in sopeso #4
//controllo se ci sono piu pagamenti in sopeso #4
//controllo se ci sono piu pagamenti in sopeso #4  controllato
//controllo se ci sono piu pagamenti in sopeso #4
		function controlloPiuPagamenti($conn,$idPersona){   //controlla per vedere se il paziente ha piu di 1 pagamento in sopeso (per anagrafica e per contabilita)
			$query="SELECT Pagamento FROM contabilita WHERE AnaID = ? AND Pagato=0";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$result = $stmSql ->execute();
			$ret=$stmSql->fetch();
			if($ret=$stmSql->fetch()){
				$ret=1;    //       -------------------------->>>>>>>>>>>>>>>> c'e piu di un pagamento da pagare
			}else{
				$ret=0;	   //       -------------------------->>>>>>>>>>>>>>>> c'e solo un pagamento da effetture
			}
		echo $ret; //restituisco 0 o 1
		}
//funzione che aggiorna il pagato e l'importo con un pagamento unico(di una sola fattura di un singolo intervento) #5
//funzione che aggiorna il pagato e l'importo con un pagamento unico(di una sola fattura di un singolo intervento) #5
//funzione che aggiorna il pagato e l'importo con un pagamento unico(di una sola fattura di un singolo intervento) #5  controllato
//funzione che aggiorna il pagato e l'importo con un pagamento unico(di una sola fattura di un singolo intervento) #5
	

		function aggiornaPagatoFatturaSingolo($conn,$idPersona,$data){   
			$query="UPDATE pagamenti SET Pagato=1 WHERE AnaID = ? AND Data = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
		
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da come risultato echo = true
		}	


//funzione che aggiorna il pagato per tutti i record di una persona(pagamento multiplo) #6
//funzione che aggiorna il pagato per tutti i record di una persona(pagamento multiplo) #6
//funzione che aggiorna il pagato per tutti i record di una persona(pagamento multiplo) #6 controllato
//funzione che aggiorna il pagato per tutti i record di una persona(pagamento multiplo) #6

		function aggiornaPagatoFatturaMultipla($conn,$idPersona){   //funzione che aggiorna la variabile pagato da 0 a 1(e stato pagato l'intervento) 
			$query="UPDATE pagamenti SET Pagato=1 WHERE AnaID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			
			$result = $stmSql ->execute();
			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da come risultato echo = true
		}		

//--------------------------fine funzioni pagamento--------------------------------//
//--------------------------fine funzioni pagamento--------------------------------//
//--------------------------fine funzioni pagamento--------------------------------//

//---------------------funzionipop-up modifica paziente----------------------//
//---------------------funzionipop-up modifica paziente----------------------//
//---------------------funzionipop-up modifica paziente----------------------//

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

		function aggiornaAnagraficaUpdate($conn,$idPersona,$nome,$cognome,$dataNascita,$luogoNascita,$medicoProv,$residenza,$indirizzo,$cap,$telefono1,$telefono2,$motivo,$anamnesi,$codFisc){   //funzione che esegue l update dopo che e stato cliccato il pulsante aggiorna campi nel pop-up del aggirona campi del paziente
			
			$query="UPDATE anagrafica SET Nome = ?, Cognome = ?, DataNascita = ?, LuogoNascita = ?, MedicoProvenienza = ?, Residenza = ?, Indirizzo = ?, CAP = ?, Telefono1 = ?, Telefono2 = ?, Motivo = ?, Anamnesi = ?, CodFisc = ? WHERE ID=?";

			$codFisc = strtoupper($codFisc);
			
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
			$stmSql ->bindParam(14, $idPersona);

			$result = $stmSql ->execute();
			
		echo $result;			//faccio restituire solo vero o falso se riesce eseguire la query da echo vero
		}

//----------------------------funzioni codice app--------------------------//
//----------------------------funzioni codice app--------------------------//
//----------------------------funzioni codice app--------------------------//

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

//---------------------------funzioni per visualizzare l'insieme di docs----------------------------//
//---------------------------funzioni per visualizzare l'insieme di docs----------------------------//
//---------------------------funzioni per visualizzare l'insieme di docs----------------------------//

		function visualizzaDocumenti($conn,$idPersona){  //funzione che permette di visualizzare tutti i documenti di una data persona nella schermata anagrafica
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


		function inserisciDocumento($conn,$idPersona,$data,$allegato,$descrizione){
			$query="INSERT INTO documenti(AnaID,Data,Allegato,Descrizione) VALUES(?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idPersona);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $allegato);
			$stmSql ->bindParam(4, $descrizione);
			
			$result = $stmSql ->execute();

			
		echo $result;          //faccio restituire solo vero o falso se riesce eseguire la query da echo vero
		}



		function eliminaDocumento($conn,$idDocumento){
			$query="DELETE FROM documenti WHERE ID = ?";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $idDocumento);
			
			$result = $stmSql ->execute();
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


//----------------------funzioni per caricamenti nel pop-up aggiungi nuovo-----------------------------//
//----------------------funzioni per caricamenti nel pop-up aggiungi nuovo-----------------------------//
//----------------------funzioni per caricamenti nel pop-up aggiungi nuovo-----------------------------//


		function caricaComuni($conn,$ricerca){  //restituisce l elenco dei comuni
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

		function foglioToHTML($conn, $doc){
			$fileHtml = fopen("../tmp/tmpFoglioPrivacy.html", "w");
			fwrite($fileHtml, $doc);
			fclose($fileHtml);

			$query="SELECT ID FROM anagrafica ORDER BY ID DESC LIMIT 0,1";
			$stmSql = $conn->prepare($query);
			
			$result = $stmSql ->execute();
			$ret = $stmSql ->fetch();
			
			echo $ret[0];  
		}

		function fatturaToHTML($conn,$doc){
			$fileHtml = fopen("../tmp/tmpFattura.html", "w");
			fwrite($fileHtml, $doc);
			fclose($fileHtml);

			$query="SELECT AnaID, Data FROM interventi ORDER BY AnaID, Data DESC LIMIT 0,1";
			$stmSql = $conn->prepare($query);
			
			$result = $stmSql ->execute();
			$ret = $stmSql ->fetch();
			
			echo json_encode(local_encode($ret));  
		}

		function convertToPDF($conn,$id,$data){
			$mainPath = "..\docs\\" . $id . "\\";
			$cmd = "mkdir " . $mainPath;
			shell_exec($cmd);

			$downloadPath = $mainPath . "foglioPrivacy.pdf";

			$descrizione = "Foglio privacy";
			//Non posso far venire fuori l' opzione di download?
			//In alternativa si apre un popup con un link a dov'è il file
			$cmd = '/home/ec2-user/wkhtmltox/bin/wkhtmltopdf ..\tmp\tmpFoglioPrivacy.html ' . $downloadPath;
			shell_exec($cmd);

			$query="INSERT INTO documenti VALUES(NULL,?,?,?,?)";
			$stmSql = $conn->prepare($query);
			$stmSql ->bindParam(1, $id);
			$stmSql ->bindParam(2, $data);
			$stmSql ->bindParam(3, $downloadPath);
			$stmSql ->bindParam(4, $descrizione);
			
			$result = $stmSql ->execute();

			echo $downloadPath;
		}

		function fatturaToPDF($conn,$id,$data){
			$mainPath = "..\docs\\" . $id . "\\";
			$cmd = "mkdir " . $mainPath;
			shell_exec($cmd);

			$downloadPath = $mainPath . "foglioPrivacy.pdf";

			$descrizione = "Foglio privacy";
			//Non posso far venire fuori l' opzione di download?
			//In alternativa si apre un popup con un link a dov'è il file
			$cmd = '/home/ec2-user/wkhtmltox/bin/wkhtmltopdf ..\tmp\tmpFoglioPrivacy.html ' . $downloadPath;
			shell_exec($cmd);

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
//----------------------fine funzioni per caricamenti nel pop-up aggiungi nuovo-----------------------------//
//----------------------fine funzioni per caricamenti nel pop-up aggiungi nuovo-----------------------------//

		function trovaAppuntamenti($conn){
			$query="SELECT anagrafica.Nome,anagrafica.Cognome,time(DataOra) as Ora FROM appuntamenti,anagrafica WHERE appuntamenti.AnaID = anagrafica.ID AND DataOra>= now() ORDER BY DataOra LIMIT 2";
			$stmSql = $conn->prepare($query);
			$result = $stmSql ->execute();
			$ret= array();
			while ($row = $stmSql->fetch()){
					array_push ($ret, $row);
			}
			
		echo json_encode(local_encode($ret));
		}


?>
