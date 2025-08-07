package com.example.clockclone.alarm

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat

object Notifications {
    private const val CHANNEL_ID = "clockclone_alarms"

    fun ensureChannel(context: Context): String {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            if (manager.getNotificationChannel(CHANNEL_ID) == null) {
                val channel = NotificationChannel(CHANNEL_ID, "Alarms", NotificationManager.IMPORTANCE_HIGH)
                manager.createNotificationChannel(channel)
            }
        }
        return CHANNEL_ID
    }

    fun basicNotification(context: Context, channelId: String, text: String): Notification {
        return NotificationCompat.Builder(context, channelId)
            .setContentTitle("ClockClone")
            .setContentText(text)
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
            .build()
    }
}