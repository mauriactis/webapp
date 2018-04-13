$(document).ready(function(){
    $("#vsblPage").dblclick(function() {
        if(document.getElementById("sideDettagliAppuntamento").style.width == "500px"){
            nascondiDettagliAppuntamento();
        }
    });
});

function initForm(){
    $.datepicker.setDefaults($.datepicker.regional['it']);
    $('#pckrDataAppuntamento').datepicker({minDate: new Date()});
    $('#pckrDataAppuntamento').datepicker({inline: true,sideBySide: true});

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
    $('#txtDataNuovoAppuntamento').datepicker({ maxDate: new Date, minDate: new Date(1850,04,24) });
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