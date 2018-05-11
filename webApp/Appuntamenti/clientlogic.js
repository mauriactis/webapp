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
    $(".txtData").datepicker({minDate: new Date});
    $(".txtOra").wickedpicker(options);
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
function mostraDettagliAppuntamento(i, data){
    console.log(i + " " + data);
    $("#idPaziente").val(i);
    $("#dataIntervento").val(String(data));
    //idea ma non mi piace: hidden nella pagina che ha l' id della pill e lo aggiorno quando clicco su una nuova pill
    $.ajax({  

        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "mostraDettagliAppuntamento", id:i, data:data},
        success: function(response) {
            var dettagli = JSON.parse (response);

            $("#dettagliAppuntamentoUltimaVolta").html(dettagli[0].Descrizione);
            $("#dettagliAppuntamentoDaFare").html(dettagli[1].Note);
        },
        error: function(){
            alert("Errore");
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
    $('#txtDataNuovoAppuntamento').val("");
    $('#txtOraNuovoAppuntamento').val("");
    $('#txtNoteNuovoAppuntamento').val("");
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
            alert("Errore");
        }
    });
}

function eliminaAppuntamento(){
    /*$.ajax({  

        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "cancellaAppuntamento", id:i, data:data},
        success: function(response) {
            var dettagli = JSON.parse (response);

            $("#dettagliAppuntamentoUltimaVolta").html(dettagli[0].Descrizione);
            $("#selezionato).click();
        },
        error: function(){
            alert("Errore");
        }
    });*/

    $("#divDettagliAppuntamento").fadeIn();
}

//salva un nuovo appuntamento
function salvaAppuntamento(){
    var idPersona = document.getElementById("txtPersonaNuovoAppuntamento").value.split(", ")[1];
    var data = giraDataDb(document.getElementById("txtDataNuovoAppuntamento").value);
    var timepicker = $('#txtOraNuovoAppuntamento').wickedpicker();
    var ora = timepicker.wickedpicker('time');
    var descrizione = document.getElementById("txtNoteNuovoAppuntamento").value;
    console.log(ora);
    console.log(idPersona);
    console.log(data);
    console.log(descrizione);
    // $.ajax({  
    //     type: "POST", 
    //     url: "./serverlogic.php",
    //     data: {azione: "salvaNuovoAppuntamento", id:idPersona, data:data, descrizione:descrizione},
    //     success: function(response) {
    //         alert("Appuntamento salvato con successo!");
    //     },
    //     error: function(){
    //         alert("Errore");
    //     }
    // });
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
            var appuntamenti = JSON.parse (response);
            var riga = "";
            for (var a = 0; a < appuntamenti.length; a ++)
            {
                riga += "<tr><td>" + 
                    appuntamenti[a].Ora + "</td><td>" +
                    appuntamenti[a].Cognome + " " + appuntamenti[a].Nome + "</td><td>" +
                    '<button class="btn btn-danger" onclick="mostraDettagliAppuntamento(' + appuntamenti[a].ID + "," + String(data) + ');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>"; 
                console.log(String(data));
            }
            if(riga != ""){
                $("#tblAppuntamentiBody").html(riga);
            }else{
                $("#tblAppuntamentiBody").html("<tr><td>Non sono stati fissati appuntamenti per oggi.</td></tr>");
            }
        },
        error: function(){
            alert("Errore");
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
            for (var a = 0; a < richieste.length; a ++)
            {
                riga += "<tr style=\"font-weight:bold\"><td>" + richieste[a].Cognome + " " + richieste[a].Nome + "</td><td>" +
                    '<button class="btn btn-success" onclick="visualizzaRichiesta(' + richieste[a].AnaID + ',' + richieste[a].Cognome + ',' + richieste[a].Nome + ',\'' + richieste[a].Note +'\');"><span class="glyphicon glyphicon-share-alt"></span></button>' + "</td></tr>"; 
            }
            if(riga != ""){
                $("#tblRichiesteBody").html(riga);
            }else{
                $("#tblRichiesteBody").html("<tr><td>Non sono Presenti richieste.</td></tr>");
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}


function visualizzaRichiesta(id, cognome, nome, note){
    $("#popupRisposta").modal('show');
    $("#lblCognomeNomePopupRisposta").html(cognome + " " + nome);
    $("#divRispostaMessaggio").html(note);
    /*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "inviaRisposta"},
        success: function(response) {
            console.log(response);
            var richieste = JSON.parse (response);
            var riga = "";
            for (var a = 0; a < richieste.length; a ++)
            {
                riga += "<tr><td>" + richieste[a].Cognome + " " + richieste[a].Nome + "</td><td>" +
                    '<button class="btn btn-success" onclick="visualizzaRichiesta(' + richieste[a].AnaID + ');"><span class="glyphicon glyphicon-share-alt"></span></button>' + "</td></tr>"; 
            }
            if(riga != ""){
                $("#tblRichiesteBody").html(riga);
            }else{
                $("#tblRichiesteBody").html("<tr><td>Non sono Presenti richieste.</td></tr>");
            }
        },
        error: function(){
            alert("Errore");
        }
    });*/
}