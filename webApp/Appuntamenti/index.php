<?php
session_start();
if(!isset($_SESSION['id']) || $_SESSION['id'] !== "CiSiamo"){
  header("Location: ../index.php");
}

?>

<!DOCTYPE html> 
<html> 
   <head> 
      <title>Appuntamenti</title> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="../cssEsterno/jquery-ui.css" rel="stylesheet">
      <link href="../cssEsterno/bootstrap.min.css" rel="stylesheet">
      <link href="../jsEsterno/timepicker/dist/wickedpicker.min.css" rel="stylesheet">
      <link id="styleCss" href="style.css" rel="stylesheet" type="text/css"/>



      <script src="../jsEsterno/jquery.js"></script>
      <script src="../jsEsterno/jquery-3.3.1.min.js"></script>
      <script src="../jsEsterno/jquery-1.12.4.js"></script>
      <script src="../jsEsterno/jquery-ui.js"></script>
      <script src="../jsEsterno/jquery.ui.datepicker-it.js"></script>
      <script src="../jsEsterno/bootstrap.min.js"></script>
      <script src="../jsEsterno/timepicker/dist/wickedpicker.min.js"></script>
      <script language="javascript" src="clientlogic.js"></script>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   </head> 
   <body onload="initForm();">
      
      <div id="mainDiv">
         <div id="vsblPage">
            <div id="divUpper">
               <table id="headerTbl">
                  <tr><td class="headerCol">
                     <button type="button" class="btn btn-primary" id="btnRichiesteAppuntamento" onclick="richiesteAppuntamento();" data-toggle="modal" data-target="#popupRichieste">Richieste appuntamento</button><span class="badge badge-notify" id="bdgRichieste">2</span>
                  </td><td class="headerCol">
                     <label id="lblOraAttuale"></label>
                  </td><td class="headerCol">
                     <button type="button" class="btn btn-success" id="btnNuovoAppuntamento" onclick="nuovoAppuntamento();" data-toggle="modal" data-target="#popupNuovoAppuntamento">Nuovo appuntamento</button>
                  </td></tr>
               </table>
            </div>
            <div class="container" id="body">
               <div id="divDatepicker">
                  <div style="overflow:hidden;">
                     <div class="form-group">
                         <div class="row">
                             <div class="col-md-8">
                                 <div id="pckrDataAppuntamento"></div>
                             </div>
                         </div>
                     </div>
                  </div>
                  <button type="button" class="btn btn-default" id="btnDatepickerOk" onclick="visualizzaAppuntamentiData();">Ok</button>
               </div>
               <div id="divAppuntamenti">
                  <ul id="giorniAppuntamenti" class="nav nav-pills">
                  </ul>
                  <table id="tblAppuntamenti" class="table table-hover table-bordered admin">
                     <thead>
                        <tr>
                           <th>Ora</th>
                           <th>Paziente</th>
                           <th>Mostra dettagli</th>
                        </tr>
                     </thead>
                     <tbody id="tblAppuntamentiBody">
                     </tbody>
                  </table>
               </div>
            </div>
            <div id="divDettagliAppuntamento" style="display: none;">
              <div id="sidenavBody">
                 <input type="text" id="idPaziente">
                 <input type="text" id="dataIntervento">
                 <a href="javascript:void(0)" class="closebtn" onclick="nascondiDettagliAppuntamento();">&times;</a>
                 <h3><label>L' ultima volta...</label></h3>
                 <div id="dettagliAppuntamentoUltimaVolta">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation   ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                 </div>
    
                 <h3><label>Da fare</label></h3>
                 <div id="dettagliAppuntamentoDaFare">
                 "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud   exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                 </div>
              </div>
              <button type="button" class="btn btn-danger" id="btnEliminaAppuntamento" onclick="eliminaAppuntamento();">Elimina appuntamento</button>
            </div>
         </div>
      </div>


      <div class="modal fade" id="popupNuovoAppuntamento" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="form-group">
                <label for="txtPersonaNuovoAppuntamento">Per chi desideri registrare il nuovo appuntamento?</label>
                <input type="text" class="form-control" id="txtPersonaNuovoAppuntamento"></input>
              </div>
              <div class="form-group">
                <label class="col-sm-2" for="txtDataNuovoAppuntamento">Data: </label>
                <div class="col-sm-4">
                  <input type="text" id="txtDataNuovoAppuntamento" class="form-control txtData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2" for="textinput">Ora: </label>
                <div class="col-sm-4">
                  <input type="text" id="txtOraNuovoAppuntamento" class="form-control txtOra">
                </div>
              </div> 
              <div class="form-group">
                <label for="txtNoteNuovoAppuntamento">Note:</label>
                <textarea class="form-control" rows="5" id="txtNoteNuovoAppuntamento"></textarea>
              </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onclick="salvaAppuntamento();" data-dismiss="modal"><span class="glyphicon glyphicon-floppy-disk"></span> Salva</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Annulla</button>
            </div>
          </div>
        </div>
      </div>

      


      <div class="modal fade" id="popupRichieste" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <label for="txtHeaderPopupRichieste">Messaggi in arrivo da:</label>
            </div>
            <div class="modal-body">
              <table class="table table-hover table-bordered admin">
                <tbody id="tblRichiesteBody">
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Esci</button>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="popupRisposta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <label>Richiesta di: <label id="lblCognomeNomePopupRisposta"></label></label>
              <div id="divRispostaMessaggio">
              </div>
              <textarea class="form-control" rows="7" id="txtRisposta" style="resize:none"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" onclick="inviaRisposta();" data-dismiss="modal">Invia</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Annulla</button>
            </div>
          </div>
        </div>
      </div>
  </body> 
</html>