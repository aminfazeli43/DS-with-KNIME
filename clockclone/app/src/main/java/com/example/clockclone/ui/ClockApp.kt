package com.example.clockclone.ui

import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccessAlarm
import androidx.compose.material.icons.filled.Language
import androidx.compose.material.icons.filled.Timer
import androidx.compose.material.icons.filled.TimerOff
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import com.example.clockclone.ui.pages.AlarmPage
import com.example.clockclone.ui.pages.StopwatchPage
import com.example.clockclone.ui.pages.TimerPage
import com.example.clockclone.ui.pages.WorldClockPage

@Composable
fun ClockApp() {
    var currentIndex by remember { mutableStateOf(0) }

    Scaffold(
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    selected = currentIndex == 0,
                    onClick = { currentIndex = 0 },
                    icon = { Icon(Icons.Filled.AccessAlarm, contentDescription = null) },
                    label = { Text("Alarm") }
                )
                NavigationBarItem(
                    selected = currentIndex == 1,
                    onClick = { currentIndex = 1 },
                    icon = { Icon(Icons.Filled.Language, contentDescription = null) },
                    label = { Text("World") }
                )
                NavigationBarItem(
                    selected = currentIndex == 2,
                    onClick = { currentIndex = 2 },
                    icon = { Icon(Icons.Filled.Timer, contentDescription = null) },
                    label = { Text("Timer") }
                )
                NavigationBarItem(
                    selected = currentIndex == 3,
                    onClick = { currentIndex = 3 },
                    icon = { Icon(Icons.Filled.TimerOff, contentDescription = null) },
                    label = { Text("Stopwatch") }
                )
            }
        }
    ) { innerPadding ->
        when (currentIndex) {
            0 -> AlarmPage(Modifier.padding(innerPadding))
            1 -> WorldClockPage(Modifier.padding(innerPadding))
            2 -> TimerPage(Modifier.padding(innerPadding))
            else -> StopwatchPage(Modifier.padding(innerPadding))
        }
    }
}