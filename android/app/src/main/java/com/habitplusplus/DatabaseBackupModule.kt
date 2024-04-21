package com.habitplusplus

import android.Manifest
import android.content.pm.PackageManager
import android.os.Environment
import androidx.core.content.ContextCompat
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.nio.channels.FileChannel

class DatabaseBackupModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "DatabaseBackup"
    }

    @ReactMethod
    fun createBackup(successCallback: Callback, errorCallback: Callback) {
        // Check if permission is granted
        if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            errorCallback.invoke("Permission Denied")
            return
        }

        try {
            val currentDBPath = "/data/data/com.habitplusplus/databases/habdatabase"
            val currentDB = File(currentDBPath)
            val backupDB = File(Environment.getExternalStorageDirectory(), "habdatabase_backup.db")

            if (currentDB.exists()) {
                val src = FileInputStream(currentDB).channel
                val dst = FileOutputStream(backupDB).channel
                dst.transferFrom(src, 0, src.size())
                src.close()
                dst.close()
                successCallback.invoke("Backup created: " + backupDB.absolutePath)
            }
        } catch (e: Exception) {
            errorCallback.invoke(e.toString())
        }
    }
}
