/*
anagrafica
carica nuovo
salva intervento-pagamento
cerca persona
visualizza storico interventi
*/






/*-------------------Funzioni in comune-------------------*/




$(document).ready(function(){
	cercaPersona();
});

function cancellaCampi(){
	 $("#txtNomePopupAggiungiNuovo").val("");
	 $("#txtCognomePopupAggiungiNuovo").val("");
	 $("#txtDataNascitaPopupAggiungiNuovo").val("");
	 $("#txtIndirizzoPopupAggiungiNuovo").val("");
	 $("#txtResidenzaPopupAggiungiNuovo").val("");
	 $("#txtCapPopupAggiungiNuovo").val("");
	 $("#txtLuogoNascitaPopupAggiungiNuovo").val("");
	 $("#txtTelefonoPopupAggiungiNuovo").val("");
	 $("#txtProvenienzaPopupAggiungiNuovo").val("");
	 $("#txtMotivoPopupAggiungiNuovo").val("");
	 $("#txtTelefono2PopupAggiungiNuovo").val("");
	 $("#txtCodiceFiscalePopupAggiungiNuovo").val("");
	 $("#txtOsservazioniPopupAggiungiNuovo").val("");

     document.getElementById("txtNomePopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtCognomePopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtDataNascitaPopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtIndirizzoPopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtResidenzaPopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtCapPopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtLuogoNascitaPopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtTelefonoPopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtMotivoPopupAggiungiNuovo").style.backgroundColor = "white";
     document.getElementById("txtCodiceFiscalePopupAggiungiNuovo").style.backgroundColor = "white";


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
}

function redimContainer(){
	document.getElementById("container").style.marginRight = "0";
}

function giraData(date){
	return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
}




/*-------------------Funzioni relative ad anagrafica-------------------*/




function caricaAnagrafica(){
    $("#txtRicercaAnagrafica").val("");
    cercaPersona();
}

function cercaPersona ()
{
	if(document.getElementById("pagamento") != null){
	 	nascondiPagamento();
	}
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
	var ricerca = document.getElementById ("txtRicercaAnagrafica").value;
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "cercaPersona", nomePersona:ricerca},
        success: function(response) {
        	var persone = JSON.parse (response);
			var riga = "";
			for (var a = 0; a < persone.length; a ++)
			{
				riga += "<tr onclick=\"mostraSituazionePaziente(" + persone [a].ID + ");\"><td>" + persone [a].ID + "</td><td>" + persone [a].Cognome + "</td><td>" + persone [a].Nome + "</td><td>" + giraData(persone [a].DataNascita) + "</td><td>" + persone [a].LuogoNascita + "</td><td>" + persone [a].MedicoProvenienza + "</td><td>" + persone [a].Residenza + "</td><td>" + persone [a].Indirizzo + "</td><td>" + persone [a].CAP + "</td><td>" + persone [a].Telefono1 + "</td><td>" + persone [a].Telefono2 + "</td><td>" + persone [a].Motivo + "</td><td>" + persone [a].CodFisc + "</td><td><button class=\"btn btn-danger\" onclick=\"visualizzaAnamnesi(" + persone [a].id + ");\"><span class=\"glyphicon glyphicon-file\"></span></button></td><td>" + '<button class="btn btn-danger" onclick="visualizzaDocumenti(' + persone [a].id + ');"><span class="glyphicon glyphicon-th-list"></span></button>' + "</td><td>" + '<button class="btn btn-danger" data-toggle=\"modal\" data-target=\"#popupCodicePaziente\" onclick="generaCodice(' + persone [a].id + ');"><span class="glyphicon glyphicon-qrcode"></span></button>' + "</td></tr>";
			}
			$("#tblAnagraficaBody").html(riga);
        },
        error: function(){
        	alert("Errore");
        }
    });
}

function visualizzaAnamnesi(id) {
	/*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaAnamnesi", idPersona:id},
        success: function(response) {
        	$("#lblCodice").html(response);
        },
        error: function(){
        	alert("Errore");
        }
    });*/
}

function visualizzaDocumenti(id) {
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaDocumenti", id:id},
        success: function(response) {
        	// TO DO Popup che visualizza documenti
        },
        error: function(){
        	alert("Errore");
        }
    });
}

function generaCodice(id) {
	var codice = Math.floor(Math.random() * 1000000) + 1;
	$("#lblCodice").html(codice);
	/*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaCodice", codice:codice, idPersona:id},
        success: function(response) {
        	if(!response){
        		alert("Questo utente è già registrato...");
        	}
        },
        error: function(){
        	alert("Errore");
        }
    });*/
}

function mostraSituazionePaziente(i) {
    $("#idPersona").val(i);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaUltimoIntervento", id:i},
        success: function(response) {
            $("#situazionePazienteUltimaVolta").html(response);
        },
        error: function(){
            alert("Errore");
        }
    });
	if(document.getElementById("situazionePaziente").style.width == "500px"){
	 	nascondiSituazionePaziente();
	}else{
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
    var pagato = $("#chkPagato").val();
    var today = new Date();
    var d = today.getDay();
    var m = today.getMonth();
    var y = today.getFullYear();
    if(d<10){
        d= "0" + d;
    }
    if(m<10){
        m= "0" + m;
    }


    var oggi = y + "-" + m + "-" + d;
    var id = $("#idPersona").val();



    if(pagato=="on"){
        pagato=1;
    }else{
        pagato=0;
    }


    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inserisciPagamentoDesc", id:id, importo:importo, pagato:pagato, descrizione:descrizione, 
                data:oggi},
        success: function(response) {
            console.log(response);
            alert("Intervento registrato!");
        },
        error: function(){
            alert("Errore");
        }
    });


}



function visualizzaStoricoInterventi(){
    nascondiSituazionePaziente();
}

function visualizzaContabilita(){
    nascondiSituazionePaziente();
}

function assegnaEsercizi(){
    nascondiSituazionePaziente();
}

function aggiungiNuovoPaziente(){
    if(checkfields()){
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

        $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inserisciNuovoPaziente", nome:nome, cognome:cognome, dataNascita:dataNascita, luogoNascita:luogoNascita, 
                medicoProv:provenienza, residenza:residenza, indirizzo:indirizzo, cap:cap, telefono1:telefono1, telefono2:telefono2,
                motivo:motivo, anamnesi:osservazioni, codFisc:codfisc},
        success: function(response) {
            console.log(response);
            alert("Nuovo paziente inserito con successo!");
        },
        error: function(){
            alert("Errore");
        }
    });
    }
}

/*Ritorna false se è andato tutto bene*/
function checkfields(){
    var ret = false;
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

    //var regexNome = '/w3Schools/i';

    if(txtNome.val() == ""){
        txtNome.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtCognome.val() == ""){
        txtCognome.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtLuogoNascita.val() == ""){
        txtLuogoNascita.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtDataNascita.val() == ""){
        txtDataNascita.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtResidenza.val() == ""){
        txtResidenza.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtIndirizzo.val() == ""){
        txtIndirizzo.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtCap.val() == ""){
        txtCap.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtCodFisc.val() == ""){
        txtCodFisc.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtTelefono.val() == ""){
        txtTelefono.css("background-color", "rgb(255,147,147)");
        ret = true;
    }
    if(txtMotivo.val() == ""){
        txtMotivo.css("background-color", "rgb(255,147,147)");
        ret = true;
    }

    return ret;
}


/*-------------------Funzioni relative a contabilità-------------------*/




function caricaContabilita(){
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
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "cercaContabilita", nomePersona:""},
        success: function(response) {
        	var persone = JSON.parse (response);
			var riga = "";
			for (var a = 0; a < persone.length; a ++)
			{
				riga += "<tr onclick=\"mostraPagamento(" +  persone[a].ID + ");\"> <td>" + persone[a].ID + "</td> <td>" + persone[a].ID + "</td><td>" + persone[a].ID + "</td><td>" + persone[a].ID + "&euro;</td></tr>";
			}
			$("#tblContabilitaBody").html(riga);
        },
        error: function(){
        	alert("Errore");
        }
    });
}

function mostraPagamento(i) {
	if(document.getElementById("pagamento").style.width == "500px"){
	 	nascondiPagamento();
	}else{
		console.log(i);
    	document.getElementById("pagamento").style.width = "500px";
    	document.getElementById("pagamento").style.marginTop = "55px";
	}
}

function nascondiPagamento() {
	$("#txtImportoPagamento").val("");
    document.getElementById("pagamento").style.width = "0";
}