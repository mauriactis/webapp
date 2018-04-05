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