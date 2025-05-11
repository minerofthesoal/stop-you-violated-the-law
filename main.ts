namespace alarmStopwatch {
    let stop_watch_time = 0
    let inputted_alarm_time = 0
    let stopwatch_on = false
    let on = false
    let off = true
    let on_1 = false
    let off_1 = true
    let amari_1 = false

    // Initialize clock
    Clock.clockSpeed(1000)
    Clock.clockToggle(true)

    // Toggle stopwatch on button B
    export function toggleStopwatch() {
        if (!off) {
            if (on) {
                stopwatch_on = true
                off = true
                on = false
            }
        } else {
            if (!on) {
                stopwatch_on = false
                on = true
                off = false
            }
        }
    }

    // Set alarm time from input (simulate button A)
    export function setAlarmTime(seconds: number) {
        inputted_alarm_time = seconds
        on_1 = true
        off_1 = false
        amari_1 = true
        timer.after(inputted_alarm_time * 1000, function () {
            music.play(music.createSong(hex`006400040803...`), music.PlaybackMode.UntilDone)
        })
    }

    // Reset everything (simulate MENU button)
    export function resetAll() {
        stop_watch_time = 0
        inputted_alarm_time = 0
    }

    // Start update loops (should be called in main.ts)
    export function startLoops() {
        forever(function () {
            pause(125)
            let textSprite1 = textsprite.create(convertToText(inputted_alarm_time))
            textSprite1.setPosition(80, 50)
            let textSprite2 = textsprite.create(convertToText(stop_watch_time))
            textSprite2.setPosition(80, 80)
            pause(125)
            sprites.destroy(textSprite1)
            sprites.destroy(textSprite2)
        })

        forever(function () {
            if (!off_1 && on_1) {
                pause(1000)
                inputted_alarm_time -= 1
            }
        })

        forever(function () {
            pause(500)
            let clockText = textsprite.create(Clock.clockTime(true))
            clockText.setPosition(80, 20)
            pause(500)
            sprites.destroy(clockText)
        })

        forever(function () {
            pause(1000)
            if (stopwatch_on) {
                stop_watch_time += 1
            }
        })

        forever(function () {
            if (inputted_alarm_time <= 0) {
                inputted_alarm_time = 0
                off_1 = true
                on_1 = false
            }
        })
    }
}
