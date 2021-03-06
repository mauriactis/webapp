<?php
session_start();
if(!isset($_SESSION['id']) || $_SESSION['id'] !== "CiSiamo"){
  header("Location: ../index.php");
}

?>

<!DOCTYPE html> 
<html> 
   <head> 
      <title>Anagrafica</title> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="../cssEsterno/jquery-ui.css" rel="stylesheet">
      <link href="../cssEsterno/bootstrap.min.css" rel="stylesheet">
      <link id="styleCss" href="style.css" rel="stylesheet" type="text/css"/>
   </head> 
   <body>
      <script src="../jsEsterno/jquery.js"></script>
      <script src="../jsEsterno/jquery-3.3.1.min.js"></script>
      <script src="../jsEsterno/jquery-1.12.4.js"></script>
      <script src="../jsEsterno/jquery-ui.js"></script>
      <script src="../jsEsterno/jquery.ui.datepicker-it.js"></script>
      <script src="../jsEsterno/bootstrap.min.js"></script>
      <script language="javascript" src="clientlogic.js"></script>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

      <div id="mainDiv">
         <div id="vsblPage">
            <div id="header">
               <button class="btn btn-default" onclick="caricaAnagrafica();" id="lngAnagrafica"><span class="glyphicon glyphicon-home"></span> Anagrafica</button>
               <button class="btn btn-default" onclick="caricaContabilita('');" id="lngContabilita"><span class="glyphicon glyphicon-euro"></span> Contabilità</button>
               <input type="hidden" id="boolCaricaPagina" value="0"> 
   
               <div class="col-sm-2" id="divRicerca">
                  <div class="input-group">
                     <input type="text" class="form-control" id="txtRicercaAnagrafica">
                     <span class="input-group-btn">
                        <button class="btn btn-default" type="button" onclick="cercaPersona();" id="btnCerca">
                           <b>
                              <span class="glyphicon glyphicon-search"></span> Cerca
                           </b>
                        </button>
                     </span>
                  </div>
               </div>
      
               <button type="button" class="btn btn-info" id="btnAggiungiPersona" data-toggle="modal" data-target="#popupAggiungiNuovo" onclick="initPopupAggiungiNuovo();"><span class="glyphicon glyphicon-user"></span> Aggiungi nuovo</button>
   
               <button type="button" class="btn btn-success" id="btnSchede" onclick="window.open('../Schede/index.html');" disabled="disabled"><span class="glyphicon glyphicon-list-alt"></span> Schede</button>
   
               <p style="display:inline">Appuntamento attuale con: <label id="lblAppuntamento"></label> Prossimo appuntamento con: <label id="lblProxAppuntamento"></label></p>
   
               <button type="button" class="btn btn-default" id="btnAppuntamenti" onclick="window.open('../Appuntamenti/index.php');"><span class="glyphicon glyphicon-calendar"></span> Appuntamenti</button>
            </div>

            <div id="container">
            </div>
         </div>
      </div>
        
         <!-- Popup per aggiungere un nuovo paziente -->
         <div class="modal fade" id="popupAggiungiNuovo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
               <div class="modal-content">
                  <div class="modal-body">
                     <table class="tblPopupAggiungiNuovo">
                        <tbody>
                           <tr class="tblPopupAggiungiNuovoRow">
                              <td><label>Nome</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtNomePopupAggiungiNuovo"/></td>

                              <td><label class="popupAggiungiModifica3Col">Cognome</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtCognomePopupAggiungiNuovo"/></td>
                           </tr>
                           <tr class="tblPopupAggiungiNuovoRow">
                              <td><label>Luogo di nascita</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtLuogoNascitaPopupAggiungiNuovo"/><div id="elencoComuni1"></div></td>

                              <td><label class="popupAggiungiModifica3Col">Data di nascita</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtDataNascitaPopupAggiungiNuovo"></td>
                           </tr>
                           <tr class="tblPopupAggiungiNuovoRow">
                              <td><label>Residenza</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtResidenzaPopupAggiungiNuovo"/><div id="elencoComuni2"></div></td>

                              <td><label class="popupAggiungiModifica3Col">Indirizzo</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtIndirizzoPopupAggiungiNuovo"></td>
                           </tr>
                           <tr class="tblPopupAggiungiNuovoRow">
                              <td><label>CAP</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtCapPopupAggiungiNuovo"></td>
                              <td><label  class="popupAggiungiModifica3Col">Codice fiscale</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" style="text-transform:uppercase" id="txtCodiceFiscalePopupAggiungiNuovo"></td>
                           </tr>
                           <tr class="tblPopupAggiungiNuovoRow">
                              <td><label>Telefono</label></td>
                              <td><input type="text" class="form-control" onclick="this.style.backgroundColor = 'white'; this.select();" onfocus="this.style.backgroundColor = 'white'; this.select();" id="txtTelefonoPopupAggiungiNuovo"></td>
                              <td><label  class="popupAggiungiModifica3Col">Motivo</label></td>
                              <td><select class="form-control" id="txtMotivoPopupAggiungiNuovo"></select></td>
                           </tr>
                        </tbody>
                     </table>
                     <div id="campiAggiuntiviPopupAggiungiNuovo" class="collapse">
                        <table class="tblPopupAggiungiNuovo">
                           <tbody>
                              <tr class="tblPopupAggiungiNuovoRow">
                                 <td><label>Telefono 2</label></td>
                                 <td><input type="text" class="form-control inputMore" id="txtTelefono2PopupAggiungiNuovo"></td>
                              </tr>
                              <tr class="tblPopupAggiungiNuovoRow">
                                 <td><label>Medico di provenienza</label></td>
                                 <td><input type="text" class="form-control inputMore" id="txtProvenienzaPopupAggiungiNuovo"></td>
                              </tr>
                              <tr class="tblPopupAggiungiNuovoRow">
                                 <td><label>Osservazioni</label></td>
                                 <td><textarea class="form-control inputMore txtOsservazioniPopup" rows="7" id="txtOsservazioniPopupAggiungiNuovo"></textarea></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                  <div class="modal-footer">
                     <button type="button" class="btn btn-default" id="btnAggiungiCampiPopupAggiungiNuovo" onclick="changeArrow();" value="Aggiungi">Aggiungi campi <span class="glyphicon glyphicon-chevron-down"></span></button>
                     <button type="button" class="btn btn-primary" id="btnConfermaPopupAggiungiNuovo" onclick="aggiungiNuovoPaziente();">Conferma</button>
                     <button type="button" class="btn btn-default" data-dismiss="modal" onclick="cancellaCampi();">Annulla</button>
                  </div>
               </div>
            </div>
         </div>

      <!-- Popup per chiedere se si vuole stampare il foglio privacy o meno -->
      <div class="modal fade" id="popupStampaFoglioPrivacy" tabindex="-1" role="dialog" aria-hidden="true">
         <div class="modal-dialog modal-sm">
            <div class="modal-content">
               <div class="modal-body">
                  <div>Nuovo paziente inserito con successo!<br>Si desidera stampare il foglio privacy?</div>
                  <input type="hidden" id="idPersonaFP"> 
               </div>
               <div id="foglioPrivacy">
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-primary" onclick="stampaFoglioPrivacy(1);"><span class="glyphicon glyphicon-print"></span> Stampa</button>
                  <button type="button" class="btn btn-default" onclick="stampaFoglioPrivacy(0);">Annulla</button>
               </div>
            </div>
          </div>
      </div>

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