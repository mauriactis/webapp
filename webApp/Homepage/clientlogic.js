



/*-------------------Funzioni in comune-------------------*/




$(document).ready(function(){
	caricaAnagrafica();
	// ciao sono bello
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
	 $("#txtContattiPopupAggiungiNuovo").val("");
	 $("#txtCodiceFiscalePopupAggiungiNuovo").val("");
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
}

function redimContainer(){
	document.getElementById("container").style.marginRight = "0";
}




/*-------------------Funzioni relative ad anagrafica-------------------*/




function caricaAnagrafica() {
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
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaAnagrafica"},
        success: function(response) {
        	var persone = JSON.parse (response);
			var riga = "";
			for (var a = 0; a < persone.length; a ++)
			{
				riga += "<tr onclick=\"mostraSituazionePaziente(" + persone [a].ID + ");\"><td>" + persone [a].ID + "</td><td>" + persone [a].Nome + "</td><td>" + persone [a].Cognome + "</td><td>" + persone [a].DataNascita + "</td><td>" + persone [a].LuogoNascita + "</td><td>" + persone [a].Provenienza + "</td><td>" + persone [a].Residenza + "</td><td>" + persone [a].Indirizzo + "</td><td>" + persone [a].CAP + "</td><td>" + persone [a].Telefono1 + "</td><td>" + persone [a].Contatti + "</td><td>" + persone [a].Motivo + "</td><td>" + persone [a].CodFisc + "</td><td><button class=\"btn btn-danger\" onclick=\"visualizzaDocumenti(" + persone [a].id + ");\"><span class=\"glyphicon glyphicon-th-list\"></span></button></td><td>" + '<button class="btn btn-danger" onclick="visualizzaDocumenti(' + persone [a].id + ');"><span class="glyphicon glyphicon-th-list"></span></button>' + "</td><td>" + '<button class="btn btn-danger" onclick="generaCodice(' + persone [a].id + ');"><span class="glyphicon glyphicon-qrcode"></span></button>' + "</td></tr>";
			}
			$("#tblAnagraficaBody").html(riga);
        },
        error: function(){
        	alert("Errore");
        }
    });
}

function cercaPersona ()
{
	var ricerca = document.getElementById ("txtRicercaAnagrafica").value;

	$.post ("serverlogic.php?command=cercaPersona",
		{
			"persona": ricerca
		},
		function (data)
		{
			var persone = JSON.parse (data);
			var t = $('#tblAnagrafica').DataTable ();
			t.clear ();
			

			for (var a = 0; a < persone.length; a ++)
			{
				var d = [persone [a].ID,persone [a].nome, persone [a].cognome,persone [a].DataNascita,persone [a].LuogoNascita,persone [a].Provenienza,persone [a].Residenza,persone [a].Indirizzo,persone [a].CAP,persone [a].Telefono1,persone [a].Contatti,persone [a].Motivo,persone [a].Osservazioni,persone [a].CodiceFiscale];
				t.row.add (d);
			}
			t.draw (false);

		}
	);

	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {persona: ricerca,azione: "cercaPersona"},
        success: function(response) {
        	var persone = JSON.parse (response);
			var t = $('#tblAnagrafica').DataTable ();
			t.clear ();

			for (var a = 0; a < persone.length; a ++)
			{
				var d = [persone [a].ID,persone [a].Nome, persone [a].Cognome,persone [a].DataNascita,persone [a].LuogoNascita,persone [a].Provenienza,persone [a].Residenza,persone [a].Indirizzo,persone [a].CAP,persone [a].Telefono1,persone [a].Contatti,persone [a].Motivo,persone [a].Osservazioni,persone [a].CodiceFiscale];
				t.row.add (d);
			}
			t.draw (false);



			//var riga="<table class=\"table table-hover table-bordered\" id=\"tblAnagrafica\"><thead id=\"tblIntestazione\"><tr><th>Nome</th><th>Cognome</th><th>Data di nascita</th><th>Luogo di nascita</th><th>Provenienza</th><th>Residenza</th><th>Indirizzo</th><th>CAP</th><th>Telefono</th><th>Contatti</th><th>Motivo</th><th>Osservazioni</th><th>Codice fiscale</th><th>Documenti</th></tr></thead><tbody id=\"bodyTblAnagrafica\">";
			/*for(i=0;i<10;i++){ 
				//Indice formato da ID
				riga += "<tr onclick=\"mostraSituazionePaziente(" + i + ");\"> <td>Esempio</td> <td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td>Esempio</td><td><button type=\"button\" class=\"btn btn-danger\" id=\"btnDocumentiPaziente\"><span class=\"glyphicon glyphicon-list\"></span></button></td></tr>";
			}*/
			//riga += "</tbody></table>";
			$("#container").html(riga + response);         
        },
        error: function(){
        	alert("Errore");
        }
    });
}

function visualizzaDocumenti(id) {
	





}

function generaCodice(id) {
	





}

function mostraSituazionePaziente(i) {
	if(document.getElementById("situazionePaziente").style.width == "500px"){
	 	nascondiSituazionePaziente();
	}else{
		console.log(i);
    	document.getElementById("situazionePaziente").style.width = "500px";
    	document.getElementById("situazionePaziente").style.marginTop = "55px";
    	document.getElementById("container").style.marginRight = "500px";
	}
}

function nascondiSituazionePaziente() {
	$("#txtSituazionePazienteOggi").val("");
	$("#txtImportoSituazionePaziente").val("");
	document.getElementById ("chkPagato").checked = false;
    document.getElementById("situazionePaziente").style.width = "0";
    redimContainer();
}

function checkButton(){
	if(document.getElementById ("chkPagato").checked == true){
		document.getElementById ("chkPagato").checked = false;
	}else{
		document.getElementById ("chkPagato").checked = true;
	}
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
			var riga="<table class=\"table table-hover table-bordered\" id=\"tblContabilita\"><thead id=\"tblIntestazione\"><tr><th>Nome</th><th>Cognome</th><th>Data</th><th>Importo</th></tr></thead><tbody id=\"bodyTblContabilita\">";
			for(i=0;i<10;i++){ 
				//Indice formato da ID + data
				riga += "<tr onclick=\"mostraPagamento(" + i + ");\"> <td>Esempio</td> <td>Esempio</td><td>Esempio</td><td>50 &euro;</td></tr>";
			}
			riga += "</tbody></table>";
			$("#container").html(riga + response);          
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
    	document.getElementById("container").style.marginRight = "500px";
	}
}

function nascondiPagamento() {
	$("#txtImportoPagamento").val("");
    document.getElementById("pagamento").style.width = "0";
    redimContainer();
}