package com.example.clockclone.ui.pages

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.unit.dp
import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter

@Composable
fun WorldClockPage(modifier: androidx.compose.ui.Modifier = androidx.compose.ui.Modifier) {
    val zones = listOf(
        ZoneId.systemDefault(),
        ZoneId.of("America/New_York"),
        ZoneId.of("Europe/London"),
        ZoneId.of("Asia/Tehran"),
        ZoneId.of("Asia/Tokyo")
    )
    val now = Instant.now()
    val fmt = DateTimeFormatter.ofPattern("EEE, HH:mm")

    LazyColumn(modifier = modifier, contentPadding = PaddingValues(12.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        items(zones) { zone ->
            Card {
                Column {
                    Text(zone.id)
                    Text(fmt.withZone(zone).format(now))
                }
            }
        }
    }
}