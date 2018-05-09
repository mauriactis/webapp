<!DOCTYPE html> 
<?php
session_start();
if(isset($_SESSION['id']) && $_SESSION['id'] === "CiSiamo"){
  header("Location: ./Homepage/index.php");
}
?>

<html> 
   <head> 
      <title>Benvenuto</title> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="./cssEsterno/bootstrap.min.css" rel="stylesheet">
      <script src="./jsEsterno/jquery.js"></script>
      <script src="./jsEsterno/bootstrap.min.js"></script>
      <script src="./loginlogic.js"></script> 
   </head> 
   <body> 
    <div class="container">
    <!-- <form class="form-horizontal"> -->
        <fieldset>
        <legend>Benvenuto</legend>
        <div class="form-group">
          <label class="col-md-4 control-label" for="username">Username</label>  
          <div class="col-md-5">
          <input id="username" name="username" placeholder="La tua mail" class="form-control input-md" required="" type="text">
            
          </div>
        </div>
        <br><br>
        <div class="form-group">
          <label class="col-md-4 control-label" for="password">Password</label>
          <div class="col-md-5">
            <input id="password" name="password" placeholder="password" class="form-control input-md" required="" type="password">
          </div>
        </div>
        <br><br>
        <div class="form-group">
          <div class="col-md-4">
            <button id="btnAccedi" name="btnAccedi" class="btn btn-primary">Accedi</button>
          </div>
        </div>
        
        </fieldset>
        <!-- </form> -->
        <div class="alert alert-warning" role="alert" id="alert_sbagliato"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Username e/o password errati!</div>
        <div class="alert alert-error" role="alert" id="alert_errore"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>C'è stato un errore nella connessione col server, riprova!</div>
        
    
    </div>
   </body> 
</html> 