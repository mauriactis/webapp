$(document).ready(function(){
    $("#vsblPage").dblclick(function() {
        if(document.getElementById("sideDettagliAppuntamento").style.width == "500px"){
            nascondiDettagliAppuntamento();
        }
    });
});

function initForm(){
    var oggi = new Date();
    $.datepicker.setDefaults($.datepicker.regional['it']);
    $('#pckrDataAppuntamento').datepicker({minDate: oggi});
    $('#pckrDataAppuntamento').datepicker({inline: true,sideBySide: true});

    var giorni = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    var giornoSett = oggi.getDay() - 1;
    var nomeGiorno = giorni[giornoSett];
    var riga = "";
    var offsetNeg = giornoSett;
    var offsetPos = 1;
    //Ciclo che scorre i giorni della settimana e imposta come attivo quello di oggi
    for(var i = 0;i < 7;i++){
        if(giorni[i] == nomeGiorno){
            riga += '<li class="active"><a href="" id="' + oggi + '" onclick="cerca'+nomeGiorno+'();">' + nomeGiorno + '</a></li>';
        }else{
            //devo dichiararla qua perchè serve tutte le volte la data di oggi, se usassi sempre una variabile dichiarata fuori dal for(es. "oggi")
            //facendo la setDate viene poi sballata il giro dopo
            var data = new Date();
            //Siamo in una data precedente ad oggi
            if(i<giornoSett){
                var id = new Date(data.setDate(data.getDate() - offsetNeg));
                offsetNeg--;
            }else{
                var id = new Date(data.setDate(data.getDate() + offsetPos));
                offsetPos++;
            }
            console.log("Neg "+ offsetNeg + " data " + id);
            console.log("Pos "+ offsetPos + " data " + id);
            riga += '<li><a href="" id="' + id + '" onclick="cerca' + giorni[i] + '();">' + giorni[i] + '</a></li>';
            
            
        }
        
    }
    $("#giorniAppuntamenti").html(riga);

    //caricaAppuntamenti di oggi

    startTime();
}

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

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function giraDataUmano(date){
    return date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
}

function giraDataDb(date){
    return date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
}

function stampaData(){
    var data = document.getElementById ("pckrDataAppuntamento").value;
    console.log(data);
}

function mostraDettagliAppuntamento(){
    document.getElementById("sideDettagliAppuntamento").style.width = "500px";
    document.getElementById("sideDettagliAppuntamento").style.marginTop = "70px";
}

function nascondiDettagliAppuntamento(){
    $("#txtAppuntiDettagliAppuntamento").val("");
    svuotaAppunti();
    document.getElementById("sideDettagliAppuntamento").style.width = "0";
}

function salvaDettagliAppuntamento(){
    var appunti = $("#txtAppuntiDettagliAppuntamento");
    if(checkfieldsDettagliAppuntamento(appunti)){
        /*$.ajax({  
            type: "POST", 
            url: "./serverlogic.php",
            data: {azione: "inserisciAppuntiAppuntamento", appunti:appunti},
            success: function(response) {
                alert("Memorizzazione avvenuta con successo!");
            },
            error: function(){
                alert("Errore");
            }
        });*/
    }else{
        alert("Alcuni campi non sono stati completati correttamente...");
    }
}

//Restituisce vero se va tutto bene
function checkfieldsDettagliAppuntamento(appunti){
    var ret = true;

    if(appunti.val() == ""){
        appunti.css("background-color", "rgb(255,147,147)");
        ret = false;
    }

    return ret;
}

function svuotaAppunti(){
    document.getElementById("txtAppuntiDettagliAppuntamento").style.backgroundColor = "white";
}

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