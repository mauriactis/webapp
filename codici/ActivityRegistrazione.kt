package com.example.mauri.fisioapp

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.view.View
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_registrazione.*
import org.jetbrains.anko.longToast
import org.jetbrains.anko.toast
import org.json.JSONException
import org.json.JSONObject
import java.util.regex.Pattern

class ActivityRegistrazione : AppCompatActivity() {
    private var anaID: Int? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_registrazione)
        anaID = intent.getIntExtra("anaID",0)
        btnRegistrati.setOnClickListener {
            if(controlloCampi()){
                val mailStr = registrazioneMail.text.toString()
                val passwordStr = registrazionePassword.text.toString()
                val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=registrazione",
                        Response.Listener<String> { response ->
                            try {
                                val obj = JSONObject(response)
                                longToast(obj.getString("message"))
                                if(!obj.getBoolean("error")){
                                    val intent = Intent(this,ActivityLogin::class.java)
                                    startActivity(intent)
                                    finish()
                                }
                            } catch (e: JSONException) {
                                e.printStackTrace()
                            }
                        },
                        Response.ErrorListener { toast(R.string.TXT_erroreConnessione) }) {
                    override fun getParams(): Map<String, String> {
                        val params = HashMap<String, String>()
                        params["username"] = mailStr
                        params["password"] = passwordStr
                        params["id"] = anaID!!.toString()
                        return params
                    }
                }
                val requestQueue = Volley.newRequestQueue(this)
                requestQueue.add<String>(stringRequest)
            }
        }
    }

    private fun controlloCampi(): Boolean {
        registrazioneMail.error = null
        registrazionePassword.error = null
        registrazioneRePassword.error = null
        val mailStr = registrazioneMail.text.toString()
        val passwordStr = registrazionePassword.text.toString()
        val rePasswordStr = registrazioneRePassword.text.toString()
        var cancel = false
        var focusView: View? = null

        if (TextUtils.isEmpty(mailStr)) {
            registrazioneMail.error = getString(R.string.TXT_campoRichiesto)
            focusView = registrazioneMail
            cancel = true
        }
        if (TextUtils.isEmpty(passwordStr)) {
            registrazionePassword.error = getString(R.string.TXT_campoRichiesto)
            focusView = registrazionePassword
            cancel = true
        }
        if (TextUtils.isEmpty(rePasswordStr)) {
            registrazioneRePassword.error = getString(R.string.TXT_campoRichiesto)
            focusView = registrazioneRePassword
            cancel = true
        }
        if(passwordStr != rePasswordStr){
            registrazioneRePassword.error = getString(R.string.TXT_rePasswordErrore)
            focusView = registrazioneRePassword
            cancel = true
        }
        if(!checkUsername(mailStr)){
            registrazioneMail.error = getString(R.string.TXT_erroreMailCorretta)
            focusView = registrazioneMail
            cancel = true
        }
        return if (cancel) {
            focusView?.requestFocus()
            false
        } else {
            true
        }
    }

    private fun checkUsername(s:String): Boolean{
        val expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$"
        val pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE)
        val matcher = pattern.matcher(s)
        return matcher.matches()
    }
}
