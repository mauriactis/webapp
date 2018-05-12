package com.example.mauri.fisioapp

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_contatta.*
import org.jetbrains.anko.alert
import org.jetbrains.anko.toast
import org.json.JSONException
import org.json.JSONObject

class ActivityContatta : AppCompatActivity() {
    private var anaID = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_contatta)
        anaID = intent.getIntExtra("anaID",0)


        btnInviaRichiestaGenerica.setOnClickListener {
            val note = txtNoteGeneriche.text.toString()
            if(note == ""){
                toast(R.string.TXT_noteVuoteErrore)
            }else {
                val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=messaggio",
                        Response.Listener<String> { response ->
                            try {
                                val obj = JSONObject(response)
                                if (obj.getBoolean("error")) {
                                    if (obj.getString("message") == "alert") {
                                        alert(getString(R.string.TXT_alertErroreInvioRichiesta)){
                                            positiveButton("OK") {}
                                        }.show()
                                        txtNoteGeneriche.setText("")
                                    } else {
                                        toast(obj.getString("message"))
                                    }
                                } else {
                                    toast(obj.getString("message"))
                                    txtNoteGeneriche.setText("")
                                }
                            } catch (e: JSONException) {
                                e.printStackTrace()
                            }
                        },
                        Response.ErrorListener { toast(R.string.TXT_erroreConnessione) }) {
                    override fun getParams(): Map<String, String> {
                        val params = HashMap<String, String>()
                        params["id"] = anaID.toString()
                        params["note"] = note
                        return params
                    }
                }
                val requestQueue = Volley.newRequestQueue(this)
                requestQueue.add<String>(stringRequest)
            }
        }



    }
}
