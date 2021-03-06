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
    trovaAppuntamenti();
    setInterval(trovaAppuntamenti, 900000);
});

function trovaAppuntamenti(){
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "trovaAppuntamenti"},
        success: function(response) {
            var appuntamenti = JSON.parse (response);
            var nome = appuntamenti[0].Nome + " " + appuntamenti[0].Cognome;
            var ora = appuntamenti[0].Ora.substring(0,5);
            var data = appuntamenti[0].Data;

            if(dataDiOggi() != data){
                data = giraDataUmano(data) + " ";
            }else{
                data = "";
            }
            
            var totale = nome + " (" + data + ora + ")";
            if(nome == "Nessuno "){
                totale = "Nessuno";
            }
            $("#lblAppuntamento").html(totale);
            nome = appuntamenti[1].Nome + " " + appuntamenti[1].Cognome;
            ora = appuntamenti[1].Ora.substring(0,5);
            data = appuntamenti[1].Data;
            
            if(dataDiOggi() != data){
                data = giraDataUmano(data) + " ";
            }else{
                data = "";
            }

            totale = nome + " (" + data + ora + ")";
            if(nome == "Nessuno "){
                totale = "Nessuno";
            }
            $("#lblProxAppuntamento").html(totale);
        },
        error: function(){
            initPopupGenerico("Errore");
        }
    });
}

//svuota il campo nome del popup aggiungi nuovo
function svuotaNome(){
    $("#txtNomePopupAggiungiNuovo").val("");
    $("txtNomePopupAggiungiNuovo").css("background-color","white");
}
function svuotaCognome(){
    $("#txtCognomePopupAggiungiNuovo").val("");
    $("#txtCognomePopupAggiungiNuovo").css("background-color","white");
}
function svuotaDataNascita(){
    $("#txtDataNascitaPopupAggiungiNuovo").val("");
    $("#txtDataNascitaPopupAggiungiNuovo").css("background-color","white");
}
function svuotaIndirizzo(){
    $("#txtIndirizzoPopupAggiungiNuovo").val("");
    $("#txtIndirizzoPopupAggiungiNuovo").css("background-color","white");
}
function svuotaResidenza(){
    $("#txtResidenzaPopupAggiungiNuovo").val("");
    $("#txtResidenzaPopupAggiungiNuovo").css("background-color","white");
}
function svuotaCap(){
    $("#txtCapPopupAggiungiNuovo").val("");
    $("#txtCapPopupAggiungiNuovo").css("background-color","white");
}
function svuotaLuogoNascita(){
    $("#txtLuogoNascitaPopupAggiungiNuovo").val("");
    $("#txtLuogoNascitaPopupAggiungiNuovo").css("background-color","white");
}
function svuotaTelefono(){
    $("#txtTelefonoPopupAggiungiNuovo").val("");
    $("#txtTelefonoPopupAggiungiNuovo").css("background-color","white");
}
function svuotaMotivo(){
    $("#txtMotivoPopupAggiungiNuovo").val("");
    $("#txtMotivoPopupAggiungiNuovo").css("background-color","white");
}
function svuotaCodFisc(){
    $("#txtCodiceFiscalePopupAggiungiNuovo").val("");
    $("#txtCodiceFiscalePopupAggiungiNuovo").css("background-color","white");
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
        console.log("passo campi mostrati");
	 	changeArrow();
	 }
}
//cambia il comtenuto quando è premuto il bottone campi aggiuntivi
function changeArrow(){
	if($("#btnAggiungiCampiPopupAggiungiNuovo").val() == "Aggiungi"){
		$("#campiAggiuntiviPopupAggiungiNuovo").toggle('show');
        $("#btnAggiungiCampiPopupAggiungiNuovo").html("Nascondi campi <span class=\"glyphicon glyphicon-chevron-up\">");
        $("#btnAggiungiCampiPopupAggiungiNuovo").val("Nascondi");
    }else{
    	$("#campiAggiuntiviPopupAggiungiNuovo").toggle('hide');
    	$("#btnAggiungiCampiPopupAggiungiNuovo").val("Aggiungi");
        $("#btnAggiungiCampiPopupAggiungiNuovo").html("Aggiungi campi <span class=\"glyphicon glyphicon-chevron-down\">");
    }
    if($("#btnAggiungiCampiPopupModificaPaziente").val() == "Aggiungi"){
        $("#campiAggiuntiviPopupModificaPaziente").toggle('show');
        $("#btnAggiungiCampiPopupModificaPaziente").html("Nascondi campi <span class=\"glyphicon glyphicon-chevron-up\">");
        $("#btnAggiungiCampiPopupModificaPaziente").val("Nascondi");
    }else{
        $("#campiAggiuntiviPopupModificaPaziente").toggle('hide');
        $("#btnAggiungiCampiPopupModificaPaziente").val("Aggiungi");
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
    $("#elencoComuni1").html("");
    $("#elencoComuni2").html("");
    if($("#btnAggiungiCampiPopupAggiungiNuovo").val() == "Nascondi"){
        $("#campiAggiuntiviPopupAggiungiNuovo").toggle('hide');
        $("#btnAggiungiCampiPopupAggiungiNuovo").val("Aggiungi");
        $("#btnAggiungiCampiPopupAggiungiNuovo").html("Aggiungi campi <span class=\"glyphicon glyphicon-chevron-down\">");    
    }
    
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
            cancellaCampi();
            cmbMotivi.selectedIndex = "0";
        },
        error: function(){
            initPopupGenerico("Errore");
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
                initPopupGenerico("Errore");
            }
        });
    }
}

function riportaNome(nome,dove){
    switch(dove){
        case 0:
        $("#txtLuogoNascitaPopupAggiungiNuovo").val(nome);
        $("#elencoComuni1").html("");
        $("#elencoComuni1").hide();
        break;
        case 1:
        $("#txtResidenzaPopupAggiungiNuovo").val(nome);
        $("#elencoComuni2").html("");
        $("#elencoComuni2").hide();
        break;
        case 2:
        $("#txtLuogoNascitaPopupModificaPaziente").val(nome);
        $("#elencoComuniModifica1").html("");
        $("#elencoComuniModifica1").hide();
        break;
        case 3:
        $("#txtResidenzaPopupModificaPaziente").val(nome);
        $("#elencoComuniModifica2").html("");
        $("#elencoComuniModifica2").hide();
        break;
    }
}

//scarica il foglio della privacy
function stampaFoglioPrivacy(status){
    var id = $("#idPersonaFP").val();
    var data = dataDiOggi();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "convertToPDF",id:id,data:data},
        success: function(response) {
            if(status == 1){
                window.open(response);
            }
            $('#popupStampaFoglioPrivacy').modal('hide');
        },
        error: function(){
            initPopupGenerico("Errore");
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
    var ricerca = $("#txtRicercaAnagrafica").val();
    $("#txtResidenzaPopupModificaPaziente").keyup(function(){
        caricaResidenzaModifica();
    });
    $("#txtLuogoNascitaPopupModificaPaziente").keyup(function(){
        caricaLuogoNascitaModifica();
    });
    /*Se è vera è mostrata anagrafica, altrimenti è mostrata contabilità*/
    if(anagraficaShown){
        if($("#situazionePaziente") != null){
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
                initPopupGenerico("Errore");
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
                                '<button class="btn btn-info" onclick="mostraSituazionePaziente(' + persone [a].ID + ',\'' + persone [a].Cognome + '\',\'' + persone [a].Nome + '\');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>";
                }
                $("#tblAnagraficaBody").html(riga);
            },
            error: function(){
                initPopupGenerico("Errore");
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
                    cmbMotivi.selectedIndex = datiPaziente.Motivo-1;
                },
                error: function(){
                    initPopupGenerico("Errore");
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
            initPopupGenerico("Errore");
        }
    });
}

//aggiorna i dati del paziente dopo una modifica
function aggiornaPaziente(){
    if(!checkfieldsModifiche()){
        initPopupGenerico("Alcuni campi obbligatori non sono stati compilati correttamente.");
    }else{
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
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "aggiornaAnagraficaUpdate", id:id, nome:nome, cognome:cognome, dataNascita:dataNascita, luogoNascita:luogoNascita, 
                    medicoProv:provenienza, residenza:residenza, indirizzo:indirizzo, cap:cap, telefono1:telefono1, telefono2:telefono2,
                    motivo:motivo, anamnesi:osservazioni, codFisc:codfisc},
            success: function(response) {
                $('#popupModificaPaziente').modal('hide');
                initPopupGenerico("Informazioni paziente aggiornate!");
                caricaAnagrafica();
            },
            error: function(){
                initPopupGenerico("Errore");
            }
        });
    }
}

function checkfieldsModifiche(){
    var ret = true;
    var txtNome = $("#txtNomePopupModificaPaziente");
    var txtCognome = $("#txtCognomePopupModificaPaziente");
    var txtLuogoNascita = $("#txtLuogoNascitaPopupModificaPaziente");
    var txtDataNascita = $("#txtDataNascitaPopupModificaPaziente");
    var txtResidenza = $("#txtResidenzaPopupModificaPaziente");
    var txtIndirizzo = $("#txtIndirizzoPopupModificaPaziente");
    var txtCap = $("#txtCapPopupModificaPaziente");
    var txtCodFisc = $("#txtCodiceFiscalePopupModificaPaziente");
    var txtTelefono = $("#txtTelefonoPopupModificaPaziente");
    var txtMotivo = $("#txtMotivoPopupModificaPaziente");

    var regexCap = new RegExp('^[0-9]{5}$');
    var regexCodiceFiscale = new RegExp('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$');

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
    if(!regexCap.test(txtCap.val())){
        txtCap.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(!regexCodiceFiscale.test(txtCodFisc.val())){
        txtCodFisc.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtTelefono.val() == ""){
        txtTelefono.css("background-color", "rgb(255,147,147)");
        ret = false;
    }

    return ret;
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
        	initPopupGenerico("Errore");
        }
    });
}

//visualizza i documenti relativi ad un utente
function visualizzaDocumenti(idPersona = 0) {
    if(idPersona == 0){
        var id = $("#idPersonaModifiche").val();
    }else{
        var id = idPersona;
    }
    
	$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaDocumenti", id:id},
        success: function(response) {
        	var documenti = JSON.parse (response);
            var riga = "";
            for (var a = 0; a < documenti.length; a ++)
            {
                var percorso = documenti[a].Allegato;
                var indicePartenza = (percorso.indexOf('\\') >= 0 ? percorso.lastIndexOf('\\') : percorso.lastIndexOf('/'));
                var nomeFile = percorso.substring(indicePartenza);
                if (nomeFile.indexOf('\\') === 0 || nomeFile.indexOf('/') === 0) {
                    nomeFile = nomeFile.substring(1);
                }
                var path = "../docs/" + documenti[a].AnaID + "/" + nomeFile;
                riga += "<tr><td>" + 
                    giraDataUmano(documenti[a].Data) + "</td><td>" +
                    documenti[a].Descrizione + "</td><td>" +
                    '<button class="btn btn-info" style="margin-right: 5px;" onclick="mostraDocumento(String(\'' + path + '\'));"><span class="glyphicon glyphicon-eye-open"></span></button>' +
                    '<button class="btn btn-danger" onclick="eliminaDocumento(' + documenti[a].ID + "," + documenti[a].AnaID + ');"><span class="glyphicon glyphicon-trash"></span></button>' + "</td><tr>"; 
            }
            if(response != "[]"){
                $("#tblDocumentiPazienteBody").html(riga);
                $("#divDocumentiPaziente").show();
                $("#divDocumentiPazienteAssenti").hide();
            }else{
                $("#divDocumentiPaziente").hide();
                $("#divDocumentiPazienteAssenti").show();
            }
        },
        error: function(){
        	initPopupGenerico("Errore");
        }
    });
}

/*Metodo che stampa l'immagine*/
function mostraDocumento(path){
    window.open(path);
}

function eliminaDocumento(idDocumento, idPersona){
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "eliminaDocumento", id:idDocumento, idPersona:idPersona},
        success: function(response) {
            initPopupGenerico("Documento eliminato!");
            visualizzaDocumenti(idPersona);
        },
        error: function(){
            initPopupGenerico("Errore");
        }
    });
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
                initPopupGenerico("C'è stato un problema al server...");       
            }else if(response == -2) {        
                $("#lblCodice").html("Questo utente è già registrato con una mail.");
            }else{
                $("#lblCodice").html("Il codice già registrato è: " + response);
            }
        },
        error: function(){
        	initPopupGenerico("Errore");
        }
    });
}

//gestione del sidenav relativo al paziente
function mostraSituazionePaziente(i, cognome, nome) {
    svuotaCampiSituazionePaziente();
    if($("#situazionePaziente").css("width") == "500px"){
        nascondiSituazionePaziente();
    }else{
        $("#idPersonaSituazionePaziente").val(i);
        $("#lblCognomeNomeSituazionePaziente").html(cognome + " " + nome);
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "caricaUltimoInterventoAnagrafica", id:i},
            success: function(response) {
                if(response != 1){
                    var dati = JSON.parse (response);
                    $("#situazionePazienteUltimaVolta").html(dati.Descrizione);
                }else{
                    $("#situazionePazienteUltimaVolta").html("Non è presente nessun intervento passato.");
                }
            },
            error: function(){
                initPopupGenerico("Errore");
            }
        });

    	$("#situazionePaziente").css("width","500px");
        $("#situazionePaziente").css("margin-top","62px");
	}
}

//nasconde il sidenav con l'ultimo intervento e le osservazioni
function nascondiSituazionePaziente() {
	svuotaCampiSituazionePaziente();
	$("#chkPagato").prop("checked","false");
    $("#situazionePaziente").css("width","0");
}

//visualizza il sidenav con i bottoni
function mostraModifiche(i, cognome, nome) {
    $("#idPersonaModifiche").val(i);
    $("#lblCognomeNomeModifiche").html(cognome + " " + nome);
    $("#modifiche").css("width","500px");
    $("#modifiche").css("margin-top","62px");
}

//nasconde il sidenav con i bottoni
function nascondiModifiche() {
    $("#modifiche").css("width","0");
}

//salva importo e osservazioni di cosa è stato fatto oggi
function salvaIntervento(){
    var descrizione = $("#txtSituazionePazienteOggi").val();
    var importo = $("#txtImportoSituazionePaziente").val();
    if(!checkfieldsIntervento(descrizione, importo)){
        initPopupGenerico("Alcuni campi non sono stati compilati correttamente.");
    }else{
        var pagato = $("#chkPagato").is(':checked');
        var id = $("#idPersonaSituazionePaziente").val();
        var oggi = dataDiOggi();

        //Intervento come non pagato
        if(pagato == 0){
            ricevutaAnagrafica(0,descrizione,importo,id,oggi);
        }else{
            $("#stmpRicImporto").val(importo);
            $("#stmpRicDescrizione").val(descrizione);
            $("#stmpRicID").val(id);
            $("#stmpRicData").val(oggi);
            $('#popupStampaRicevuta').modal('show');
        }
    }
}

function ricevutaAnagrafica(pagato, descrizione, importo, id, oggi){
    //Non si vuole stampare la ricevuta
    if(pagato == 0){
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "inserisciPagamentoDesc", id:id, importo:importo, descrizione:descrizione, 
                            data:oggi, pagato:pagato},
            success: function(response) {
                if(response == 1){
                    initPopupGenerico("Pagamento inserito con successo!");
                    nascondiSituazionePaziente();
                }
            },
            error: function(){
                initPopupGenerico("Errore");
            }
        });
    //Si vuole stampare la ricevuta
    }else{
        var data = $("#stmpRicData").val();
        var importo = $("#stmpRicImporto").val();
        var descrizione = $("#stmpRicDescrizione").val();
        var id = $("#stmpRicID").val();
        var totale = importo;
        var iva = 5/100;
        var daPagare = totale*iva;

        $.ajax({ 
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "dettagliPaziente", id:id},
            success: function(response) {
                response = JSON.parse (response);
                var cognomeNome = response[0].cognomeNome;
                var indirizzo = response[0].Indirizzo;
                var residenza = response[0].residenza;
                var cap = response[0].CAP;
                var cfisc = response[0].cfisc;
                var dataEmissione = response[0].dataEmissione;
                $.ajax({  
                    type: "GET", 
                    url: "../samples/sampleFattura.html",
                    success: function(response) {
                        var fattura = response;
                        $.ajax({ 
                            type: "POST", 
                            url: "./serverlogic.php",
                            data: {azione: "compilaFattura", id:id, importo:importo, descrizione:descrizione, 
                                    data:data,dataFattura:data, fattura:fattura, cognomeNome:cognomeNome, indirizzo:indirizzo, residenza:residenza, cap:cap,
                                 cfisc:cfisc, totale:totale, iva:iva, daPagare:daPagare, dataEmissione:dataEmissione},
                            success: function(response) {
                                window.open(response);
                                nascondiSituazionePaziente();
                            },
                            error: function(){
                                initPopupGenerico("Errore");
                            }
                        });
                    },
                    error: function(){
                        initPopupGenerico("Errore");
                    }
                });
            },
            error: function(){
                initPopupGenerico("Errore");
            }
        }); 
    }
}

/*Restituisce false se qualcosa non è statop completato correttamente*/
function checkfieldsIntervento(descrizione, importo){
    var regexImporto = new RegExp("^[0-9]+$");
    var ret = true;

    if(descrizione == ""){
        $("#txtSituazionePazienteOggi").css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(!regexImporto.test(importo)){
        $("#txtImportoSituazionePaziente").css("background-color", "rgb(255,147,147)");
        ret = false;
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
    $("#txtSituazionePazienteOggi").css("background-color","white");
}

//svuota il campo nome del popup aggiungi nuovo
function svuotaImporto(){
    $("#txtImportoSituazionePaziente").css("background-color","white");
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
            initPopupGenerico("Errore");
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
                        giraDataUmano(contabilita[a].Data) + 
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
            initPopupGenerico("Errore");
        }
    });
}

//assegna eservcizi ad un paziente
function assegnaEsercizi(){
}

//aggiunge un nuovo paziente una volta che i campi sono tutti compilati
function aggiungiNuovoPaziente(){
    if(!checkfields()){
        initPopupGenerico("Alcuni campi obbligatori non sono stati compilati correttamente.");
    }else{
        var nome = $("#txtNomePopupAggiungiNuovo").val();
        var cognome = $("#txtCognomePopupAggiungiNuovo").val();
        var luogoNascita = $("#txtLuogoNascitaPopupAggiungiNuovo").val();
        var dataNascita = $("#txtDataNascitaPopupAggiungiNuovo").val();
        var residenza = $("#txtResidenzaPopupAggiungiNuovo").val();
        var indirizzo = $("#txtIndirizzoPopupAggiungiNuovo").val();
        var cap = $("#txtCapPopupAggiungiNuovo").val();
        var telefono1 = $("#txtTelefonoPopupAggiungiNuovo").val();
        var telefono2 = $("#txtTelefono2PopupAggiungiNuovo").val();
        var codfisc = $("#txtCodiceFiscalePopupAggiungiNuovo").val();
        var motivo = $("#txtMotivoPopupAggiungiNuovo").val();
        var osservazioni = $("#txtOsservazioniPopupAggiungiNuovo").val();
        var provenienza = $("#txtProvenienzaPopupAggiungiNuovo").val();

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
                                cancellaCampi();
                                $('#popupStampaFoglioPrivacy').modal('show');
                            },
                            error: function(){
                                initPopupGenerico("Errore");
                            }
                        });
                        cercaPersona();
                    },
                    error: function(){
                        initPopupGenerico("Errore");
                    }
                });
            },
            error: function(){
                initPopupGenerico("Errore");
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

    var regexCap = new RegExp('^[0-9]{5}$');
    var regexCodiceFiscale = new RegExp('^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$');

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
    if(!regexCap.test(txtCap.val())){
        txtCap.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(!regexCodiceFiscale.test(txtCodFisc.val())){
        txtCodFisc.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtTelefono.val() == ""){
        txtTelefono.css("background-color", "rgb(255,147,147)");
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
        var dim = image.files[0].size;
        console.log(dim);
        //Se la dimensione è minore di 10 Mb
        if(dim < 10000000){
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

            var path = "..\\docs\\" + id + "\\" + nomeFile;

            $.ajax({  
                type: "POST", 
                url: "./serverlogic.php",
                data: {azione: "inserisciDocumento",id:id,data:data,allegato:path,descrizione:descrizione},
                success: function(response) {
                    initPopupGenerico("File caricato con successo!");
                },
                error: function(){
                    initPopupGenerico("Errore");
                }
            });
        }
    }
}


/*-------------------Funzioni relative a contabilità-------------------*/


/*
* Funzione che carica la tabella contabilità all' interno del div che costituisce il body della homepage.
*/
function caricaContabilita(nomePersona = ""){
    $("#txtRicercaAnagrafica").val("");
	if($("#situazionePaziente") != null){
	 	nascondiSituazionePaziente();
	}
	if($("#pagamento") != null){
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
        	initPopupGenerico("Errore");
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
                    "</td><td>" + '<button class="btn btn-info" onclick="mostraPagamento(' + pagamenti [a].AnaID + ',' + anno + ',' + mese + ',' + giorno +');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>";			
            }

			$("#tblContabilitaBody").html(riga);
        },
        error: function(){
        	initPopupGenerico("Errore");
        }
    });
}

/*
* Richiama una funzione ajax e riempie il sidenav contenente le informazioni riguardo un pagamento specifico
*/
function mostraPagamento(i,anno, mese, giorno) {
    $("#sidePagamento").css("width","500px");
    $("#sidePagamento").css("margin-top","55px");
    if (mese<10){
        mese = "0" + mese;
    }
    if (giorno<10){
        giorno = "0" + giorno;
    }
    var data = anno + "-" + mese + "-" + giorno;
    $("#idPagamento").val(i);
    $("#dataPagamento").val(data);
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

            if(pagamento.Pagato == 1){
                $("#btnPaga").css("visibility", "hidden");
                $("#btnAggiornaPagamento").css("visibility", "hidden");
                $("#btnStampaRicevuta").css("visibility", "visible");
                $("#divImportoPagamento").show();
                $("#divImportoPagamento").html(pagamento.Pagamento);
                $("#txtImportoPagamento").hide();
            }else{
                $("#btnPaga").css("visibility", "visible");
                $("#btnAggiornaPagamento").css("visibility", "visible");
                $("#btnStampaRicevuta").css("visibility", "hidden");
                $("#txtImportoPagamento").show();
                $("#txtImportoPagamento").val(pagamento.Pagamento);
                $("#divImportoPagamento").hide();
            }
        },
        error: function(){
            initPopupGenerico("Errore");
        }
    });
}

/*Fa scomparire il sidenav contente le informazioni del pagamento*/
function nascondiPagamento() {
	$("#txtImportoPagamento").val("");
    $("#sidePagamento").css("width","0");
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
            initPopupGenerico("Errore");
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
            initPopupGenerico("Errore");
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
            initPopupGenerico("Errore");
        }
    });
}

/*IOmposta il pagamento singolo nell' hidden per la ricevuta e stamp'a il popup se si vuiole stampare la ric*/
function confermaPagamento(){
    var id = $("#idPagamento").val();
    var data = $("#lblDataIntervento").html();
    data = giraDataDb(data);
    var importo = $("#txtImportoPagamento").val();
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "datiFatturaSingola", id:id, data:data},
        success: function(response) {
            var datiFattura = JSON.parse(response);
            $("#cognomeNome").val(datiFattura.cognomeNome);
            $("#indirizzo").val(datiFattura.Indirizzo);
            $("#residenza").val(datiFattura.residenza);
            $("#cap").val(datiFattura.CAP);
            $("#cfisc").val(datiFattura.cfisc);
            $("#descrizione").val(datiFattura.descrizione);
            $("#importo").val(importo);
            $("#totale").val(importo);
            var totale = importo;
            var iva = 5/100;
            $("#bolloIva").val(iva);
            $("#daPagare").val(totale*iva);
            $("#dataEmissione").val(datiFattura.dataEmissione);
            $("#id").val(id);
            
            $('#pagamentoSingolo').val("0");
            $('#popupStampaRicevuta').modal('show');
        },
        error: function(){
            initPopupGenerico("Errore");
        }
    });
}

/*IOmposta il pagamento multiplo nell' hidden per la ricevuta e stamp'a il popup se si vuiole stampare la ric*/
function pagaTuttiInterventiPassati(){
    var id = $("#idPagamento").val();
    var data = $("#dataPagamento").val();
    var importo = $("#txtImportoPagamento").val();
    //Aggiorna l'importo del pagamento selezionato
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "aggiornaPagamento", id:id,data:data,importo:importo},
        success: function(response) {
            $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "datiFatturaMultipla", id:id},
            success: function(response) {
                var datiFattura = JSON.parse(response);
                $("#cognomeNome").val(datiFattura[0].cognomeNome);
                $("#indirizzo").val(datiFattura[0].Indirizzo);
                $("#residenza").val(datiFattura[0].residenza);
                $("#cap").val(datiFattura[0].CAP);
                $("#cfisc").val(datiFattura[0].cfisc);
                var iva = 5/100;
                $("#bolloIva").val(iva);
                $("#dataEmissione").val(datiFattura[0].dataEmissione);
                var insiemeDescrizioni = [];
                var insiemeImporti = [];
                var totale = 0;
                for(var i = 0; i<datiFattura.length; i++){
                    totale = parseInt(totale) + parseInt(datiFattura[i].importo);
                    insiemeDescrizioni[i] = datiFattura[i].descrizione;
                    insiemeImporti[i] = datiFattura[i].importo;
                }
                $("#descrizione").val(insiemeDescrizioni);
                $("#importo").val(insiemeImporti);
                
                $("#totale").val(totale);
                $("#daPagare").val(totale*iva);
                $('#pagamentoSingolo').val("1");
                $('#popupStampaRicevuta').modal('show');
            },
            error: function(){
                initPopupGenerico("Errore");
            }
        });
        },
        error: function(){
            initPopupGenerico("Errore");
        }
    });
}

function stampaRicevuta(){
    var data = giraDataDb($("#lblDataIntervento").html());
    var cognomeNome = $("#cognomeNome").val();
    var indirizzo = $("#indirizzo").val();
    var residenza = $("#residenza").val();
    var cap = $("#cap").val();
    var cfisc = $("#cfisc").val();
    var bolloiva = $("#bolloIva").val();
    var dataEmissione = $("#dataEmissione").val();
    var importo = $("#importo").val();
    var descrizione = $("#descrizione").val();
    var totale = $("#totale").val();
    var id = $("#idPagamento").val();
    var pagamentoSingolo = $("#pagamentoSingolo").val();
    $.ajax({  
        type: "GET", 
        url: "../samples/sampleFattura.html",
        success: function(response) {
            var fattura = response;
            if(pagamentoSingolo == 0){
                $.ajax({  
                    type: "POST", 
                    url: "./serverlogic.php",
                    data: {azione: "stampaFatturaSingola",id:id, dataEmissione:dataEmissione, cognomeNome:cognomeNome, indirizzo:indirizzo,
                            residenza:residenza,cap:cap,cfisc:cfisc,bolloiva:bolloiva,data:data,importo:importo,descrizione:descrizione,totale:totale, fattura:fattura},
                    success: function(response) {
                        $('#popupStampaRicevuta').modal('hide');
                        caricaContabilita();
                        window.open(response);
                    },
                    error: function(){
                        initPopupGenerico("Errore");
                    }
                });
            }else{
                $.ajax({  
                    type: "POST", 
                    url: "./serverlogic.php",
                    data: {azione: "stampaFatturaMultipla",id:id, dataEmissione:dataEmissione, cognomeNome:cognomeNome, indirizzo:indirizzo,
                            residenza:residenza,cap:cap,cfisc:cfisc,bolloiva:bolloiva,importo:importo,descrizione:descrizione,totale:totale, fattura:fattura},
                    success: function(response1) {
                        console.log("response 1 " + response1);
                        console.log("response " + response);
                        $('#popupStampaRicevuta').modal('hide');
                        caricaContabilita();
                        window.open(response1);
                    },
                    error: function(){
                        initPopupGenerico("Errore");
                    }
                });
            }
        },
        error: function(){
            initPopupGenerico("Errore");
        }
    });
}


//Funzione che stampa la ricevuta con gli importi aggiornati
function stampaRicevutaPagamentoEsistente(){
    var id = $("#idPagamento").val();
    var data = $("#dataPagamento").val();

    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "ricevutaPagamentoEsistente", id:id, data:String(data)},
        success: function(response) {
            window.open(response);
        },
        error: function(){
            initPopupGenerico("Errore");
        }
    });
}

function initPopupGenerico(msg){
    $("#bodyPopupGenerico").html(msg);
    $("#popupGenerico").modal('show');
}
