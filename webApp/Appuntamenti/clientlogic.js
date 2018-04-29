$(document).ready(function(){
    $("#vsblPage").dblclick(function() {
        if(document.getElementById("sideDettagliAppuntamento").style.width == "500px"){
            nascondiDettagliAppuntamento();
        }
    });
});


//da rivedere i nomi
function initForm(){
    initPillsGiorni();
    startTime();
}

function initPillsGiorni(caricaPagina = 1){

    if(caricaPagina == 1){
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
        //Ciclo che scorre i giorni della settimana e imposta come attivo quello di oggi
        for(var i = 0;i < 7;i++){
            if(giorni[i] == nomeGiorno){
                riga += '<li class="active"><a href="" id="' + formattaData(oggi) + '" onclick="caricaAppuntamenti(' + formattaData(oggi) + ');">' + nomeGiorno + '</a></li>';
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
                riga += '<li><a href="" data-toggle="tab" onclick="caricaAppuntamenti(' + anno + mese + giorno + ');">' + giorni[i] + '</a></li>';
            }
            
        }
        $("#giorniAppuntamenti").html(riga);
    
        //caricaAppuntamenti di oggi
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
        //Ciclo che scorre i giorni della settimana e imposta come attivo quello di oggi
        for(var i = 0;i < 7;i++){
            if(giorni[i] == nomeGiorno){
                riga += '<li class="active"><a href="" id="' + formattaData(caricaPagina) + '" onclick="caricaAppuntamenti(' + formattaData(caricaPagina) + ');">' + nomeGiorno + '</a></li>';
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
                console.log(id);
    
                var anno = id.substring(0,4);
                var mese= id.substring(5,7);
                var giorno= id.substring(8,10);
    
                //problema, passa la data ma poi fa la sotrazione sto bau bau
                riga += '<li><a href="" data-toggle="tab" onclick="caricaAppuntamenti(' + anno + mese + giorno + ');">' + giorni[i] + '</a></li>';
            }
            
        }
        $("#giorniAppuntamenti").html(riga);
    
        //caricaAppuntamenti di oggi
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
function mostraDettagliAppuntamento(i){
    //Data è l' id della tab attiva, come faccio a prenderlo??

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

    document.getElementById("sideDettagliAppuntamento").style.width = "500px";
    document.getElementById("sideDettagliAppuntamento").style.marginTop = "70px";
}


//nasconde il sidenav
function nascondiDettagliAppuntamento(){
    document.getElementById("sideDettagliAppuntamento").style.width = "0";
}

//funzione che inizializza il popup per inserire un nuovo appuntamento
function nuovoAppuntamento(){
    $.datepicker.setDefaults($.datepicker.regional['it']); 
    $('#txtDataNuovoAppuntamento').datepicker({minDate: new Date});
    $.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "caricaNomiPersone"},
        success: function(response) {
            var persone = JSON.parse (response);
            var cmbPersone = document.getElementById("txtPersonaNuovoAppuntamento");
            for (var a = 0; a < persone.length; a ++){
                cmbPersone.options[a] = new Option(persone[a].NomeCognome, persone[a].ID);
            }
        },
        error: function(){
            alert("Errore");
        }
    });
}

//salva un nuovo appuntamento
function salvaAppuntamento(){
    var idPersona = document.getElementById("txtPersonaNuovoAppuntamento").value;
    var data = giraDataDb(document.getElementById("txtDataNuovoAppuntamento").value);
    var descrizione = document.getElementById("txtNoteNuovoAppuntamento").value;

    /*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "salvaNuovoAppuntamento", id:idPersona, data:data, descrizione:descrizione},
        success: function(response) {
            alert("Appuntamento salvato con successo!");
        },
        error: function(){
            alert("Errore");
        }
    });*/
}

//carica gli appuntamenti nella tabella in centro alla pagina a seconda del giorno selezionato dalle pills
function caricaAppuntamenti(anno, mese, giorno){
    var data = anno + "-" + mese + "-" + giorno;
    /*$.ajax({  
        type: "POST", 
        url: "./serverlogic.php",
        data: {azione: "salvaNuovoAppuntamento", data:data},
        success: function(response) {
            var appuntamenti = JSON.parse (response);
            var riga = "";
            for (var a = 0; a < appuntamenti.length; a ++)
            {
                riga += "<tr><td>" + 
                    appuntamenti[a].Ora + "</td><td>" +
                    appuntamenti[a].Cognome + appuntamenti[a].Nome + "</td><td>" +
                    '<button class="btn btn-danger" onclick="mostraDettagliAppuntamento(' + appuntamenti[a].AnaID + ');"><span class="glyphicon glyphicon-eye-open"></span></button>' + "</td></tr>"; 
            }
            $("#tblAppuntamentiBody").html(riga);
        },
        error: function(){
            alert("Errore");
        }
    });*/
}

function visualizzaAppuntamentiData(){
    var selezione = $(pckrDataAppuntamento).val();
    selezione = new Date(giraDataDb(selezione));
    initPillsGiorni(selezione);
}