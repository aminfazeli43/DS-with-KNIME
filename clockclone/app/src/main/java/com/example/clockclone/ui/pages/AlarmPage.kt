package com.example.clockclone.ui.pages

import android.app.TimePickerDialog
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.clockclone.alarm.AlarmScheduler
import java.util.Calendar

@Composable
fun AlarmPage(modifier: Modifier = Modifier) {
    var alarms by remember { mutableStateOf(listOf(
        AlarmItem("07:00", true),
        AlarmItem("08:30", false)
    )) }
    val context = LocalContext.current

    fun showTimePickerAndSchedule() {
        val now = Calendar.getInstance()
        TimePickerDialog(
            context,
            { _, hour, minute ->
                val cal = Calendar.getInstance().apply {
                    set(Calendar.HOUR_OF_DAY, hour)
                    set(Calendar.MINUTE, minute)
                    set(Calendar.SECOND, 0)
                    set(Calendar.MILLISECOND, 0)
                }
                if (cal.timeInMillis <= System.currentTimeMillis()) {
                    cal.add(Calendar.DAY_OF_YEAR, 1)
                }
                AlarmScheduler.scheduleExact(context, cal.timeInMillis)
                val label = String.format("%02d:%02d", hour, minute)
                alarms = alarms + AlarmItem(label, true)
            },
            now.get(Calendar.HOUR_OF_DAY),
            now.get(Calendar.MINUTE),
            true
        ).show()
    }

    Column(modifier = modifier.fillMaxSize()) {
        Row(horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Text(
                text = "Alarms",
                style = MaterialTheme.typography.headlineSmall,
            )
        }

        LazyColumn(contentPadding = PaddingValues(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            items(alarms) { alarm ->
                Card {
                    Row(
                        modifier = Modifier
                            .fillMaxSize(),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text(text = alarm.timeText, modifier = Modifier.weight(1f))
                        Switch(checked = alarm.enabled, onCheckedChange = { })
                    }
                }
            }
            item {
                Button(onClick = { showTimePickerAndSchedule() }) {
                    Text("Add alarm")
                }
            }
            item {
                OutlinedButton(onClick = { alarms = emptyList() }) {
                    Text("Clear")
                }
            }
        }
    }
}

data class AlarmItem(val timeText: String, val enabled: Boolean)