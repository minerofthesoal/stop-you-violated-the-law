//% weight=100 color=#ff9933 icon="\uf017" block="Alarm Stopwatch"
namespace alarmStopwatch {
    let stop_watch_time = 0
    let inputted_alarm_time = 0
    let stopwatch_on = false
    let on = false
    let off = true
    let on_1 = false
    let off_1 = true
    let amari_1 = false

    Clock.clockSpeed(1000)
    Clock.clockToggle(true)

    /**
     * Toggle the stopwatch on or off
     */
    //% block="toggle stopwatch"
    export function toggleStopwatch(): void {
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

    /**
     * Set an alarm for a number of seconds
     * @param seconds the countdown duration in seconds
     */
    //% block="set alarm time to %seconds seconds"
    //% seconds.min=1 seconds.max=60 seconds.defl=10
    //% seconds.shadow="slider"
    export function setAlarmTime(seconds: number): void {
        inputted_alarm_time = seconds
        on_1 = true
        off_1 = false
        amari_1 = true
        timer.after(inputted_alarm_time * 1000, function () {
            music.play(music.createSong(hex`006400040803...`), music.PlaybackMode.UntilDone)
        })
    }

    /**
     * Reset stopwatch and alarm
     */
    //% block="reset stopwatch and alarm"
    export function resetAll(): void {
        stop_watch_time = 0
        inputted_alarm_time = 0
    }

    /**
     * Set the current clock time in minutes
     * @param minutes the time to set on the clock (in minutes)
     */
    //% block="set clock time to %minutes minutes"
    //% minutes.min=0 minutes.max=1440 minutes.defl=60
    //% minutes.shadow="slider"
    export function setClockTimeInMinutes(minutes: number): void {
        
    }

    /**
    Clock.makeClock(0, 0, 0, "am")
     * Start the stopwatch and alarm update loops
     */
    //% block="start stopwatch and alarm system"
    export function startLoops(): void {
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