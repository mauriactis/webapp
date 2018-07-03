package com.example.mauri.myfisio

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.view.View
import kotlinx.android.synthetic.main.activity_login.*
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import org.jetbrains.anko.indeterminateProgressDialog
import org.jetbrains.anko.longToast
import org.jetbrains.anko.toast
import org.json.JSONException
import org.json.JSONObject
import java.util.regex.Pattern


class ActivityLogin : AppCompatActivity() {
    private var registrazione:Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        btnAvanti.setOnClickListener {
            if(controlloCampi()){
                val dialog = indeterminateProgressDialog(getString(R.string.TXT_descrizioneProgressDialog), getString(R.string.TXT_titoloProgressDialog))
                val username = username.text.toString()
                val password = password.text.toString()
                var anaID: Int
                val stringRequest = object : StringRequest(Request.Method.POST, "http://18.216.195.239/webapi/?op=login",
                        Response.Listener<String> { response ->
                            try {
                                val obj = JSONObject(response)
                                if(!obj.getBoolean("error")){
                                    anaID = obj.getInt("id")
                                    val intent:Intent = if(registrazione) Intent(this,ActivityRegistrazione::class.java)
                                    else Intent(this,ActivityDefault::class.java)
                                    toast(anaID.toString())
                                    intent.putExtra("anaID", anaID)
                                    startActivity(intent)
                                    finish()
                                }else{
                                    dialog.cancel()
                                    longToast(obj.getString("message"))
                                }
                            } catch (e: JSONException) {
                                e.printStackTrace()
                            }
                        },
                        Response.ErrorListener { volleyError -> toast(volleyError.message!!) }) {
                    override fun getParams(): Map<String, String> {
                        val params = HashMap<String, String>()
                        params["username"] = username
                        params["password"] = password
                        return params
                    }
                }
                val requestQueue = Volley.newRequestQueue(this)
                requestQueue.add<String>(stringRequest)

            }
        }
    }

    private fun controlloCampi(): Boolean {
        username.error = null
        password.error = null
        val usernameStr = username.text.toString()
        val passwordStr = password.text.toString()
        var cancel = false
        var focusView: View? = null

        if (TextUtils.isEmpty(usernameStr)) {
            username.error = getString(R.string.TXT_campoRichiesto)
            focusView = username
            cancel = true
        }
        if(!checkUsername(usernameStr,passwordStr)){
            username.error = getString(R.string.TXT_usernameNonCorretto)
            focusView = username
            cancel = true
        }
        return if (cancel) {
            focusView?.requestFocus()
            false
        } else {
            true
        }

    }


    private fun checkUsername(username:String, pass:String): Boolean{
        var ret = false
        try {
            val x = username.toInt()
            if(x in 1..999999 && pass == ""){
                registrazione = true
                ret = true
            }
        }catch (e: NumberFormatException){
            registrazione = false
            val expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$"
            val pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE)
            val matcher = pattern.matcher(username)
            ret = matcher.matches()
        }
        return ret
    }
}

