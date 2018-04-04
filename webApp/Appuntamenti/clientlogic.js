function initForm(){
    $.datepicker.setDefaults($.datepicker.regional['it']); 
    $('#txtDataAppuntamento').datepicker({ maxDate: new Date, minDate: new Date(1850,04,24) });

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

function mostraDettagliAppuntamento() {
    document.getElementById("dettagliAppuntamento").style.width = "500px";
    document.getElementById("dettagliAppuntamento").style.marginTop = "55px";
}

function nascondiDettagliAppuntamento() {
    document.getElementById("dettagliAppuntamento").style.width = "0";
}

