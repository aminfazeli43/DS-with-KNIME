# ClockClone

An Android app built with Jetpack Compose that replicates the core features of the default Android Clock app: Alarms, World Clock, Timer, and Stopwatch.

## How to open
1. Open Android Studio (Giraffe or newer recommended).
2. File > Open > select the `clockclone` project folder.
3. Let Android Studio set up the Gradle wrapper and download the Android SDK components.
4. Connect a device or start an emulator.
5. Run the `app` configuration.

## Notes
- Exact alarms require the special SCHEDULE_EXACT_ALARM app-op on Android 12+ (API 31+). The app provides a basic implementation using `AlarmManager` and foreground notification.
- Notifications require POST_NOTIFICATIONS runtime permission on Android 13+ (API 33+).
- The project uses Jetpack Compose Material 3.