$(document).ready(function(){
    $("#alert_sbagliato").hide();
    $("#alert_errore").hide();

    $("#username").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btnAccedi").click();
        }
    });

    $("#password").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#btnAccedi").click();
        }
    });

    $("#btnAccedi").click(function(){
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username);
        $.ajax({  
            type: "POST", 
            url: "./loginlogic.php",
            data: {chiave: "Gino", username:username, password:password},
            success: function(response) {
                console.log(response);
                switch(response){
                    case '-2':
                        console.log("username o password errati");
                        $("#alert_sbagliato").show();
                    break;
                    case '-1':
                        console.log("errore");
                        $("#alert_errore").show();
                    break;
                    case '0':
                        console.log("tutto ok");
                        location.href="./Homepage/index.php";
                    break;
                }
            },
            error: function(){
                alert("Errore");
            }
        });
    });




   
});