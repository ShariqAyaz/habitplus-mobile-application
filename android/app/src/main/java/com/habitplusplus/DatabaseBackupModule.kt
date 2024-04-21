package com.habitplusplus

import android.Manifest
import android.content.pm.PackageManager
import android.os.Environment
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Callback
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.nio.channels.FileChannel

class DatabaseBackupModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "DatabaseBackup"
    }

    @ReactMethod
    fun createBackup(successCallback: Callback, errorCallback: Callback) {
        // Check if WRITE_EXTERNAL_STORAGE permission is granted
        if (ContextCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            errorCallback.invoke("Permission Denied")
            return
        }

        try {
            val currentDBPath = "/data/data/${getReactApplicationContext().packageName}/databases/habdatabase"
            val currentDB = File(currentDBPath)
            val backupDB = File(Environment.getExternalStorageDirectory(), "habdatabase_backup.db")

            if (currentDB.exists()) {
                val src: FileChannel = FileInputStream(currentDB).channel
                val dst: FileChannel = FileOutputStream(backupDB).channel
                dst.transferFrom(src, 0, src.size())
                src.close()
                dst.close()

                successCallback.invoke("Backup created at: ${backupDB.absolutePath}")
            } else {
                errorCallback.invoke("Database file not found")
            }
        } catch (e: Exception) {
            errorCallback.invoke("Error during backup: ${e.message}")
        }
    }
}
