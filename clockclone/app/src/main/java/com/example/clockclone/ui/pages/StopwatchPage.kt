package com.example.clockclone.ui.pages

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun StopwatchPage(modifier: androidx.compose.ui.Modifier = androidx.compose.ui.Modifier) {
    var elapsed by remember { mutableStateOf(0L) }
    var running by remember { mutableStateOf(false) }
    var laps by remember { mutableStateOf(listOf<Long>()) }
    var tickerJob by remember { mutableStateOf<Job?>(null) }
    val scope = rememberCoroutineScope()

    fun startTicker() {
        if (tickerJob != null) return
        tickerJob = scope.launch {
            while (true) {
                delay(10)
                if (running) elapsed += 10
            }
        }
    }

    LaunchedEffect(Unit) { startTicker() }

    Column(modifier = modifier) {
        Text(text = String.format("%02d:%02d.%02d", (elapsed/60000)%60, (elapsed/1000)%60, (elapsed/10)%100), fontSize = 48.sp)
        Button(onClick = { running = !running }) { Text(if (running) "Stop" else "Start") }
        Button(onClick = { if (running) laps = laps + elapsed }) { Text("Lap") }
        Button(onClick = { running = false; elapsed = 0; laps = emptyList() }) { Text("Reset") }
        LazyColumn(contentPadding = PaddingValues(8.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
            items(laps) { lap -> Text("Lap: " + String.format("%02d:%02d.%02d", (lap/60000)%60, (lap/1000)%60, (lap/10)%100)) }
        }
    }
}