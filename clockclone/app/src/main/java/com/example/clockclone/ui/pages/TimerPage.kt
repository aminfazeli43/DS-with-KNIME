package com.example.clockclone.ui.pages

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun TimerPage(modifier: Modifier = Modifier) {
    var secondsRemaining by remember { mutableStateOf(0L) }
    var running by remember { mutableStateOf(false) }
    var tickerJob by remember { mutableStateOf<Job?>(null) }
    val scope = rememberCoroutineScope()

    fun stopTicker() {
        tickerJob?.cancel()
        tickerJob = null
    }

    fun startTicker() {
        if (tickerJob != null) return
        tickerJob = scope.launch {
            while (true) {
                delay(1000)
                if (running && secondsRemaining > 0) {
                    secondsRemaining -= 1
                }
            }
        }
    }

    LaunchedEffect(Unit) { startTicker() }

    Column(modifier = modifier, horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = String.format("%02d:%02d", secondsRemaining / 60, secondsRemaining % 60), fontSize = 48.sp)
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
            Button(onClick = { secondsRemaining += 60 }) { Text("+1:00") }
            Button(onClick = { running = true }) { Text("Start") }
            Button(onClick = { running = false }) { Text("Pause") }
            Button(onClick = { running = false; secondsRemaining = 0; stopTicker(); startTicker() }) { Text("Reset") }
        }
    }
}