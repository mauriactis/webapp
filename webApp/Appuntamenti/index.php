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
   <body>
      
      <div id="mainDiv">
         <div id="vsblPage">
            <div id="divUpper">
               <table id="headerTbl">
                  <tr><td class="headerCol">
                     <button type="button" class="btn btn-primary" id="btnRichiesteAppuntamento" onclick="richiesteAppuntamento();" data-toggle="modal" data-target="#popupRichieste">Richieste appuntamento <span class="badge badge-notify" id="bdgRichieste"></span></button>
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
                                 <div style="margin-top: 1.5em;" id="pckrDataAppuntamento"></div>
                             </div>
                         </div>
                     </div>
                  </div>
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
            <div id="divDettagliAppuntamento">
              <div id="sidenavBody">
                 <input type="hidden" id="idPaziente">
                 <input type="hidden" id="dataIntervento">
                 <p class="closebtn" onclick="nascondiDettagliAppuntamento();"><span class="glyphicon glyphicon-remove"></span></p>
                 <h3><label>L' ultima volta...</label></h3>
                 <div id="dettagliAppuntamentoUltimaVolta">
                 </div>
    
                 <h3><label>Da fare</label></h3>
                 <div id="dettagliAppuntamentoDaFare">
                 </div>
              <button type="button" class="btn btn-danger" id="btnEliminaAppuntamento" onclick="eliminaAppuntamento();">Elimina appuntamento</button>
              </div>
            </div>
         </div>
      </div>

      <!-- Popup che permette di inserire i dati relativi ad un nuovo appuntamento -->
      <div class="modal fade" id="popupNuovoAppuntamento" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <div class="form-group">
                <label for="txtPersonaNuovoAppuntamento">Per chi desideri registrare il nuovo appuntamento?</label>
                <input type="text" class="form-control" onclick="svuotaPersona();" id="txtPersonaNuovoAppuntamento"></input>
              </div>
              <div class="form-group">
                <label class="col-sm-2" for="txtDataNuovoAppuntamento">Data: </label>
                <div class="col-sm-4">
                  <input type="text" id="txtDataNuovoAppuntamento" onclick="svuotaData();" class="form-control txtData">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2" for="textinput">Ora: </label>
                <div class="col-sm-4">
                  <input type="text" id="txtOraNuovoAppuntamento" onclick="svuotaOra();" class="form-control txtOra">
                </div>
              </div> 
              <div class="form-group">
                <label for="txtNoteNuovoAppuntamento">Note:</label>
                <textarea class="form-control" rows="5" id="txtNoteNuovoAppuntamento"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onclick="salvaAppuntamento();"><span class="glyphicon glyphicon-floppy-disk"></span> Salva</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Annulla</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Popup che permette di visualizzare i messaggi/richieste in arrivo -->
      <div class="modal fade" id="popupRichieste" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <label style="margin-left: 1em; margin-top: 1em;" class="lblPopupRichieste" for="txtHeaderPopupRichieste">Richieste in arrivo:</label>
            <div class="modal-body" id="bodyPopupRichieste">
              <table class="table table-hover table-bordered admin">
                <tbody id="tblRichiesteBody">
                </tbody>
              </table>
            </div>
            <hr>
            <label class="lblPopupRichieste" for="txtHeaderPopupRichieste">Messaggi in arrivo:</label>
            <div class="modal-body" id="bodyPopupMessaggi">
              <table class="table table-hover table-bordered admin">
                <tbody id="tblMessaggiBody">
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" onclick="checkInviaRisposta();" data-dismiss="modal">Esci</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Popup che permette di rispondere ad una richiesta -->
      <div class="modal fade popupRisposta" id="popupRisposta" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <input type="hidden" id="idPazientePopupRisposta">
              <input type="hidden" id="data">
              <label>Richiesta di: <label id="lblCognomeNomePopupRisposta"></label></label><br>
              <label>Testo della richiesta</label>
              <div id="divRispostaMessaggio">
              </div><br>
              <table id="tblDateOreProposte">
                <tr>
                  <td>
                    <label for="textinput">Data 1: </label>
                  </td>
                  <td>
                    <input type="text" class="form-control txtData dataRisposta dataRisposta1" id="txtData1Risposta">
                  </td>
                  <td>
                    <label for="textinput">Ora 1: </label>
                  </td>
                  <td>
                    <input type="text" class="form-control txtOra txtOra1" id="txtOra1Risposta">
                  </td>
                </tr>
                <tr>
                  <td> 
                    <label for="textinput">Data 2: </label>
                  </td>
                  <td>
                    <input type="text" class="form-control txtData dataRisposta" id="txtData2Risposta" onclick="this.select();">
                  </td>
                  <td>
                    <label for="textinput">Ora 2: </label>
                  </td>
                  <td>
                    <input type="text" class="form-control txtOra" id="txtOra2Risposta" onclick="this.select();">
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="textinput">Data 3: </label>
                  </td>
                  <td>
                    <input type="text" class="form-control txtData dataRisposta" id="txtData3Risposta" onclick="this.select();">
                  </td>
                  <td>
                    <label for="textinput">Ora 3: </label>
                  </td>
                  <td>
                    <input type="text" class="form-control txtOra" id="txtOra3Risposta" onclick="this.select();">
                  </td>
                </tr>
              </table>
              <label for="textinput">Note</label>
              <textarea class="form-control" rows="7" id="txtRisposta" style="resize:none"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" onclick="inviaRisposta();">Invia</button>
              <button type="button" class="btn btn-default" onclick="svuotaInviaRisposta();" data-dismiss="modal">Annulla</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Popup che permette di rispondere ad un messaggio -->
      <div class="modal fade popupRisposta" id="popupRispostaMessaggio" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              <input type="hidden" id="idPazientePopupRispostaMessaggio">
              <input type="hidden" id="dataMessaggio">
              <label>Messaggio di: <label id="lblCognomeNomePopupRispostaMessaggio"></label></label><br>
              <label>Testo del messaggio</label>
              <div id="divRispostaMessaggio2">
              </div><br>
              <textarea class="form-control" rows="7" id="txtRispostaMessaggio" style="resize:none"></textarea>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" onclick="inviaRispostaMessaggio();">Invia</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">Annulla</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup che viene inizializzato con un testo dal javascript a seconda del messaggio -->
    <div class="modal fade" id="popupGenerico" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body" id="bodyPopupGenerico">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </body> 
</html>