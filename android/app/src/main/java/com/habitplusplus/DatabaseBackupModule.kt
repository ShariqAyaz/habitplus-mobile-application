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

class DatabaseBackupModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DatabaseBackup"
    }

    @ReactMethod
    fun createBackup(successCallback: Callback, errorCallback: Callback) {
        
        if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            errorCallback.invoke("Permission Denied")
            return
        }

        try {
            // Path to the internal database
            val currentDBPath = "/data/data/${reactContext.packageName}/databases/habdatabase"
            val currentDB = File(currentDBPath)
            // Path to where you want to backup the database in the external storage
            val backupDB = File(Environment.getExternalStorageDirectory(), "habdatabase_backup.db")

            if (currentDB.exists()) {
                // Create channels for the files
                val src: FileChannel = FileInputStream(currentDB).channel
                val dst: FileChannel = FileOutputStream(backupDB).channel

                // Copy the database file from internal storage to external storage
                dst.transferFrom(src, 0, src.size())
                src.close()
                dst.close()

                // Invoke the success callback with the path of the backup file
                successCallback.invoke("Backup created at: ${backupDB.absolutePath}")
            } else {
                errorCallback.invoke("Database file not found")
            }
        } catch (e: Exception) {
            errorCallback.invoke("Error during backup: ${e.message}")
        }
    }
}
