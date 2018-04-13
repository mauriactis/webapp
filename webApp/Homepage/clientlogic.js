/*Variabile globale*/
var anagraficaShown = true;





/*-------------------Funzioni in comune-------------------*/




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
        }else{
            if(document.getElementById("sidePagamento").style.width == "500px"){
                nascondiPagamento();
            }
        }
    });
    $("#txtResidenzaPopupAggiungiNuovo").keypress(function(){
        caricaResidenza();
    });
    $("#txtResidenzaPopupAggiungiNuovo").click(function(){
        caricaResidenza();
    });
    $("#txtLuogoNascitaPopupAggiungiNuovo").keypress(function(){
        caricaLuogoNascita();
    });
    $("#txtLuogoNascitaPopupAggiungiNuovo").click(function(){
        caricaLuogoNascita();
    });
});

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

	 if($("#campiAggiuntiviPopupAggiungiNuovo").is(":visible")){
	 	changeArrow();
	 }
}

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

function redimContainer(){
	document.getElementById("container").style.marginRight = "0";
}

function giraDataUmano(date){
	return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
}

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

function initPopupAggiungiNuovo(){
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

function caricaResidenza(){
    var ricerca = $('#txtResidenzaPopupAggiungiNuovo').html();
    caricaComuni(ricerca, 0);
}

function caricaLuogoNascita(){
    var ricerca = $('#txtLuogoNascitaPopupAggiungiNuovo').html();
    caricaComuni(ricerca, 1);
}

function caricaComuni(ricerca, luogoNascita){
    console.log(ricerca);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaComuni", ricerca:ricerca},
        success: function(response) {
            console.log(response);
            var comuni = JSON.parse (response);
            var riga= "";
            for (var a = 0; a < comuni.length; a ++){
                riga += "<option value='"+ comuni[a].ID + "'>" + comuni[a].Comune + "</option>";
            }
            if(luogoNascita){
                    $("#txtLuogoNascitaPopupAggiungiNuovo").html(riga);
                }else{
                    $("#txtResidenzaPopupAggiungiNuovo").html(riga);
                }
        },
        error: function(){
            alert("Errore");
        }
    });
}

function stampaFoglioPrivacy(){
    var doc = new jsPDF();
    /*Immagine salvata in codifica base64, salva l' immagine in formato stringa*/
    var imgData = '';
    //Coordinate dell' immagine sul pdf(in questo caso in alto a sinistra), gli altri 2 numeri sono le dimensioni dell' immagine in mm
    doc.addImage(imgData, 'JPEG',0,0,210,297);
    
    var nome = "sos";
    var cognome = "sos";
    var luogoNascita = "sos";
    var dataNascita = "sos";
    var residenza;
    var indirizzo; 
    var cap;
    var telefono1;
    var telefono2;
    var codfisc;
    var motivo;
    var osservazioni;
    var provenienza;
    
    doc.setFontSize(20);
    doc.setTextColor(92, 76, 76);
    
    /*Seleziono le coordinate e dico cosa posizionare*/
    doc.text(23, 81, nome);
    doc.text(23, 122, cognome);
    doc.text(23, 162, luogoNascita);
    doc.text(23, 202, dataNascita);

    /*Salvo il pdf*/
    doc.save('FoglioPrivacy' + cognome + nome + dataNascita + '.pdf');
}





/*-------------------Funzioni relative ad anagrafica-------------------*/




function caricaAnagrafica(){
    $("#txtRicercaAnagrafica").val("");
    anagraficaShown = true;
    cercaPersona();
}


function cercaPersona ()
{
    var ricerca = document.getElementById ("txtRicercaAnagrafica").value;
    /*Se è vera è mostrata anagrafica, altrimenti è mostrata contabilità*/
    if(anagraficaShown){
        if(document.getElementById("situazionePaziente") != null){
            nascondiSituazionePaziente();
        }
        $.ajax({  
            type: "GET", 
            url: "../Anagrafica/index.html", 
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
                                '<button class="btn btn-primary" onclick="mostraModifiche(' + persone [a].ID + ');"><span class="glyphicon glyphicon-th"></span></button>' + "</td><td>" +
                                '<button class="btn btn-danger" onclick="mostraSituazionePaziente(' + persone [a].ID + ');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>";
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

function initPopupModifica(){
    var id = $("#idPersonaModifiche").val();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "aggiornaAnagraficaRequest", id:id},
        success: function(response) {
            var datiPaziente = JSON.parse (response);
            var riga = "";

            $.datepicker.setDefaults($.datepicker.regional['it']); 
            $('#txtDataNascitaPopupModificaPaziente').datepicker({ maxDate: new Date, minDate: new Date(1850,04,24) });

            $("#txtNomePopupModificaPaziente").val(datiPaziente[0].Nome);
            $("#txtCognomePopupModificaPaziente").val(datiPaziente[0].Cognome);
            $("#txtDataNascitaPopupModificaPaziente").val(giraDataUmano(datiPaziente[0].DataNascita));
            $("#txtLuogoNascitaPopupModificaPaziente").val(datiPaziente[0].LuogoNascita);
            $("#txtMotivoPopupModificaPaziente").val(datiPaziente[0].Motivo);
            $("#txtResidenzaPopupModificaPaziente").val(datiPaziente[0].Residenza);
            $("#txtIndirizzoPopupModificaPaziente").val(datiPaziente[0].Indirizzo);
            $("#txtCapPopupModificaPaziente").val(datiPaziente[0].CAP);
            $("#txtCodiceFiscalePopupModificaPaziente").val(datiPaziente[0].CodFisc);
            $("#txtTelefonoPopupModificaPaziente").val(datiPaziente[0].Telefono1);
            $("#txtTelefono2PopupModificaPaziente").val(datiPaziente[0].Telefono2);
            $("#txtProvenienzaPopupModificaPaziente").val(datiPaziente[0].MedicoProvenienza);
            $("#txtOsservazioniPopupModificaPaziente").val(datiPaziente[0].Anamnesi);
        },
        error: function(){
            alert("Errore");
        }
    });
}

//TO DO MODO PER SAPERE SE HA MODIFICATO DEI QUALCOSAA
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

    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "aggiornaAnagraficaUpdate", id:id, nome:nome, cognome:cognome, dataNascita:dataNascita, luogoNascita:luogoNascita, 
                medicoProv:provenienza, residenza:residenza, indirizzo:indirizzo, cap:cap, telefono1:telefono1, telefono2:telefono2,
                motivo:motivo, anamnesi:osservazioni, codFisc:codfisc},
        success: function(response) {
            alert("Informazioni paziente aggiornate!");
            caricaAnagrafica();
        },
        error: function(){
            alert("Errore");
        }
    });
//}
}

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

function visualizzaDocumenti(id) {
    //Mostra documento:
    //https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded/4459419#4459419
    //var id = $("#idPersonaModifiche").val();
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaDocumenti", id:id},
        success: function(response) {
        	var documenti = JSON.parse (response);
            var riga = "";
            for (var a = 0; a < documenti.length; a ++)
            {
                riga += "<tr><td>" + 
                    documenti[a].Data + "</td><td>" +
                    documenti[a].Descrizione + "</td><td>" +
                    '<button class="btn btn-danger" onclick="mostraDocumento(' + documenti[a].ID + ');"><span class="glyphicon glyphicon-user"></span></button>' + "</td></tr>"; 
            }
            if(response != 1){
                $("#tblDocumentiPazienteBody").html(response);
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


function generaCodice() {
    var id = $("#idPersonaModifiche").val();
	var codice = Math.floor(Math.random() * 1000000) + 1;
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inserisciCodApp", codice:codice, id:id},
        success: function(response) {
        	if(response == 0) {        
                alert("Utente inserito con successo!");
                $("#lblCodice").html(response);
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

function mostraSituazionePaziente(i) {
    if(document.getElementById("situazionePaziente").style.width == "500px"){
        nascondiSituazionePaziente();
    }else{
        $("#idPersonaSituazionePaziente").val(i);
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "caricaUltimoIntervento", id:i},
            success: function(response) {
                console.log(response);
                if(response != 1){
                    var dati = JSON.parse (response);
                    console.log(dati.Descrizione);
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
    	document.getElementById("situazionePaziente").style.marginTop = "55px";
	}
}

function nascondiSituazionePaziente() {
	$("#txtSituazionePazienteOggi").val("");
	$("#txtImportoSituazionePaziente").val("");
	document.getElementById ("chkPagato").checked = false;
    document.getElementById("situazionePaziente").style.width = "0";
}


function mostraModifiche(i) {
    $("#idPersonaModifiche").val(i);
    document.getElementById("modifiche").style.width = "500px";
    document.getElementById("modifiche").style.marginTop = "55px";
}

function nascondiModifiche() {
    document.getElementById("modifiche").style.width = "0";
}

function checkButton(){
	if(document.getElementById ("chkPagato").checked == true){
		document.getElementById ("chkPagato").checked = false;
	}else{
		document.getElementById ("chkPagato").checked = true;
	}
}

function salvaIntervento(){
    var descrizione = $("#txtSituazionePazienteOggi").val();
    var importo = $("#txtImportoSituazionePaziente").val();
    if(checkfieldsIntervento(descrizione, importo)){
        alert("Alcuni campi non sono stati compilati correttamente");
    }else{
        var pagato = $("#chkPagato").val();
        var id = $("#idPersonaSituazionePaziente").val();
        var oggi = dataDiOggi();
    
        if(pagato=="on") // se la checkbox è checkata o no
            pagato=1;
        else
            pagato=0;
    
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "inserisciPagamentoDesc", id:id, importo:importo, pagato:pagato, descrizione:descrizione, 
                    data:oggi},
            success: function(response) {
                alert("Intervento registrato!");
            },
            error: function(){
                alert("Errore");
            }
        });
    }
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

function stampaRicevuta(){









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
            $("#tblStoricoInterventiPazienteBody").html(riga);
            if(riga == ""){
                $("#divStoricoInterventiPaziente").html("Il paziente non ha nessun intervento registrato!");
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

function visualizzaContabilita(){
    var id = $("#idPersonaModifiche").val();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaContabilitaPersona", id:id},
        success: function(response) {
            console.log(response);
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
                    "</td><td>" + contabilita[a].Nome + 
                    "</td><td>" + contabilita[a].Cognome + 
                    "</td><td>" + giraDataUmano(contabilita[a].Data) + 
                    "</td><td>" + contabilita[a].Pagamento + 
                    " €</td></tr>";       
            }
            $("#tblContabilitaPazienteBody").html(riga);
            if(riga == ""){
                $("#divContabilitaPaziente").html("Il paziente non ha nessun pagamento registrato!");
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

function assegnaEsercizi(){
}

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

        dataNascita = giraDataDb(dataNascita);
        $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inserisciNuovoPaziente", nome:nome, cognome:cognome, dataNascita:dataNascita, luogoNascita:luogoNascita, 
                medicoProv:provenienza, residenza:residenza, indirizzo:indirizzo, cap:cap, telefono1:telefono1, telefono2:telefono2,
                motivo:motivo, anamnesi:osservazioni, codFisc:codfisc},
        success: function(response) {
            alert("Nuovo paziente inserito con successo!");
            cercaPersona();
            $('#popupStampaFoglioPrivacy').modal('show');
        },
        error: function(){
            alert("Errore");
        }
    });
    }
}

/*Ritorna true se è andato tutto bene*/
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

    /*if(txtNome.val() == ""){
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
    }*/

    return ret;
}

function nuovoDocumento(){
    $("#idPersonaNuovoDocumento").val($("#idPersonaSituazionePaziente").val());
}




/*Chidi a berny*/
function inserisciNuovoFile(){
    var id = $("#idPersonaNuovoDocumento").val();
    /*Contiene l' indirizzo del file*/
    var file = $("#manualFileNuovoDocumento").val();



    /*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inserisciNuovoFile", id:id, file:file},
        success: function(response) {

        },
        error: function(){
            alert("Errore");
        }
    });*/
}













/*-------------------Funzioni relative a contabilità-------------------*/



/*
* Funzione che carica la tabella contabilità all' interno del div che costituisce il body della homepage.
*/
function caricaContabilita(nomePersona){
    $("#txtRicercaAnagrafica").val("");
	if(document.getElementById("situazionePaziente") != null){
	 	nascondiSituazionePaziente();
	}
	if(document.getElementById("pagamento") != null){
	 	nascondiPagamento();
	}
	$.ajax({  
        type: "GET", 
        url: "../Contabilita/index.html", 
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
                console.log(anno);
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
    data = anno + "-" + mese + "-" + giorno;
    $("#idPagamento").val(i);
    console.log(data);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaUltimoIntervento", id:i , data:data},
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

    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "aggiornaPagamento", id:id},
        success: function(response) {
            if(response){
                alert("Pagamento aggiornato con successo!");
            }
            caricaContabilita();
        },
        error: function(){
            alert("Errore");
        }
    });

}

/*Se un pagamento non era ancora stato pagato lo conferma*/
function confermaPagamento(){
    var idPagamento = $("#idPagamento").val();
    
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "confermaPagamento", id:id},
        success: function(response) {
            if(response){
                alert("Pagamento confermato!");
            }
            caricaContabilita();
        },
        error: function(){
            alert("Errore");
        }
    });
}