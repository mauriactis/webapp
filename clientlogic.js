



/*-------------------Funzioni in comune-------------------*/




$(document).ready(function(){
	cercaPersona();
});

function inserisciNuovoPaziente(){
    if(checkFields()){

        var nome = $("#txtNomePopupAggiungiNuovo").val();
        var cognome = $("#txtCognomePopupAggiungiNuovo").val();
        var dataNascita = $("#txtDataNascitaPopupAggiungiNuovo").val();
        var indirizzo = $("#txtIndirizzoPopupAggiungiNuovo").val();
        var residenza = $("#txtResidenzaPopupAggiungiNuovo").val();
        var CAP = $("#txtCapPopupAggiungiNuovo").val();
        var luogoNascita = $("#txtLuogoNascitaPopupAggiungiNuovo").val();
        var telefono1 = $("#txtTelefonoPopupAggiungiNuovo").val();
        var provenienza = $("#txtProvenienzaPopupAggiungiNuovo").val();
        var motivo = $("#txtMotivoPopupAggiungiNuovo").val();
        var telefono2 = $("#txtTelefono2PopupAggiungiNuovo").val();
        var contatti = $("#txtContattiPopupAggiungiNuovo").val();
        var codFisc = $("#txtCodiceFiscalePopupAggiungiNuovo").val();
        var osservazioni = $("#txtOsservazioniPopupAggiungiNuovo").val();

        /*$.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "inserisciNuovoPaziente", nome:nome, cognome:cognome, dataNascita:dataNascita, luogoNascita:luogoNascita, medicoProv:provenienza, residenza:residenza, indirizzo:indirizzo, cap:CAP, telefono1:telefono1, telefono2:telefono2, motivo:motivo, anamnesi:osservazioni, codFisc:codFisc},
            success: function(response) {},
            error: function(){
                alert("Errore");
            }
        });*/
        cancellaCampi();
    }else{
        alert("Alcuni campi obbligatori non sono stati compilati correttamente...");
    }
    
}

function checkFields(){
    var ret = true;

    if($("#txtNomePopupAggiungiNuovo").val() == ""){
        document.getElementById("txtNomePopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtCognomePopupAggiungiNuovo").val() == ""){
        document.getElementById("txtCognomePopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtDataNascitaPopupAggiungiNuovo").val() == ""){
        document.getElementById("txtDataNascitaPopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtIndirizzoPopupAggiungiNuovo").val() == ""){
        document.getElementById("txtIndirizzoPopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtResidenzaPopupAggiungiNuovo").val() == ""){
        document.getElementById("txtResidenzaPopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtCapPopupAggiungiNuovo").val() == ""){
        document.getElementById("txtCapPopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtLuogoNascitaPopupAggiungiNuovo").val() == ""){
        document.getElementById("txtLuogoNascitaPopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtTelefonoPopupAggiungiNuovo").val() == ""){
        document.getElementById("txtTelefonoPopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtMotivoPopupAggiungiNuovo").val() == ""){
        document.getElementById("txtMotivoPopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }
    if($("#txtCodiceFiscalePopupAggiungiNuovo").val() == ""){
        document.getElementById("txtCodiceFiscalePopupAggiungiNuovo").style.backgroundColor = "rgb(255,143,143)";
        ret = false;
    }

    return ret;
}

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
	 $("#txtContattiPopupAggiungiNuovo").val("");
	 $("#txtCodiceFiscalePopupAggiungiNuovo").val("");
	 $("#txtOsservazioniPopupAggiungiNuovo").val("");

     /*PROBLEMZZZZZZZZZZZ*/















     /*$("#txtNomePopupAggiungiNuovo").style.backgroundColor = "white";
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
     $("#txtContattiPopupAggiungiNuovo").val("");
     $("#txtCodiceFiscalePopupAggiungiNuovo").val("");
     $("#txtOsservazioniPopupAggiungiNuovo").val("");*/

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



/*Dovrebbe svuotare la casella di ricerca per poi cercare con nesusn valore e ottenere tuti i record*/
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
				riga += "<tr onclick=\"mostraSituazionePaziente(" + persone [a].ID + ");\"><td>" + persone [a].ID + "</td><td>" + persone [a].Cognome + "</td><td>" + persone [a].Nome + "</td><td>" + giraData(persone [a].DataNascita) + "</td><td>" + persone [a].LuogoNascita + "</td><td>" + persone [a].MedicoProvenienza + "</td><td>" + persone [a].Residenza + "</td><td>" + persone [a].Indirizzo + "</td><td>" + persone [a].CAP + "</td><td>" + persone [a].Telefono1 + "</td><td>" + persone [a].Telefono2 + "</td><td>" + persone [a].Motivo + "</td><td>" + persone [a].CodFisc + "</td><td><button class=\"btn btn-danger\" onclick=\"visualizzaAnamnesi(" + persone [a].ID + ");\"><span class=\"glyphicon glyphicon-file\"></span></button></td><td>" + '<button class="btn btn-danger" onclick="visualizzaDocumenti(' + persone [a].ID + ');"><span class="glyphicon glyphicon-th-list"></span></button>' + "</td><td>" + '<button class="btn btn-danger" data-toggle=\"modal\" data-target=\"#popupCodicePaziente\" onclick="generaCodice(' + persone [a].ID + ');"><span class="glyphicon glyphicon-qrcode"></span></button>' + "</td></tr>";
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
        	$("#divAnamnesi").html(response);
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
        data: {azione: "visualizzaDocumenti", idPersona:id},
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
        		alert("Questo utente è già registrato oppure il codice è già stato utilizzato, riprovare...");
        	}
        },
        error: function(){
        	alert("Errore");
        }
    });*/
}

function mostraSituazionePaziente(id) {
    $("#idPersona").val(id);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaUltimoIntervento", idPersona:id},
        success: function(response) {
            //var situazionePaziente = JSON.parse (response);
            //$("#situazionePazienteUltimaVolta").val(situazionePaziente.Descrizione);
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

function assegnaEsercizi(){
    var id = $("#idPersona").val();
    /*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "assegnaEsercizi", id:id},
        success: function(response) {
             



             
        },
        error: function(){
            alert("Errore");
        }
    });*/
}

function visualizzaContabilita(){
    var id = $("#idPersona").val();
    /*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaContabilitaPersona", id:id},
        success: function(response) {
             



             
        },
        error: function(){
            alert("Errore");
        }
    });*/
}

function visualizzaStoricoInterventi(){
    var id = $("#idPersona").val();
    /*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaStoricoInterventi", id:id},
        success: function(response) {
            var interventi = JSON.parse (response);
            var riga = "";
            var class = "";

            for (var a = 0; a < interventi.length; a ++)
            {
                if(interventi[a].Pagato){
                    class = "class=\"table-success\"";
                }else{
                    class = "class=\"table-danger\"";
                }
                
                riga += "<tr " + class +"><td>" + interventi [a].AnaId + "</td><td>" + gira_data(interventi [a].Data) + "</td><td>" + interventi [a].Importo + "</td><td>" + interventi [a].Descrizione + "</td></tr>";                
            }

            $("#tblStoricoInterventiPazienteBody").html(riga);
        },
        error: function(){
            alert("Errore");
        }
    });*/
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
        	console.log(response);
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