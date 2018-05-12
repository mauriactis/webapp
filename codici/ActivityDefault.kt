package com.example.mauri.fisioapp

import android.content.Intent
import android.os.Bundle
import android.support.design.widget.BottomNavigationView
import android.support.v7.app.AppCompatActivity
import android.view.View
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.Response.Listener
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_default.*
import org.jetbrains.anko.alert
import org.jetbrains.anko.longToast
import org.jetbrains.anko.toast
import org.json.JSONException
import org.json.JSONObject
import java.util.*



class ActivityDefault : AppCompatActivity() {
    private var anaID: Int? = null
    private var dataDb1 = ""
    private var dataDb2 = ""
    private var dataDb3 = ""
    private var dataMessaggio = ""

    private val mOnNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
        when (item.itemId) {
            R.id.navbar_home -> {
                caricaHome()
                return@OnNavigationItemSelectedListener true
            }
            R.id.navbar_appuntamenti -> {
                caricaAppuntamenti()
                return@OnNavigationItemSelectedListener true
            }
            R.id.navbar_richieste -> {
                caricaRichieste()
                return@OnNavigationItemSelectedListener true
            }
            R.id.navbar_esercizi -> {
                caricaEsercizi()
                return@OnNavigationItemSelectedListener true
            }
        }
        false
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_default)

        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)
        anaID = intent.getIntExtra("anaID",0)

        caricaHome()
    }

    private fun caricaHome() {
        homeContenitore.visibility = View.VISIBLE
        appuntamentiContenitore.visibility = View.GONE
        richiesteContenitore.visibility = View.GONE
        eserciziContenitore.visibility = View.GONE
        val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=caricaHome",
                Listener<String> { response ->
                    try {
                        val obj = JSONObject(response)
                        if(!obj.getBoolean("error")){
                            // carichiamo i vari dati nelle textview
                            var data = obj.getString("dataAppuntamento")
                            var ora = obj.getString("oraAppuntamento")
                            data = data.substring(8, 10) + "/" + data.substring(5, 7) + "/" + data.substring(0, 4)
                            ora = ora.substring(0, 5)
                            lblData.text = data
                            lblora.text = ora
                            lblHomeAppuntamento.text = getText(R.string.TXT_lblAppuntamento)
                            lblHomeOra.text = getText(R.string.TXT_AlleOre)
                            lblNotifiche.text = getText(R.string.TXT_NotificaNullaNuovo)
                        }else{
                            // nascondiamo tutte le textview perchè non ci sono appuntamenti
                            lblNotifiche.text = obj.getString("message")
                            lblData.text = ""
                            lblora.text = ""
                            lblHomeAppuntamento.text = ""
                            lblHomeOra.text = ""
                        }
                    } catch (e: JSONException) {
                        e.printStackTrace()
                    }
                },
                Response.ErrorListener { toast("ciao") }) {
            override fun getParams(): Map<String, String> {
                val params = HashMap<String, String>()
                params["id"] = anaID.toString()
                return params
            }
        }
        val requestQueue = Volley.newRequestQueue(this)
        requestQueue.add<String>(stringRequest)

    }

    private fun caricaAppuntamenti() {
        homeContenitore.visibility = View.GONE
        appuntamentiContenitore.visibility = View.VISIBLE
        richiesteContenitore.visibility = View.GONE
        eserciziContenitore.visibility = View.GONE

        btnContattaDottoressa.setOnClickListener {
            val intent = Intent(this,ActivityContatta::class.java)
            intent.putExtra("anaID",anaID)
            startActivity(intent)
        }

        btnInviaRichiestaAppuntamento.setOnClickListener {
            val note = txtNote.text.toString()
            if(note == "") {
                alert(getString(R.string.TXT_descrizioneAlertNoteVuote), getString(R.string.TXT_conferma)) {
                    positiveButton("Sì") {
                        val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=richiestaAppuntamento",
                                Listener<String> { response ->
                                    try {
                                        val obj = JSONObject(response)
                                        if (obj.getBoolean("error")) {
                                            if (obj.getString("message") == "alert") {
                                                alert(getString(R.string.TXT_alertErroreInvioRichiesta)){
                                                    positiveButton("OK") {}
                                                }.show()
                                                txtNote.setText("")
                                            } else {
                                                toast(obj.getString("message"))
                                            }
                                        } else {
                                            toast(obj.getString("message"))
                                            txtNote.setText("")
                                        }
                                    } catch (e: JSONException) {
                                        e.printStackTrace()
                                    }
                                },
                                Response.ErrorListener { volleyError -> toast(volleyError.message!!) }) {
                            override fun getParams(): Map<String, String> {
                                val params = HashMap<String, String>()
                                params["id"] = anaID!!.toString()
                                params["note"] = note
                                return params
                            }
                        }
                        val requestQueue = Volley.newRequestQueue(applicationContext)
                        requestQueue.add<String>(stringRequest)
                    }
                    negativeButton("NO") {
                        toast(R.string.TXT_noteVuoteErrore)
                    }
                }.show()
            }else {
                val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=richiestaAppuntamento",
                        Listener<String> { response ->
                            try {
                                val obj = JSONObject(response)
                                if (obj.getBoolean("error")) {
                                    if (obj.getString("message") == "alert") {
                                        alert(getString(R.string.TXT_alertErroreInvioRichiesta)){
                                            positiveButton("OK") {}
                                        }.show()
                                        txtNote.setText("")
                                    } else {
                                        toast(obj.getString("message"))
                                    }
                                } else {
                                    toast(obj.getString("message"))
                                    txtNote.setText("")
                                }
                            } catch (e: JSONException) {
                                e.printStackTrace()
                            }
                        },
                        Response.ErrorListener { volleyError -> toast(volleyError.message!!) }) {
                    override fun getParams(): Map<String, String> {
                        val params = HashMap<String, String>()
                        params["id"] = anaID!!.toString()
                        params["note"] = note
                        return params
                    }
                }
                val requestQueue = Volley.newRequestQueue(this)
                requestQueue.add<String>(stringRequest)
            }
        }
    }

    private fun caricaRichieste() {
        homeContenitore.visibility = View.GONE
        appuntamentiContenitore.visibility = View.GONE
        richiesteContenitore.visibility = View.VISIBLE
        eserciziContenitore.visibility = View.GONE

        var data1: String
        var data2: String
        var data3: String
        val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=caricaRichieste",
                Listener<String> { response ->
                    try {
                        val obj = JSONObject(response)
                        if(!obj.getBoolean("error")){
                            dataDb1 = obj.getString("data1")
                            dataDb2 = obj.getString("data2")
                            dataDb3 = obj.getString("data3")
                            dataMessaggio = obj.getString("dataMessaggio")
                            var temp = dataDb1.split(" ")
                            var dataTemp = temp[0].substring(8, 10) + "/" + temp[0].substring(5, 7) + "/" + temp[0].substring(0, 4)
                            data1 = dataTemp + "\n" + temp[1].substring(0,5)
                            btnPrimaData.text = data1
                            lblDescrizioneRichieste.text = getString(R.string.TXT_RichiestaAppuntamentoPiena)
                            if(dataDb2 == "null"){
                                btnSecondaData.visibility = View.GONE
                            }else{
                                temp = dataDb2.split(" ")
                                dataTemp = temp[0].substring(8, 10) + "/" + temp[0].substring(5, 7) + "/" + temp[0].substring(0, 4)
                                data2 = dataTemp + "\n" + temp[1].substring(0,5)
                                btnSecondaData.text = data2
                            }

                            if(dataDb3 == "null"){
                                btnTerzaData.visibility = View.GONE
                            }else{
                                temp = dataDb3.split(" ")
                                dataTemp = temp[0].substring(8, 10) + "/" + temp[0].substring(5, 7) + "/" + temp[0].substring(0, 4)
                                data3 = dataTemp + "\n" + temp[1].substring(0,5)
                                btnTerzaData.text = data3
                            }
                        }else{
                            btnPrimaData.visibility = View.GONE
                            btnSecondaData.visibility = View.GONE
                            btnTerzaData.visibility = View.GONE
                            lblDescrizioneRichieste.text = getString(R.string.TXT_nessunaRichiestaTrovata)
                        }
                        btnPrimaData.setOnClickListener {
                            confermaData(dataDb1)
                        }
                        btnSecondaData.setOnClickListener {
                            confermaData(dataDb2)
                        }
                        btnTerzaData.setOnClickListener {
                            confermaData(dataDb3)
                        }
                    } catch (e: JSONException) {
                        e.printStackTrace()
                    }
                },
                Response.ErrorListener { toast(R.string.TXT_erroreConnessione) }) {
            override fun getParams(): Map<String, String> {
                val params = HashMap<String, String>()
                params["id"] = anaID.toString()
                return params
            }
        }
        val requestQueue = Volley.newRequestQueue(this)
        requestQueue.add<String>(stringRequest)


    }

    private fun caricaEsercizi() {
        homeContenitore.visibility = View.GONE
        appuntamentiContenitore.visibility = View.GONE
        richiesteContenitore.visibility = View.GONE
        eserciziContenitore.visibility = View.VISIBLE


    }


    private fun confermaData(data:String){
        alert(getString(R.string.TXT_descrizioneAlertConfermaData),getString(R.string.TXT_conferma)) {
            positiveButton("Sì") {
                val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=salvaAppuntamento",
                        Listener<String> { response ->
                            try {
                                val obj = JSONObject(response)
                                longToast(obj.getString("message"))
                            } catch (e: JSONException) {
                                e.printStackTrace()
                            }
                        },
                        Response.ErrorListener { toast(R.string.TXT_erroreConnessione) }) {
                    override fun getParams(): Map<String, String> {
                        val params = HashMap<String, String>()
                        params["id"] = anaID.toString()
                        params["dataAppuntamento"] = data
                        params["dataMessaggio"] = dataMessaggio
                        return params
                    }
                }
                val requestQueue = Volley.newRequestQueue(applicationContext)
                requestQueue.add<String>(stringRequest)
            }
            negativeButton("NO") {
                toast("Scegli un'altra data")
            }
        }.show()
    }
}
