/*Variabile globale*/
var anagraficaShown = true;





/*-------------------Funzioni in comune-------------------*/



//quando il documento è pronto mette i listener per il trigger di invio su ricerca e double click
$(document).ready(function(){
	cercaPersona();
    $('#txtRicercaAnagrafica').keypress(function(e){
      if(e.keyCode==13) $('#btnCerca').click();
    });
    $( "#vsblPage" ).dblclick(function() {
        if(anagraficaShown){
            if(document.getElementById("situazionePaziente").style.width == "500px"){
                nascondiSituazionePaziente();
            }
            if(document.getElementById("modifiche").style.width == "500px"){
                nascondiModifiche();
            }
        }else{
            if(document.getElementById("sidePagamento").style.width == "500px"){
                nascondiPagamento();
            }
        }
    });
    $("#txtResidenzaPopupAggiungiNuovo").keyup(function(){
        caricaResidenza();
    });
    $("#txtLuogoNascitaPopupAggiungiNuovo").keyup(function(){
        caricaLuogoNascita();
    });
    
});

//svuota il campo nome del popup aggiungi nuovo
function svuotaNome(){
    $("#txtNomePopupAggiungiNuovo").val("");
    document.getElementById("txtNomePopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaCognome(){
    $("#txtCognomePopupAggiungiNuovo").val("");
    document.getElementById("txtCognomePopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaDataNascita(){
    $("#txtDataNascitaPopupAggiungiNuovo").val("");
    document.getElementById("txtDataNascitaPopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaIndirizzo(){
    $("#txtIndirizzoPopupAggiungiNuovo").val("");
    document.getElementById("txtIndirizzoPopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaResidenza(){
    $("#txtResidenzaPopupAggiungiNuovo").val("");
    document.getElementById("txtResidenzaPopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaCap(){
    $("#txtCapPopupAggiungiNuovo").val("");
    document.getElementById("txtCapPopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaLuogoNascita(){
    $("#txtLuogoNascitaPopupAggiungiNuovo").val("");
    document.getElementById("txtLuogoNascitaPopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaTelefono(){
    $("#txtTelefonoPopupAggiungiNuovo").val("");
    document.getElementById("txtTelefonoPopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaMotivo(){
    $("#txtMotivoPopupAggiungiNuovo").val("");
    document.getElementById("txtMotivoPopupAggiungiNuovo").style.backgroundColor = "white";
}
function svuotaCodFisc(){
    $("#txtCodiceFiscalePopupAggiungiNuovo").val("");
    document.getElementById("txtCodiceFiscalePopupAggiungiNuovo").style.backgroundColor = "white";
}
//svuota tutti i campi del popup aggiungiNuovo
function cancellaCampi(){
	 svuotaNome();
     svuotaCognome();
     svuotaDataNascita();
     svuotaIndirizzo();
     svuotaResidenza();
     svuotaCap();
     svuotaLuogoNascita();
     svuotaTelefono();
     svuotaMotivo();
     svuotaCodFisc();
	 $("#txtProvenienzaPopupAggiungiNuovo").val("");
	 $("#txtTelefono2PopupAggiungiNuovo").val("");
	 $("#txtOsservazioniPopupAggiungiNuovo").val("");

     //vedi bottone annulla
	 if($("#campiAggiuntiviPopupAggiungiNuovo").is(":visible")){
	 	changeArrow();
        $("#campiAggiuntiviPopupAggiungiNuovo").hide();
	 }
}
//cambia il comtenuto quando è premuto il bottone campi aggiuntivi
function changeArrow(){
	if(document.getElementById("btnAggiungiCampiPopupAggiungiNuovo").value == "Aggiungi"){
		$("#campiAggiuntiviPopupAggiungiNuovo").toggle('show');
        $("#btnAggiungiCampiPopupAggiungiNuovo").html("Nascondi campi <span class=\"glyphicon glyphicon-chevron-up\">");
        document.getElementById("btnAggiungiCampiPopupAggiungiNuovo").value = "Nascondi";
    }else{
    	$("#campiAggiuntiviPopupAggiungiNuovo").toggle('hide');
    	document.getElementById("btnAggiungiCampiPopupAggiungiNuovo").value = "Aggiungi";
        $("#btnAggiungiCampiPopupAggiungiNuovo").html("Aggiungi campi <span class=\"glyphicon glyphicon-chevron-down\">");
    }
    if(document.getElementById("btnAggiungiCampiPopupModificaPaziente").value == "Aggiungi"){
        $("#campiAggiuntiviPopupModificaPaziente").toggle('show');
        $("#btnAggiungiCampiPopupModificaPaziente").html("Nascondi campi <span class=\"glyphicon glyphicon-chevron-up\">");
        document.getElementById("btnAggiungiCampiPopupModificaPaziente").value = "Nascondi";
    }else{
        $("#campiAggiuntiviPopupModificaPaziente").toggle('hide');
        document.getElementById("btnAggiungiCampiPopupModificaPaziente").value = "Aggiungi";
        $("#btnAggiungiCampiPopupModificaPaziente").html("Aggiungi campi <span class=\"glyphicon glyphicon-chevron-down\">");
    }
}
//gira data in gg-mm-aaaa
function giraDataUmano(date){
	return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
}
//gira data in aaaa-mm-gg
function giraDataDb(date){
    return date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
}
/*
restituisce la data odierna nel formato YYYY-MM-DD
*/
function dataDiOggi(){
    var today = new Date();
    var d = today.getDate();
    var m = today.getMonth() + 1;
    var y = today.getFullYear();
    if(d<10) d= "0" + d; // se il giorno ha una sola cifra ce ne aggiunge una davanti per salvarla sul db
    if(m<10) m= "0" + m; // se il mese ha una sola cifra ce ne aggiunge una davanti per salvarla sul db

    var oggi = y + "-" + m + "-" + d;
    return oggi;
}
//inizializza il calendario che spunta dalla textbox datanascita e carica i motivi nel dropdown
function initPopupAggiungiNuovo(){
    cancellaCampi();
    $("#elencoComuni1").html("");
    $("#elencoComuni2").html("");
    $.datepicker.setDefaults($.datepicker.regional['it']); 
    $('#txtDataNascitaPopupAggiungiNuovo').datepicker({ maxDate: new Date, minDate: new Date(1850,04,24) });
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaMotivi"},
        success: function(response) {
            var motivi = JSON.parse (response);
            for (var a = 0; a < motivi.length; a ++){
                var cmbMotivi = document.getElementById("txtMotivoPopupAggiungiNuovo");
                cmbMotivi.options[a] = new Option(motivi[a].Descrizione, motivi[a].ID);
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

function caricaLuogoNascita(){
    var ricerca = $('#txtLuogoNascitaPopupAggiungiNuovo').val();
    caricaComuni(ricerca, 0);
}

function caricaResidenza(){
    var ricerca = $('#txtResidenzaPopupAggiungiNuovo').val();
    caricaComuni(ricerca, 1);
}

function caricaLuogoNascitaModifica(){
    var ricerca = $('#txtLuogoNascitaPopupModificaPaziente').val();
    caricaComuni(ricerca, 2);
}

function caricaResidenzaModifica(){
    var ricerca = $('#txtResidenzaPopupModificaPaziente').val();
    caricaComuni(ricerca, 3);
}

function caricaComuni(ricerca, chiamante){
    if(ricerca == ""){
        $("#elencoComuni1").html("");
        $("#elencoComuni2").html("");
        $("#elencoComuniModifica1").html("");
        $("#elencoComuniModifica2").html("");
    }else{
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "caricaComuni", ricerca:ricerca},
            success: function(response) {
                var comuni = JSON.parse (response);
                var riga= '<table class="tabellaComuni">';
                for (var a = 0; a < comuni.length; a ++){
                    riga += '<tr class="rowComuni"><td onclick="riportaNome(\'' + comuni[a] + '\',' + chiamante + ');">'+ comuni[a] + '</td></tr>';
                }
                riga+="</table>";
                switch(chiamante){
                    case 0:
                        $("#elencoComuni1").html(riga);
                        $("#elencoComuni1").show();
                        break;
                    case 1:
                        $("#elencoComuni2").html(riga);
                        $("#elencoComuni2").show();
                        break;
                    case 2:
                        $("#elencoComuniModifica1").html(riga);
                        $("#elencoComuniModifica1").show();
                        break;
                    case 3:
                        $("#elencoComuniModifica2").html(riga);
                        $("#elencoComuniModifica2").show();
                        break;
                }
            },
            error: function(){
                alert("Errore");
            }
        });
    }
}

function riportaNome(nome,dove){
    switch(dove){
        case 0:
        document.getElementById("txtLuogoNascitaPopupAggiungiNuovo").value=nome;
        $("#elencoComuni1").html("");
        $("#elencoComuni1").hide();
        break;
        case 1:
        document.getElementById("txtResidenzaPopupAggiungiNuovo").value=nome;
        $("#elencoComuni2").html("");
        $("#elencoComuni2").hide();
        break;
        case 2:
        document.getElementById("txtLuogoNascitaPopupModificaPaziente").value=nome;
        $("#elencoComuniModifica1").html("");
        $("#elencoComuniModifica1").hide();
        break;
        case 3:
        document.getElementById("txtResidenzaPopupModificaPaziente").value=nome;
        $("#elencoComuniModifica2").html("");
        $("#elencoComuniModifica2").hide();
        break;
    }
}


//FIXARE
//scarica il foglio della privacy
function stampaFoglioPrivacy(){
    var id = $("#idPersonaFP").val();
    console.log(id);
    var data = dataDiOggi();
    console.log(data);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "convertToPDF",id:id,data:data},
        success: function(response) {
            console.log(response);
            $('#popupStampaFoglioPrivacy').modal('hide');
        },
        error: function(){
            alert("Errore");
        }
    });
}





/*-------------------Funzioni relative ad anagrafica-------------------*/



//carica la pagina anagrafica sotto l'header
function caricaAnagrafica(){
    $("#txtRicercaAnagrafica").val("");
    anagraficaShown = true;
    cercaPersona();
    
}

//cerca persona in base alla casella di ricerca in anagrafica on i9n contabilità a seconda di cosa è mostrato
function cercaPersona (){
    var ricerca = document.getElementById ("txtRicercaAnagrafica").value;
    $("#txtResidenzaPopupModificaPaziente").keyup(function(){
        caricaResidenzaModifica();
    });
    $("#txtLuogoNascitaPopupModificaPaziente").keyup(function(){
        caricaLuogoNascitaModifica();
    });
    /*Se è vera è mostrata anagrafica, altrimenti è mostrata contabilità*/
    if(anagraficaShown){
        if(document.getElementById("situazionePaziente") != null){
            nascondiSituazionePaziente();
        }
        $.ajax({  
            type: "GET", 
            url: "../Anagrafica/anagrafica.fisio", 
            success: function(response) {
                var i;
                $("#container").html(response);          
            },
            error: function(){
                alert("Errore");
            }
        });
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "cercaPersona", nomePersona:ricerca},
            success: function(response) {
                var persone = JSON.parse (response);
                var riga = "";
                for (var a = 0; a < persone.length; a ++)
                {
                    if(persone[a].Motivo == "NULL"){
                        persone[a].Motivo = "Nessun motivo registrato.";
                    }
                    riga += "<tr><td>" + 
                                persone [a].ID + "</td><td>" + 
                                persone [a].Cognome + "</td><td>" + 
                                persone [a].Nome + "</td><td>" + 
                                giraDataUmano(persone [a].DataNascita) + "</td><td>" + 
                                persone [a].LuogoNascita + "</td><td>" + 
                                persone [a].MedicoProvenienza + "</td><td>" + 
                                persone [a].Residenza + "</td><td>" + 
                                persone [a].Indirizzo + "</td><td>" + 
                                persone [a].CAP + "</td><td>" + 
                                persone [a].Telefono1 + "</td><td>" + 
                                persone [a].Telefono2 + "</td><td>" + 
                                persone [a].Motivo + "</td><td>" + 
                                persone [a].CodFisc + "</td><td>" + 
                                '<button class="btn btn-primary" onclick="mostraModifiche(' + persone [a].ID + ',\'' + persone [a].Cognome + '\',\'' + persone [a].Nome + '\');"><span class="glyphicon glyphicon-th"></span></button>' + "</td><td>" +
                                '<button class="btn btn-danger" onclick="mostraSituazionePaziente(' + persone [a].ID + ',\'' + persone [a].Cognome + '\',\'' + persone [a].Nome + '\');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>";
                }
                $("#tblAnagraficaBody").html(riga);
            },
            error: function(){
                alert("Errore");
            }
        });
    }else{
        caricaContabilita(ricerca);
    }
}

//inizializza i campi del popup modifica a quelli presenti sul server
function initPopupModifica(){
    $("#elencoComuniModifica1").html("");
    $("#elencoComuniModifica2").html("");
    $("#txtResidenzaPopupModificaPaziente").keyup(function(){
        caricaResidenzaModifica();
    });
    $("#txtLuogoNascitaPopupModificaPaziente").keyup(function(){
        caricaLuogoNascitaModifica();
    });
    var id = $("#idPersonaModifiche").val();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "aggiornaAnagraficaRequest", id:id},
        success: function(response) {
            console.log(response);
            var datiPaziente = JSON.parse (response);
            var riga = "";

            $.datepicker.setDefaults($.datepicker.regional['it']); 
            $('#txtDataNascitaPopupModificaPaziente').datepicker({ maxDate: new Date, minDate: new Date(1850,04,24) });
            $.ajax({  
                type: "POST", 
                url: "./serverlogic.php",
                data: {azione: "caricaMotivi"},
                success: function(response) {
                    var motivi = JSON.parse (response);
                    for (var a = 0; a < motivi.length; a ++){
                        var cmbMotivi = document.getElementById("txtMotivoPopupModificaPaziente");
                        cmbMotivi.options[a] = new Option(motivi[a].Descrizione, motivi[a].ID);
                    }
                    document.getElementById("txtMotivoPopupModificaPaziente").selectedIndex = datiPaziente.Motivo-1;
                    console.log(document.getElementById("txtMotivoPopupModificaPaziente").selectedIndex);
                },
                error: function(){
                    alert("Errore");
                }
            });
            $("#txtNomePopupModificaPaziente").val(datiPaziente.Nome);
            $("#txtCognomePopupModificaPaziente").val(datiPaziente.Cognome);
            $("#txtDataNascitaPopupModificaPaziente").val(giraDataUmano(datiPaziente.DataNascita));
            $("#txtLuogoNascitaPopupModificaPaziente").val(datiPaziente.LuogoNascita[0]);
            $("#txtResidenzaPopupModificaPaziente").val(datiPaziente.Residenza[0]);
            $("#txtIndirizzoPopupModificaPaziente").val(datiPaziente.Indirizzo);
            $("#txtCapPopupModificaPaziente").val(datiPaziente.CAP);
            $("#txtCodiceFiscalePopupModificaPaziente").val(datiPaziente.CodFisc);
            $("#txtTelefonoPopupModificaPaziente").val(datiPaziente.Telefono1);
            $("#txtTelefono2PopupModificaPaziente").val(datiPaziente.Telefono2);
            $("#txtProvenienzaPopupModificaPaziente").val(datiPaziente.MedicoProvenienza);
            $("#txtOsservazioniPopupModificaPaziente").val(datiPaziente.Anamnesi);
        },
        error: function(){
            alert("Errore");
        }
    });
}

//aggiorna i dati del paziente dopo una modifica
function aggiornaPaziente(){
    //if(!checkfieldsModifiche()){
        //alert("Alcuni campi obbligatori non sono stati compilati correttamente.");
    //}else{
        var id = $("#idPersonaModifiche").val();
        var nome = $("#txtNomePopupModificaPaziente").val();
        var cognome = $("#txtCognomePopupModificaPaziente").val();
        var luogoNascita = $("#txtLuogoNascitaPopupModificaPaziente").val();
        var dataNascita = giraDataDb($("#txtDataNascitaPopupModificaPaziente").val());
        var residenza = $("#txtResidenzaPopupModificaPaziente").val();
        var indirizzo = $("#txtIndirizzoPopupModificaPaziente").val();
        var cap = $("#txtCapPopupModificaPaziente").val();
        var telefono1 = $("#txtTelefonoPopupModificaPaziente").val();
        var telefono2 = $("#txtTelefono2PopupModificaPaziente").val();
        var codfisc = $("#txtCodiceFiscalePopupModificaPaziente").val();
        var motivo = $("#txtMotivoPopupModificaPaziente").val();
        var osservazioni = $("#txtOsservazioniPopupModificaPaziente").val();
        var provenienza = $("#txtProvenienzaPopupModificaPaziente").val();
        luogoNascita = luogoNascita.split(", ")[1];
        residenza = residenza.split(", ")[1];
        console.log(dataNascita);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "aggiornaAnagraficaUpdate", id:id, nome:nome, cognome:cognome, dataNascita:dataNascita, luogoNascita:luogoNascita, 
                medicoProv:provenienza, residenza:residenza, indirizzo:indirizzo, cap:cap, telefono1:telefono1, telefono2:telefono2,
                motivo:motivo, anamnesi:osservazioni, codFisc:codfisc},
        success: function(response) {
            console.log(response);
            alert("Informazioni paziente aggiornate!");
            caricaAnagrafica();
        },
        error: function(){
            alert("Errore");
        }
    });
//}
}

//mette l' anamnesi scritta sul db in un div
function visualizzaAnamnesi() {
    var id = $("#idPersonaModifiche").val();
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaAnamnesi", id:id},
        success: function(response) {
        	if(response){
                $("#divAnamnesi").html(response);
            }
        },
        error: function(){
        	alert("Errore");
        }
    });
}

//visualizza i documenti relativi ad un utente
function visualizzaDocumenti() {
    var id = $("#idPersonaModifiche").val();
    console.log(id);
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaDocumenti", id:id},
        success: function(response) {
            console.log(response);
        	var documenti = JSON.parse (response);
            var riga = "";
            for (var a = 0; a < documenti.length; a ++)
            {
                riga += "<tr><td>" + 
                    giraDataUmano(documenti[a].Data) + "</td><td>" +
                    documenti[a].Descrizione + "</td><td>" +
                    '<button class="btn btn-danger" onclick="mostraDocumento(' + documenti[a].ID + ');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>"; 
                console.log(riga);
            }
            if(response != 1){
                $("#tblDocumentiPazienteBody").html(riga);
            }else{
                $("#divDocumentiPaziente").html("Non è presente nessun intervento passato.");
             }
        },
        error: function(){
        	alert("Errore");
        }
    });
}

/*Metodo che stampa l'immagine creandone il tag e mettendolo da qualche parte*/
function mostraDocumento(id){
    
}

//genera il codice app se non ne ha unio
//stampa quello già presente se ne ha uno
//dice che ha un email se ha già fatto il primo accesso all' app
function generaCodice() {
    var id = $("#idPersonaModifiche").val();
	var codice = Math.floor(Math.random() * 1000000) + 1;
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inserisciCodApp", codice:codice, id:id},
        success: function(response) {
        	if(response == 0) {
                $("#lblCodice").html(codice);
            }else if(response == -1) {        
                alert("C'è stato un problema al server...");       
            }else if(response == -2) {        
                $("#lblCodice").html("Questo utente è già registrato con una mail.");
            }else{
                $("#lblCodice").html("Il codice già registrato è: " + response);
            }
        },
        error: function(){
        	alert("Errore");
        }
    });
}

//gestione del sidenav relativo al paziente
function mostraSituazionePaziente(i, cognome, nome) {
    svuotaCampiSituazionePaziente();
    if(document.getElementById("situazionePaziente").style.width == "500px"){
        nascondiSituazionePaziente();
    }else{
        $("#idPersonaSituazionePaziente").val(i);
        $("#lblCognomeNomeSituazionePaziente").html(cognome + " " + nome);
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "caricaUltimoInterventoAnagrafica", id:i},
            success: function(response) {
                console.log(response);
                if(response != 1){
                    var dati = JSON.parse (response);
                    $("#situazionePazienteUltimaVolta").html(dati.Descrizione);
                }else{
                    $("#situazionePazienteUltimaVolta").html("Non è presente nessun intervento passato.");
                }
            },
            error: function(){
                alert("Errore");
            }
        });

    	document.getElementById("situazionePaziente").style.width = "500px";
	}
}

//nasconde il sidenav con l'ultimo intervento e le osservazioni
function nascondiSituazionePaziente() {
	svuotaCampiSituazionePaziente();
	document.getElementById ("chkPagato").checked = false;
    document.getElementById("situazionePaziente").style.width = "0";
}

//visualizza il sidenav con i bottoni
function mostraModifiche(i, cognome, nome) {
    $("#idPersonaModifiche").val(i);
    $("#lblCognomeNomeModifiche").html(cognome + " " + nome);
    document.getElementById("modifiche").style.width = "500px";
    document.getElementById("modifiche").style.marginTop = "55px";
}

//nasconde il sidenav con i bottoni
function nascondiModifiche() {
    document.getElementById("modifiche").style.width = "0";
}

//salva importo e osservazioni di cosa è stato fatto oggi
function salvaIntervento(){
    var descrizione = $("#txtSituazionePazienteOggi").val();
    var importo = $("#txtImportoSituazionePaziente").val();
    if(checkfieldsIntervento(descrizione, importo)){
        alert("Alcuni campi non sono stati compilati correttamente");
    }else{
        var pagato = $("#chkPagato").is(':checked');
        var id = $("#idPersonaSituazionePaziente").val();
        var oggi = dataDiOggi();
    
        if(pagato) // se la checkbox è checkata o no
            $('#popupStampaRicevuta').modal('show');
        else
            ricevutaAnagrafica(0);
    }
}

function ricevutaAnagrafica(pagato){
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inserisciPagamentoDesc", id:id, importo:importo, pagato:pagato, descrizione:descrizione, 
                data:oggi},
        success: function(response) {
            if(response){
                alert("Intervento registrato!");
                nascondiSituazionePaziente();
            }else{
                alert("L'utente ha già un intervento registrato nella data odierna...");
                nascondiSituazionePaziente();
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

/*Restituisce true se qualcosa non è statop completato correttamente*/
function checkfieldsIntervento(descrizione, importo){
    var regexImporto = new RegExp("^[0-9]+$");
    var ret = false;

    if(descrizione == ""){
        $("#txtSituazionePazienteOggi").css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(!regexImporto.test(importo)){
        $("#txtImportoSituazionePaziente").css("background-color", "rgb(255,147,147)");
        ret = true;
    }

    return ret;
}

function svuotaCampiSituazionePaziente(){
    svuotaOggi();
    svuotaImporto();
    $("#txtSituazionePazienteOggi").val("");
    $("#txtImportoSituazionePaziente").val("");
}

//svuota il campo nome del popup aggiungi nuovo
function svuotaOggi(){
    document.getElementById("txtSituazionePazienteOggi").style.backgroundColor = "white";
}

//svuota il campo nome del popup aggiungi nuovo
function svuotaImporto(){
    document.getElementById("txtImportoSituazionePaziente").style.backgroundColor = "white";
}

/*
* visualizza un popup con una tabella con tutti gli interventi effettuati e la relativa data
* nel caso non ci siano stati ancora interventi lo comunica
*/
function visualizzaStoricoInterventi(){
    var id = $("#idPersonaModifiche").val();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaStoricoInterventi", id:id},
        success: function(response) {
            var interventi = JSON.parse (response);
            var riga = "";
            for (var a = 0; a < interventi.length; a ++)
            {
                riga += "<tr><td>" + giraDataUmano(interventi[a].Data) + 
                "</td><td>" + interventi[a].Descrizione + 
                "</td></tr>";
            }
            $("#divStoricoInterventiPaziente").show();
            $("#divNessunIntervento").hide();
            $("#tblStoricoInterventiPazienteBody").html(riga);
            if(riga == ""){
                $("#divStoricoInterventiPaziente").hide();
                $("#divNessunIntervento").show();
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

//visualizza la contabilità di una persona
function visualizzaContabilita(){
    var id = $("#idPersonaModifiche").val();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaContabilitaPersona", id:id},
        success: function(response){
            console.log(response);
            if(response != "-1"){
                var contabilita = JSON.parse (response);
                var riga = "";
                for (var a = 0; a < contabilita.length; a ++)
                {
                    if(contabilita[a].Pagato == 1){
                        riga += "<tr class=\"success\">";
                    }else{
                        riga += "<tr class=\"danger\">";
                    }
                    riga += "<td>" + 
                        contabilita[a].AnaID +
                        "</td><td>" + giraDataUmano(contabilita[a].Data) + 
                        "</td><td>" + contabilita[a].Pagamento + 
                        " €</td></tr>";       
                }
                var nome = contabilita[0].Nome;
                var cognome = contabilita[0].Cognome;
                $("#nomeCognomePaziente").html(cognome + " " + nome);
                $("#headerContabilita").show();
                $("#divContabilitaPaziente").show();
                $("#divNessunInterventoContabilita").hide();
                $("#tblContabilitaPazienteBody").html(riga);
            }else{
                $("#headerContabilita").hide();
                $("#divContabilitaPaziente").hide();
                $("#divNessunInterventoContabilita").show();
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

//assegna eservcizi ad un paziente
function assegnaEsercizi(){
}

//aggiunge un nuovo paziente una volta che i campi sono tutti compilati
function aggiungiNuovoPaziente(){
    if(!checkfields()){
        alert("Alcuni campi obbligatori non sono stati compilati correttamente.");
    }else{
        var nome = document.getElementById ("txtNomePopupAggiungiNuovo").value;
        var cognome = document.getElementById ("txtCognomePopupAggiungiNuovo").value;
        var luogoNascita = document.getElementById ("txtLuogoNascitaPopupAggiungiNuovo").value;
        var dataNascita = document.getElementById ("txtDataNascitaPopupAggiungiNuovo").value;
        var residenza = document.getElementById ("txtResidenzaPopupAggiungiNuovo").value;
        var indirizzo = document.getElementById ("txtIndirizzoPopupAggiungiNuovo").value;
        var cap = document.getElementById ("txtCapPopupAggiungiNuovo").value;
        var telefono1 = document.getElementById ("txtTelefonoPopupAggiungiNuovo").value;
        var telefono2 = document.getElementById ("txtTelefono2PopupAggiungiNuovo").value;
        var codfisc = document.getElementById ("txtCodiceFiscalePopupAggiungiNuovo").value;
        var motivo = document.getElementById ("txtMotivoPopupAggiungiNuovo").value;
        var osservazioni = document.getElementById ("txtOsservazioniPopupAggiungiNuovo").value;
        var provenienza = document.getElementById ("txtProvenienzaPopupAggiungiNuovo").value;

        dataNascitaFP = dataNascita;
        dataNascita = giraDataDb(dataNascita);
        luogoNascitaFP = luogoNascita.split(", ")[0];
        residenzaFP = residenza.split(", ")[0];
        luogoNascita = luogoNascita.split(", ")[1];
        residenza = residenza.split(", ")[1];

        var foglioPrivacy;

        $.ajax({  
            type: "GET", 
            url: "../samples/sampleFoglioPrivacy.html", 
            success: function(response) {
                foglioPrivacy = response;

                $.ajax({  
                    type: "POST", 
                    url: "./serverlogic.php",
                    data: {azione: "inserisciNuovoPaziente", nome:nome, cognome:cognome, dataNascita:dataNascita,
                            dataNascitaFP:dataNascitaFP, luogoNascita:luogoNascita, luogoNascitaFP:luogoNascitaFP, 
                            medicoProv:provenienza, residenza:residenza, residenzaFP:residenzaFP, 
                            indirizzo:indirizzo, cap:cap, telefono1:telefono1, telefono2:telefono2,
                            motivo:motivo, anamnesi:osservazioni, codFisc:codfisc, foglioPrivacy:foglioPrivacy},
                    success: function(foglioPrivacy) {

                        $.ajax({  
                            type: "POST", 
                            url: "./serverlogic.php",
                            data: {azione: "foglioToHTML", foglioPrivacy:foglioPrivacy},
                            success: function(response) {
                                $('#idPersonaFP').val(response);
                                $('#popupAggiungiNuovo').modal('hide');
                                $('#popupStampaFoglioPrivacy').modal('show');
                            },
                            error: function(){
                                alert("Errore");
                            }
                        });

                        cercaPersona();
                    },
                    error: function(){
                        alert("Errore");
                    }
                });
            },
            error: function(){
                alert("Errore");
            }
        });

        

    
    }
}

/*Ritorna true se è andato tutto bene e serve per i campi di aggiungi nuovo paziente*/
function checkfields(){
    var ret = true;
    var txtNome = $("#txtNomePopupAggiungiNuovo");
    var txtCognome = $("#txtCognomePopupAggiungiNuovo");
    var txtLuogoNascita = $("#txtLuogoNascitaPopupAggiungiNuovo");
    var txtDataNascita = $("#txtDataNascitaPopupAggiungiNuovo");
    var txtResidenza = $("#txtResidenzaPopupAggiungiNuovo");
    var txtIndirizzo = $("#txtIndirizzoPopupAggiungiNuovo");
    var txtCap = $("#txtCapPopupAggiungiNuovo");
    var txtCodFisc = $("#txtCodiceFiscalePopupAggiungiNuovo");
    var txtTelefono = $("#txtTelefonoPopupAggiungiNuovo");
    var txtMotivo = $("#txtMotivoPopupAggiungiNuovo");

    var regexCap = new RegExp("^[0-9]{4}$");
    /*Da testare*/
    //var regexNome = new RegExp("^[A-Za-zàèéìòùç]+[\ \,\.\'\-]{0-1}");
    //var regexCodiceFiscale = new RegExp("/^(?:(?:[B-DF-HJ-NP-TV-Z]|[AEIOU])[AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[1256LMRS][\dLMNP-V])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i");
    //var regexTelefono = new RegExp("[\+|00]*[0-9]{1}*[0-9]+");

    if(txtNome.val() == ""){
        txtNome.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtCognome.val() == ""){
        txtCognome.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtLuogoNascita.val() == ""){
        txtLuogoNascita.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtDataNascita.val() == ""){
        txtDataNascita.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtResidenza.val() == ""){
        txtResidenza.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtIndirizzo.val() == ""){
        txtIndirizzo.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtCap.val() == "" || regexCap.test(txtCap.val())){
        txtCap.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtCodFisc.val() == ""){
        txtCodFisc.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtTelefono.val() == ""){
        txtTelefono.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtMotivo.val() == ""){
        txtMotivo.css("background-color", "rgb(255,147,147)");
        ret = false;
    }

    return ret;
}

//inizializza il campo hidden nel popup che memorizza un documento relativo ad una persina
function nuovoDocumento(){
    var id = $("#idPersonaModifiche").val();
    $("#idPersonaNuovoDocumento").val(id);
}




//fa l'upload del documento in una cartella della webapp
function inserisciNuovoFile(){
    var ok = false;
    var id = $("#idPersonaNuovoDocumento").val();

    var image = document.getElementById("manualFileNuovoDocumento");
    if (image.files.length > 0) {
        var dim = image.files.item(0).dim;
        //Se la dimensione è minore di 10 Mb
        if(dim<10000000){
            ok = true;
        }
    }
    
    if(ok){
        //Prendo il nome del file selezionandolo dal percors completo
        var percorso = image.value;
        if (percorso) {
            var indicePartenza = (percorso.indexOf('\\') >= 0 ? percorso.lastIndexOf('\\') : percorso.lastIndexOf('/'));
            var nomeFile = percorso.substring(indicePartenza);
            if (nomeFile.indexOf('\\') === 0 || nomeFile.indexOf('/') === 0) {
                nomeFile = nomeFile.substring(1);
            }
        }
        //seleziono l' estensione
        var estensione = nomeFile.split('.').pop();
        estensione = estensione.toLowerCase();
    
        //Ad upload .php fai restituire il path di dove è salvato il file --> come lo ricevo????
        if(estensione == "jpg" || estensione == "jpeg" || estensione == "pdf" || estensione == "png"){
            document.getElementById("frmFile").submit();
            var descrizione = $("#txtDescrizioneDocumento").val();
            var data = dataDiOggi();

            //da testare
            var path = "imgs/docs/" + id + "/" + nomeFile;
            console.log(path);
            console.log(data);
            console.log(descrizione);

            /*$.ajax({  
                type: "POST", 
                url: "./serverlogic.php",
                data: {azione: "inserisciDocumento",id:id,data:data,path:path,descrizione:descrizione},
                success: function(response) {
                    alert("File caricato con successo!");
                },
                error: function(){
                    alert("Errore");
                }
            });*/
        }
    }
}













/*-------------------Funzioni relative a contabilità-------------------*/



/*
* Funzione che carica la tabella contabilità all' interno del div che costituisce il body della homepage.
*/
function caricaContabilita(nomePersona = ""){
    $("#txtRicercaAnagrafica").val("");
	if(document.getElementById("situazionePaziente") != null){
	 	nascondiSituazionePaziente();
	}
	if(document.getElementById("pagamento") != null){
	 	nascondiPagamento();
	}
	$.ajax({  
        type: "GET", 
        url: "../Contabilita/contabilita.fisio", 
        success: function(response) {
			var i;
			$("#container").html(response);          
        },
        error: function(){
        	alert("Errore");
        }
    });
    anagraficaShown = false;
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "cercaContabilita", nomePersona:nomePersona},
        success: function(response) {
        	var pagamenti = JSON.parse (response);
			var riga = "";
			for (var a = 0; a < pagamenti.length; a ++)
			{
                if(pagamenti[a].Pagato == 1){
                    riga += "<tr class=\"success\">";
                }else{
                    riga += "<tr class=\"danger\">";
                }
                var anno = pagamenti[a].Data.substring(0,4);
                var mese = pagamenti[a].Data.substring(5,7);
                var giorno = pagamenti[a].Data.substring(8,10);
                riga += "<td>" + pagamenti[a].AnaID +
                    "</td><td>" + pagamenti[a].Nome + 
                    "</td><td>" + pagamenti[a].Cognome + 
                    "</td><td>" + giraDataUmano(pagamenti[a].Data) + 
                    "</td><td>" + pagamenti[a].Pagamento + " €" +
                    "</td><td>" + '<button class="btn btn-danger" onclick="mostraPagamento(' + pagamenti [a].AnaID + ',' + anno + ',' + mese + ',' + giorno +');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>";			
            }

			$("#tblContabilitaBody").html(riga);
        },
        error: function(){
        	alert("Errore");
        }
    });
}

/*
* Richiama una funzione ajax e riempie il sidenav contenente le informazioni riguardo un pagamento specifico
*/
function mostraPagamento(i,anno, mese, giorno) {
    document.getElementById("sidePagamento").style.width = "500px";
    document.getElementById("sidePagamento").style.marginTop = "55px";
    if (mese<10){
        mese = "0" + mese;
    }
    if (giorno<10){
        giorno = "0" + giorno;
    }
    var data = anno + "-" + mese + "-" + giorno;
    $("#idPagamento").val(i);
    $("#dataPagamento").val(data);
    console.log(data);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaUltimoIntervento",id:i,data:data},
        success: function(response) {
            console.log(response);
            var pagamento = JSON.parse (response);

            $("#descrizioneIntervento").html(pagamento.Descrizione);
            $("#lblNomeCognome").html(pagamento.Cognome + " " + pagamento.Nome);
            $("#lblDataIntervento").html(giraDataUmano(pagamento.Data));
            $("#txtImportoPagamento").val(pagamento.Pagamento);

            if(pagamento.Pagato == 1){
                document.getElementById("btnPaga").disabled = true;
                document.getElementById("btnAggiornaPagamento").disabled = true;
            }else{
                document.getElementById("btnPaga").disabled = false;
                document.getElementById("btnAggiornaPagamento").disabled = false;
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

/*Fa scomparire il sidenav contente le informazioni del pagamento*/
function nascondiPagamento() {
	$("#txtImportoPagamento").val("");
    document.getElementById("sidePagamento").style.width = "0";
}

/*Aggiorna l' importo di un pagamento*/
function aggiornaPagamento(){
    var id = $("#idPagamento").val();
    var data = $("#dataPagamento").val();
    var importo = $("#txtImportoPagamento").val();

    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "aggiornaPagamento", id:id, dataIntervento:data, importo:importo},
        success: function(response) {
            caricaContabilita();
        },
        error: function(){
            alert("Errore");
        }
    });
}

function controlloPiuPagamenti(){
    var id = $("#idPagamento").val();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "controlloPiuPagamenti", id:id},
        success: function(response) {
            if(response != 0){
                popupTuttiInterventiCosto();
            }else{
                confermaPagamento();
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

//mettere a posto serverlogic
function popupTuttiInterventiCosto(){
    var id = $("#idPagamento").val();
    var data = $("#lblDataIntervento").html();
    data = giraDataDb(data);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "selezionaImportoTuttiInterventiPassati", id:id, data:data},
        success: function(response) {
            var importo = parseInt(response);
            var importoAgg = importo + parseInt($("#txtImportoPagamento").val());
            $('#costoComplessivo').html(importoAgg);
            $('#popupCostoTuttiInterventi').modal('show');
        },
        error: function(){
            alert("Errore");
        }
    });
}

/*IOmposta il pagamento singolo nell' hidden per la ricevuta e stamp'a il popup se si vuiole stampare la ric*/
function confermaPagamento(){
    $('#pagamentoSingolo').val("0");
    $('#popupStampaRicevuta').modal('show');
}

/*IOmposta il pagamento multiplo nell' hidden per la ricevuta e stamp'a il popup se si vuiole stampare la ric*/
function pagaTuttiInterventiPassati(){
    $('#pagamentoSingolo').val("1");
    $('#popupStampaRicevuta').modal('show');
}

// funzione che aggiorna il pagamento nel db a seconda che sia singolo o multiplo 
function aggiornaImporti(){
    var pagamentoMultiplo = $("#pagamentoSingolo").val();
    var id = $("#idPagamento").val();

    if(pagamentoMultiplo != 0){
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "aggiornaPagatoFatturaMultipla", id:id},
            success: function(response) {
                caricaContabilita();
                if(response){
                    alert("Pagamento confermato!");
                }
            },
            error: function(){
                alert("Errore");
            }
        });
    }else{
        var data = $("#dataPagamento").val();
        var importo = $("#txtImportoPagamento").val();
        aggiornaPagamento();
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "aggiornaPagatoFatturaSingolo", id:id, importo:importo, dataIntervento:data},
            success: function(response) {
                caricaContabilita();
                if(response){
                    alert("Pagamento confermato!");
                }
            },
            error: function(){
                alert("Errore");
            }
        });
    }
}

//Funzione che stampa la ricevuta con gli importi aggiornati
function stampaRicevuta(){
    aggiornaImporti();

    //stampa ricevuta

    
}
