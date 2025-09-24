package com.example.clockclone.alarm

import android.app.Notification
import android.app.Service
import android.content.Intent
import android.os.IBinder

class AlarmForegroundService : Service() {
    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val channelId = Notifications.ensureChannel(this)
        val notification: Notification = Notifications.basicNotification(this, channelId, "Alarm running")
        startForeground(2001, notification)
        return START_NOT_STICKY
    }
}