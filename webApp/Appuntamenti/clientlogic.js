var options = { twentyFour: true, //Formato delle ore in 24 ore, di default falso
    title: 'Ora', 
    showSeconds: false, //Mostra i secondi
    minutesInterval: 1, //Intervallo di cambiamento dei minuti (in questo caso di minuto in minuto)
    show: null, //Una funzione chiamata quando il wickedPicker è mostrato
    clearable: false, //Permette di azzerare il wickedPicker mostrando una "X"
    }; 

$(document).ready(function(){
    initForm();
    $("#vsblPage").dblclick(function() {
        nascondiDettagliAppuntamento();
    });
});
$(document).keyup(function(e) {
    if (e.keyCode == 27) { 
        nascondiDettagliAppuntamento();
   }
});

/**
 * inizializzazione della pagina
 */
function initForm(){
    initPillsGiorni();
    startTime();
    initBadge();
    $('.txtData').datepicker({minDate: new Date});
    $('.dataRisposta1').datepicker("setDate", new Date());
    $('.txtOra').wickedpicker(options);
}

/**
 * carica il numero di nuove richieste dentro il badge del pulsante "Richieste appuntamento"
 * effettua una nuova chiamata ogni 5 minuti
 */
function initBadge(){
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "nuoveRichiesteMessaggi"},
        success: function(response) {
            $("#bdgRichieste").html(response);
        },
        error: function(){
            initPopupGenerico("Errore lato server, non siamo riusciti a caricare quanti nuovi messaggi ci sono!");
        }
    });
    setTimeout(initBadge, 300000);
}

/**
 * inizializza i pills sopra la tabella con gli appuntamenti
 * 
 * @param {int} caricaPagina 
 */
function initPillsGiorni(caricaPagina = 1){
    var oggi;
    if(caricaPagina == 1){
        oggi = new Date();
    }else{
        oggi = caricaPagina;
    }

    $.datepicker.setDefaults($.datepicker.regional['it']);
    $('#pckrDataAppuntamento').datepicker({minDate: oggi, inline: true,sideBySide: true,
        onSelect: visualizzaAppuntamentiData});

    var giorni = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    //permette di vedere anche la domenica
    var giornoSett = (oggi.getDay() + 6) % 7;
    var nomeGiorno = giorni[giornoSett];
    var riga = "";
    var offsetNeg = giornoSett;
    var offsetPos = 1;
    oggi = String(formattaData(oggi));
    //Ciclo che scorre i giorni della settimana e imposta come attivo quello di oggi
    for(var i = 0;i < 7;i++){
        if(giorni[i] == nomeGiorno){
            riga += '<li class="active"><a href="" id="selezionato" style="text-align: center;" data-toggle="tab" onclick="caricaAppuntamenti(' + oggi.substring(0,4) + "," + oggi.substring(5,7) + "," + oggi.substring(8,10) + ');">' + nomeGiorno + "<br>" + oggi.substring(8,10) + "/" + oggi.substring(5,7) + '</a></li>';
        }else{
            //devo dichiararla qua perchè serve tutte le volte la data di oggi, se usassi sempre una variabile dichiarata fuori dal for(es. "oggi")
            //facendo la setDate viene poi sballata il giro dopo
            var data;
            if(caricaPagina == 1){
                data = new Date();
            }else{
                data = new Date(caricaPagina);
            }
            //Siamo in una data precedente ad oggi
            if(i<giornoSett){
                var id = formattaData(new Date(data.setDate(data.getDate() - offsetNeg)));
                offsetNeg--;
            }else{
                var id = formattaData(new Date(data.setDate(data.getDate() + offsetPos)));
                offsetPos++;
            }

            var anno = id.substring(0,4);
            var mese= id.substring(5,7);
            var giorno= id.substring(8,10);
            riga += '<li><a href="" data-toggle="tab" style="text-align: center;" onclick="caricaAppuntamenti(' + anno + ", " + mese + ", " + giorno + ');">' + giorni[i] + "<br>" + giorno + "/" + mese + '</a></li>';
        }
        
    }
    $("#giorniAppuntamenti").html(riga);
    $('#selezionato').click();
}

/**
 * formatta una data nel formato YYYY-MM-DD
 * @param {string} date la data da formattare
 * @returns data nel formato YYYY-MM-DD
 */
function formattaData(date) {
    var d = new Date(date),
    month = String((d.getMonth() + 1)),
    day = String(d.getDate()),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * inizializza l'orologio in alto alla pagina
 * ogni mezzo secondo lo aggiorna
 */
function startTime() {
    var oggi = new Date();
    var ora = oggi.getHours();
    var minuti = oggi.getMinutes();
    var secondi = oggi.getSeconds();
    minuti = checkTime(minuti);
    secondi = checkTime(secondi);
    $('#lblOraAttuale').html(ora + ":" + minuti + ":" + secondi);
    var t = setTimeout(startTime, 500);
}

/**
 * controlla se il dato ricevuto ha una sola cifra
 * in questo caso la restituisce con uno 0 davanti (così ha due cifre)
 * esempio: 5 minuti --> 05 minuti
 * @param {*} i il dato da controllare
 * @returns "0i" se i<10
 */
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

/**
 * formatta la data ricevuta nel formato DD/MM/YYYY
 * @param {string} date la data da formattare
 * @returns data nel formato DD/MM/YYYY
 */
function giraDataUmano(date){
    return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
}

/**
 * formatta la data ricevuta nel formato YYYY-MM-DD
 * @param {string} date la data da formattare
 * @returns data nel formato YYYY-MM-DD
 */
function giraDataDb(date){
    return date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
}

/**
 * mostra il div a destra della tabella con i dettagli dell'appuntamento
 * contatta il db per ottenere la descrizione dell'appuntamento e di quello che è stato l'ultimo intervento fatto
 * @param {*} id l'id del paziente
 * @param {*} dataOra la data e l'ora dell'appuntamento
 */
function mostraDettagliAppuntamento(id, dataOra){
    $("#idPaziente").val(id);
    $("#dataIntervento").val(String(dataOra));
    $("#dettagliAppuntamentoUltimaVolta").html("attendi...");
    $("#dettagliAppuntamentoDaFare").html("attendi...");
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "mostraDettagliAppuntamento", id:id, data:dataOra},
        success: function(response) {
            var dettagli = JSON.parse (response);
            $("#dettagliAppuntamentoUltimaVolta").html(dettagli[0].Descrizione);
            $("#dettagliAppuntamentoDaFare").html(dettagli[1].Note);
        },
        error: function(){
            initPopupGenerico("Errore lato server, è stato impossibile caricare i dettagli dell'appuntamento scelto!");
        }
    });
    $("#divDettagliAppuntamento").fadeIn();
}

function svuotaPersona(){
    $("#txtPersonaNuovoAppuntamento").select();
    $("#txtPersonaNuovoAppuntamento").css("background-color", "white");
}

function svuotaData(){
    $("#txtDataNuovoAppuntamento").css("background-color", "white");
}

function svuotaOra(){
    $("#txtOraNuovoAppuntamento").css("background-color", "white");
}

function nascondiDettagliAppuntamento(){
    $("#divDettagliAppuntamento").fadeOut();
}

/**
 * init per il popup di un nuovo appuntamento
 * prima di tutto pulisce quello che c'era prima casomai non fosse stato ripulito
 * con una chiamata ajax prende tutti i pazienti per caricare un autocomplete
 */
function nuovoAppuntamento(){
    svuotaNuovoAppuntamento();
    $.datepicker.setDefaults($.datepicker.regional['it']); 
    
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaNomiPersone"},
        success: function(response) {
            var persone = JSON.parse (response);
            var cmbPersone = document.getElementById("txtPersonaNuovoAppuntamento");
            var array=[]; 
            for (var a = 0; a < persone.length; a ++){
                array.push(persone[a].NomeCognome + ", " + persone[a].ID);
            }
            $( "#txtPersonaNuovoAppuntamento" ).autocomplete({source: array});
        },
        error: function(){
            initPopupGenerico("Errore lato server, abbiamo riscontrato un problema nel caricare i dati dei pazienti");
        }
    });
}

/**
 * cancella tutti i valori dentro le input text del popup nuovo appuntamento
 */
function svuotaNuovoAppuntamento(){
    $('#txtPersonaNuovoAppuntamento').val("");
    $('#txtDataNuovoAppuntamento').val("");
    $('#txtOraNuovoAppuntamento').val("");
    $('#txtNoteNuovoAppuntamento').val("");
}

/**
 * elimina l'appuntamento scelto
 */
function eliminaAppuntamento(){
    var id = $("#idPaziente").val();
    var dataOra = $("#dataIntervento").val();
    $.ajax({
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "eliminaAppuntamento", id:id, data:dataOra},
        success: function(response) {
            nascondiDettagliAppuntamento();
            $("#selezionato").click();
        },
        error: function(){
            initPopupGenerico("Errore lato server. Qualcuno vuole che tu non elimini questo appuntamento...");
        }
    });

    $("#divDettagliAppuntamento").fadeIn();
}

/**
 * salvataggio dei dati di un nuovo appuntamento sul db
 */
function salvaAppuntamento(){
    if(checkfieldNuovoAppuntamento()){
        var idPersona = $("#txtPersonaNuovoAppuntamento").val().split(", ")[1];
        var data = giraDataDb($("#txtDataNuovoAppuntamento").val());
        var ora = $("#txtOraNuovoAppuntamento").val();
        var descrizione = $("#txtNoteNuovoAppuntamento").val();
    
        var dataOra = data + " " + ora.substring(0,2) + ":" + ora.substring(5,7) + ":00";
    
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "inserisciNuovoAppuntamento", id:idPersona, dataOra:dataOra, descrizione:descrizione},
            success: function(response) {
               $("#popupNuovoAppuntamento").modal('hide');
               initPopupGenerico("Appuntamento salvato con successo!");
               $('#selezionato').click();
            },
            error: function(){
                initPopupGenerico("Errore lato server, è stato proprio impossibile salvare questo appuntamento!");
            }
        });
    }else{
        initPopupGenerico("Alcuni campi non sono stati compilati correttamente.");
    }
}

/**
 * controllo che tutti i dati necessari (idPaziente,data e ora) per un appuntamento siano compliati
 * @returns true se tutti i campi sono compilati
 */
function checkfieldNuovoAppuntamento(){
    var ret = true;
    var idPaziente = $("#txtPersonaNuovoAppuntamento").val();
    var txtData = $("#txtDataNuovoAppuntamento").val();
    var ora = $("#txtOraNuovoAppuntamento").val();

    if(idPaziente == ""){
        idPaziente.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(txtData == ""){
        txtData.css("background-color", "rgb(255,147,147)");
        ret = false;
    }
    if(ora == ""){
        ora.css("background-color", "rgb(255,147,147)");
        ret = false;
    }

    return ret;
}

/**
 * Carica gli appuntamenti nella tabella in centro alla pagina a seconda del giorno selezionato dalle pills
 */
function caricaAppuntamenti(anno, mese, giorno){
    var data = anno + "-" + mese + "-" + giorno;

    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaAppuntamenti", data:data},
        success: function(response) {
            var appuntamenti = JSON.parse (response);
            var riga = "";
            var dataOra = "";
            for (var a = 0; a < appuntamenti.length; a ++)
            {
                dataOra = String(data) + " " + String(appuntamenti[a].Ora);
                riga += "<tr><td>" + 
                    appuntamenti[a].Ora.substring(0,5) + "</td><td>" +
                    appuntamenti[a].Cognome + " " + appuntamenti[a].Nome + "</td><td>" +
                    '<button class="btn btn-danger" onclick="mostraDettagliAppuntamento(' + appuntamenti[a].ID + ",'" + String(dataOra) + '\');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>";
            }
            if(riga != ""){
                $("#tblAppuntamentiBody").html(riga);
            }else{
                $("#tblAppuntamentiBody").html("<tr><td colspan=\"3\">Non sono stati fissati appuntamenti per oggi.</td></tr>");
            }
        },
        error: function(){
            initPopupGenerico("Errore lato server, ci è stato impossibile caricare gli appuntamenti per oggi!");
        }
    });
}

/**
 * trova il giorno selezionato sul calendario a sinistra e inizializza le pills sopra la tabella di conseguenza
 */
function visualizzaAppuntamentiData(){
    var selezione = $("#pckrDataAppuntamento").val();
    selezione = new Date(giraDataDb(selezione));
    initPillsGiorni(selezione);
}

/**
 * inizializza i dati dentro il popup delle richieste ricevute
 * carica prima le richieste di appuntamenti
 * dopo con una seconda chiamata carica i messaggi 
 */
function richiesteAppuntamento(){
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaRichiesteAppuntamento"},
        success: function(response) {
            var richieste = JSON.parse (response);
            var riga = "";
            var dataInvio = "";
            for (var a = 0; a < richieste.length; a ++)
            {
                dataInvio = String(richieste[a].DataOraInvio);
                riga += "<tr style=\"font-weight:bold\"><td>" + richieste[a].Cognome + " " + richieste[a].Nome + "</td><td>" +
                    '<button class="btn btn-success" onclick="visualizzaRichiesta(\'' + dataInvio + "'," + richieste[a].AnaID + ',\'' + richieste[a].Cognome + '\',\'' + richieste[a].Nome + '\',\'' + richieste[a].Note +'\');"><span class="glyphicon glyphicon-share-alt"></span></button>'; 
            }
            if(riga != ""){
                $("#tblRichiesteBody").html(riga);
            }else{
                $("#bodyPopupRichieste").html("Non sono presenti richieste.");
            }
        },
        error: function(){
            initPopupGenerico("Errore lato server, non siamo riusciti a leggere i tuoi messaggi!");
        }
    });
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaMessaggi"},
        success: function(response) {
            var messaggi = JSON.parse (response);
            var riga = "";
            var dataInvio = "";
            for (var a = 0; a < messaggi.length; a ++)
            {
                dataInvio = String(messaggi[a].DataOraInvio);
                riga += "<tr style=\"font-weight:bold\"><td>" + messaggi[a].Cognome + " " + messaggi[a].Nome + "</td><td>" +
                    '<button class="btn btn-info" onclick="visualizzaMessaggio(\'' + dataInvio + "'," + messaggi[a].AnaID + ',\'' + messaggi[a].Cognome + '\',\'' + messaggi[a].Nome + '\',\'' + messaggi[a].Note +'\');"><span class="glyphicon glyphicon-share-alt"></span></button>'; 
            }
            if(riga != ""){
                $("#tblMessaggiBody").html(riga);
            }else{
                $("#bodyPopupMessaggi").html("Non sono presenti messaggi.");
            }
        },
        error: function(){
            initPopupGenerico("Errore lato server, non siamo riusciti a leggere i tuoi messaggi!");
        }
    });
}

/**
 * controlla se il popup della risposta è visibile
 * in tal caso lo chiude
 * questa funzione viene chiamata quando si chiude il popup delle nuove richieste
 */
function checkInviaRisposta(){
    if($('.popupRisposta').is(':visible')){
        svuotaInviaRisposta();
        $(".popupRisposta").modal('hide');
    }
}

/**
 * visualizza il popup della risposta a una richiesta di appuntamento
 * @param {string} dataInvio la data del messaggio a cui vogliamo rispondere
 * @param {int} id id del paziente
 * @param {string} cognome cognome del paziente
 * @param {string} nome nome del paziente
 * @param {string} note le note del messaggio inviato dal paziente
 */
function visualizzaRichiesta(dataInvio, id, cognome, nome, note){
    svuotaInviaRisposta();
    $("#popupRisposta").modal('show');
    $("#lblCognomeNomePopupRisposta").html(cognome + " " + nome);
    $("#divRispostaMessaggio").html(note);
    $("#data").val(dataInvio);
    $("#idPazientePopupRisposta").val(id);
}

/**
 * visualizza il popup della risposta a un messaggio
 * @param {string} dataInvio la data del messaggio a cui vogliamo rispondere
 * @param {int} id id del paziente
 * @param {string} cognome cognome del paziente
 * @param {string} nome nome del paziente
 * @param {string} note le note del messaggio inviato dal paziente
 */
function visualizzaMessaggio(dataInvio, id, cognome, nome, note){
    $("#txtRispostaMessaggio").val("");
    $("#popupRispostaMessaggio").modal('show');
    $("#lblCognomeNomePopupRispostaMessaggio").html(cognome + " " + nome);
    $("#divRispostaMessaggio2").html(note);
    $("#dataMessaggio").val(dataInvio);
    $("#idPazientePopupRispostaMessaggio").val(id);
}

/**
 * salva sul db la risposta a una richiesta di appuntamento della dottoressa
 */
function inviaRisposta(){
    var succ = checkfieldRisposta();
    if(succ != false && succ != 2){
        var id = $("#idPazientePopupRisposta").val();
        var dataOra = $("#data").val();
        var data1 = $("#txtData1Risposta").val();
        var data2 = $("#txtData2Risposta").val();
        var data3 = $("#txtData3Risposta").val();
        var ora1 = $("#txtOra1Risposta").val();
        var ora2 = $("#txtOra2Risposta").val();
        var ora3 = $("#txtOra3Risposta").val();
        var note = $("#txtRisposta").val();

        var dataOra1 = String(giraDataDb(data1)) + " " + String(ora1).substring(0,2) + ":" + String(ora1).substring(5,7) + ":00";
        var dataOra2 = String(giraDataDb(data2)) + " " + String(ora2).substring(0,2) + ":" + String(ora2).substring(5,7) + ":00";
        var dataOra3 = String(giraDataDb(data3)) + " " + String(ora3).substring(0,2) + ":" + String(ora3).substring(5,7) + ":00";

        if(dataOra2 == "-- ::00"){
            dataOra2 = false;
        }
        if(dataOra3 == "-- ::00"){
            dataOra3 = false;
        }
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "inviaRisposta", id:id, dataOra:dataOra, dataOra1:dataOra1, dataOra2:dataOra2, dataOra3:dataOra3, descrizione:note},
            success: function(response) {
                $("#popupRisposta").modal('hide');
                richiesteAppuntamento();
                initPopupGenerico("Risposta inviata con successo!");
                initBadge();
            },
            error: function(){
                initPopupGenerico("Errore lato server, non è stato possibile rispondere a questa richiesta!");
            }
        });
    }else{
        if(succ == 2){
            initPopupGenerico("Attenzione, è stata immessa più volte la stessa data con la stessa ora.");
        }else{
            initPopupGenerico("E\' necessario compilare correttamente tutti i campi...");
        }
    }
}

/**
 * salva sul db la risposta a un messaggio della dottoressa
 */
function inviaRispostaMessaggio(){
    var id = $("#idPazientePopupRispostaMessaggio").val();
    var dataOra = $("#dataMessaggio").val();
    var note = $("#txtRispostaMessaggio").val();

    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inviaRispostaMessaggio", id:id, dataOra:dataOra, descrizione:note},
        success: function(response) {
            console.log(response);
            $("#popupRispostaMessaggio").modal('hide');
            richiesteAppuntamento();
            initPopupGenerico("Risposta inviata con successo!");
            initBadge();
        },
        error: function(){
            initPopupGenerico("Errore lato server, non è stato possibile rispondere a questo messaggio!");
        }
    });
}

/**
 * controlla che la risposta ad una richiesta di appuntamento sia coerente:
 * 1. deve esserci almeno una data e ora
 * 2. può esserci la stessa data su due campi diversi ma con ora diversa
 */
function checkfieldRisposta(){
    var ret = true;
    var data1 = $("#txtData1Risposta").val();
    var data2 = $("#txtData2Risposta").val();
    var data3 = $("#txtData3Risposta").val();
    var ora1 = $("#txtOra1Risposta").val();
    var ora2 = $("#txtOra2Risposta").val();
    var ora3 = $("#txtOra3Risposta").val();

    if(data1 == ""){
        ret = false;
    }
    if(ora1 == ""){
        ret = false;
    }
    if((ora2 == "" && data2 != "") || (ora2 != "" && data2 == "")){
        ret = false;
    }
    if((ora3 == "" && data3 != "") || (ora3 != "" && data3 == "")){
        ret = false;
    }
    if(data1 == data2 && ora1 == ora2){
        ret = 2;
    }
    if(data1 == data3 && ora1 == ora3){
        ret = 2;
    }
    if(data2 != ""){
        if(data2 == data3 && ora2 == ora3){
            ret = 2;
        }
    }
    
    return ret;
}

//Svuota i campi del popup inviaRisposta
function svuotaInviaRisposta(){
    $("#txtData2Risposta").val("");
    $("#txtOra2Risposta").val("");
    $("#txtData3Risposta").val("");
    $("#txtOra3Risposta").val("");
    $("#txtRisposta").val("");
}

//Inizializza il popup generico con il messaggio ricevuto
function initPopupGenerico(msg){
    $("#bodyPopupGenerico").html(msg);
    $("#popupGenerico").modal('show');
}