var options = { twentyFour: true, //Display 24 hour format, defaults to false
    title: 'Ora', //The Wickedpicker's title,
    showSeconds: false, //Whether or not to show seconds,
    minutesInterval: 1, //Change interval for minutes, defaults to 1
    show: null, //A function to be called when the Wickedpicker is shown
    clearable: false, //Make the picker's input clearable (has clickable "x")
    }; 

$(document).ready(function(){
    $("#vsblPage").dblclick(function() {
        nascondiDettagliAppuntamento();
    });
});


//da rivedere i nomi
function initForm(){
    initPillsGiorni();
    startTime();
    $('.txtData').datepicker({minDate: new Date});
    $('.dataRisposta1').datepicker("setDate", new Date());
    $('.txtOra').wickedpicker(options);
}

function initPillsGiorni(caricaPagina = 1){

    if(caricaPagina == 1){
        console.log("dataOggi");
        laDataEOggi();
    }else{
        console.log("passo di qua");
        laDataEStataSelezionata(caricaPagina);
    }
}


function laDataEOggi(){
        var oggi = new Date();
        $.datepicker.setDefaults($.datepicker.regional['it']);
        $('#pckrDataAppuntamento').datepicker({minDate: oggi});
        $('#pckrDataAppuntamento').datepicker({inline: true,sideBySide: true});
    
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
                riga += '<li class="active"><a href="" id="selezionato" data-toggle="tab" onclick="caricaAppuntamenti(' + oggi.substring(0,4) + "," + oggi.substring(5,7) + "," + oggi.substring(8,10) + ');">' + nomeGiorno + '</a></li>';
            }else{
                //devo dichiararla qua perchè serve tutte le volte la data di oggi, se usassi sempre una variabile dichiarata fuori dal for(es. "oggi")
                //facendo la setDate viene poi sballata il giro dopo
                var data = new Date();
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
    
                //problema, passa la data ma poi fa la sotrazione sto bau bau
                riga += '<li><a href="" data-toggle="tab" onclick="caricaAppuntamenti(' + anno + ", " + mese + ", " + giorno + ');">' + giorni[i] + '</a></li>';
            }
            
        }
        $("#giorniAppuntamenti").html(riga);
        $('#selezionato').click();
}

function laDataEStataSelezionata(caricaPagina){
        var giorni = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
        //permette di vedere anche la domenica
        //se carica pagina non ha valore allora si sta ricaricando la pagina altrimenti la funzione è stata evocata
        //da btnOK sotto al datepicker e aggiorna le pills di conseguenza
        var giornoSett = (caricaPagina.getDay() + 6) % 7;
        var nomeGiorno = giorni[giornoSett];
        var riga = "";
        var offsetNeg = giornoSett;
        var offsetPos = 1;
        caricaPagina = String(formattaData(caricaPagina));
        //Ciclo che scorre i giorni della settimana e imposta come attivo quello di oggi
        for(var i = 0;i < 7;i++){
            if(giorni[i] == nomeGiorno){
                riga += '<li class="active"><a href="" id="selezionato" data-toggle="tab" onclick="caricaAppuntamenti(' + caricaPagina.substring(0,4) + "," + caricaPagina.substring(5,7) + "," + caricaPagina.substring(8,10) + ');">' + nomeGiorno + '</a></li>';
            }else{
                //devo dichiararla qua perchè serve tutte le volte la data di oggi, se usassi sempre una variabile dichiarata fuori dal for(es. "oggi")
                //facendo la setDate viene poi sballata il giro dopo
                var data = new Date(caricaPagina);
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
    
                //problema, passa la data ma poi fa la sotrazione sto bau bau
                riga += '<li><a href="" data-toggle="tab" onclick="caricaAppuntamenti(' + anno + ", " + mese + ", " + giorno + ');">' + giorni[i] + '</a></li>';
            }
            
        }
        $("#giorniAppuntamenti").html(riga);
        $('#selezionato').click();
}

//restituisce la data nel formato yyyy-mm-dd
function formattaData(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

//fa iniziare l' orologio in cima alla pagina
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('lblOraAttuale').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

//controlla se il numero è minore di 10 ne aggiunge uno 0 davanti
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

//gira la data in gg/mm/aaaa
function giraDataUmano(date){
    return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
}

//gira la data in aaaa/mm/gg
function giraDataDb(date){
    return date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
}

//Ancora da cambiare, mostra il sidenav relativo ad un appuntamento
//   #1111111111111111111111
//   #1111111111111111111111
//   #1111111111111111111111
//   #1111111111111111111111
//   #1111111111111111111111
function mostraDettagliAppuntamento(i, dataOra){
    $("#idPaziente").val(i);
    $("#dataIntervento").val(String(dataOra));
    //idea ma non mi piace: hidden nella pagina che ha l' id della pill e lo aggiorno quando clicco su una nuova pill
    $.ajax({  

        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "mostraDettagliAppuntamento", id:i, data:dataOra},
        success: function(response) {
            var dettagli = JSON.parse (response);

            $("#dettagliAppuntamentoUltimaVolta").html(dettagli[0].Descrizione);
            $("#dettagliAppuntamentoDaFare").html(dettagli[1].Note);
        },
        error: function(){
            initPopupGenerico("Errore lato server.");
        }
    });

    $("#divDettagliAppuntamento").fadeIn();
}


//nasconde il sidenav
function nascondiDettagliAppuntamento(){
    $("#divDettagliAppuntamento").fadeOut();
}

//funzione che inizializza il popup per inserire un nuovo appuntamento
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
                // cmbPersone.options[a] = new Option(persone[a].NomeCognome, persone[a].ID);
            }
            $( "#txtPersonaNuovoAppuntamento" ).autocomplete({source: array});
        },
        error: function(){
            initPopupGenerico("Errore lato server.");
        }
    });
}

function svuotaNuovoAppuntamento(){
    $('#txtPersonaNuovoAppuntamento').val("");
    $('#txtDataNuovoAppuntamento').val("");
    $('#txtOraNuovoAppuntamento').val("");
    $('#txtNoteNuovoAppuntamento').val("");
}

function eliminaAppuntamento(){
    var id = $("#idPaziente").val();
    var dataOra = $("#dataIntervento").val();
    $.ajax({  

        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "cancellaAppuntamento", id:id, data:dataOra},
        success: function(response) {
            nascondiDettagliAppuntamento();
            $("#selezionato").click();
        },
        error: function(){
            initPopupGenerico("Errore lato server.");
        }
    });

    $("#divDettagliAppuntamento").fadeIn();
}

//salva un nuovo appuntamento
function salvaAppuntamento(){
    var idPersona = document.getElementById("txtPersonaNuovoAppuntamento").value.split(", ")[1];
    var data = giraDataDb(document.getElementById("txtDataNuovoAppuntamento").value);
    var timepicker = $('#txtOraNuovoAppuntamento').wickedpicker();
    var ora = timepicker.wickedpicker('time');
    var descrizione = document.getElementById("txtNoteNuovoAppuntamento").value;

    dataOrario = data + " " + ora.substring(0,2) + ":" + ora.substring(5,7) + ":00";
     $.ajax({  
         type: "POST", 
         url: "./serverlogic.php",
         data: {azione: "inserisciNuovoAppuntamento", id:idPersona, dataOra:dataOrario, descrizione:descrizione},
         success: function(response) {
            console.log(response);
            initPopupGenerico("Appuntamento salvato con successo!");
            $('#selezionato').click();
         },
         error: function(){
             initPopupGenerico("Errore lato server.");
         }
     });
}

//carica gli appuntamenti nella tabella in centro alla pagina a seconda del giorno selezionato dalle pills
function caricaAppuntamenti(anno, mese, giorno){
    //var data = anno + "-" + mese + "-" + giorno;
    var data = anno + "-" + mese + "-" + giorno;
    console.log("data: " + data);
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaAppuntamenti", data:data},
        success: function(response) {
            console.log(response);
            var appuntamenti = JSON.parse (response);
            var riga = "";
            var dataOra = "";
            for (var a = 0; a < appuntamenti.length; a ++)
            {
                dataOra = String(data) + " " + String(appuntamenti[a].Ora);
                riga += "<tr><td>" + 
                    appuntamenti[a].Ora + "</td><td>" +
                    appuntamenti[a].Cognome + " " + appuntamenti[a].Nome + "</td><td>" +
                    '<button class="btn btn-danger" onclick="mostraDettagliAppuntamento(' + appuntamenti[a].ID + ",'" + String(dataOra) + '\');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>"; 
                console.log(String(data));
            }
            if(riga != ""){
                $("#tblAppuntamentiBody").html(riga);
            }else{
                $("#tblAppuntamentiBody").html("<tr><td colspan=\"3\">Non sono stati fissati appuntamenti per oggi.</td></tr>");
            }
        },
        error: function(){
            initPopupGenerico("Errore lato server.");
        }
    });
}

function visualizzaAppuntamentiData(){
    var selezione = $(pckrDataAppuntamento).val();
    selezione = new Date(giraDataDb(selezione));
    initPillsGiorni(selezione);
}

function richiesteAppuntamento(){
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "visualizzaRichiesteAppuntamento"},
        success: function(response) {
            console.log(response);
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
            initPopupGenerico("Errore lato server.");
        }
    });
}

function checkInviaRisposta(){
    if($('#popupRisposta').is(':visible')){
        svuotaInviaRisposta();
        $("#popupRisposta").modal('hide');
    }
}

function visualizzaRichiesta(dataInvio, id, cognome, nome, note){
    $("#popupRisposta").modal('show');
    $("#lblCognomeNomePopupRisposta").html(cognome + " " + nome);
    $("#divRispostaMessaggio").html(note);
    $("#data").val(dataInvio);
    $("#idPazientePopupRisposta").val(id);
}

function inviaRisposta(){
    if(checkfieldRisposta()){
        var id = $("#idPazientePopupRisposta").val();
        var dataOra = $("#data").val();
        console.log(dataOra);
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

        console.log(dataOra1);
        console.log(dataOra2);
        console.log(dataOra3);
        $.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "inviaRisposta", id:id, dataOra:dataOra, dataOra1:dataOra1, dataOra2:dataOra2, dataOra3:dataOra3, descrizione:note},
            success: function(response) {
                $("#popupRisposta").modal('hide');
                richiesteAppuntamento();
                initPopupGenerico("Risposta inviata con successo!");
            },
            error: function(){
                initPopupGenerico("Errore lato server.");
            }
        });
    }else{
        initPopupGenerico("E\' necessario compilare tutti i campi...");
    }
}

function checkfieldRisposta(){
    var ret = true;
    var data1 = $("#txtData1Risposta").val();
    var ora1 = $("#txtOra1Risposta").val();

    if(data1 == ""){
        ret = false;
    }
    if(ora1 == ""){
        ret = false;
    }

    return ret;
}

function svuotaInviaRisposta(){
    $("#txtData2Risposta").val("");
    $("#txtOra2Risposta").val("");
    $("#txtData3Risposta").val("");
    $("#txtOra3Risposta").val("");
    $("#txtRisposta").val("");
}

function initPopupGenerico(msg){
    $("#bodyPopupGenerico").html(msg);
    $("#popupGenerico").modal('show');
}