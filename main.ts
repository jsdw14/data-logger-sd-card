input.onButtonPressed(Button.A, function () {
    if (logging_data) {
        logging_data = false
    } else {
        logging_data = true
    }
})
let log_num = 0
let row = ""
let logging_data = false
basic.showIcon(IconNames.Umbrella)
logging_data = true
weatherbit.startWeatherMonitoring()
let header = "time" + "," + "temp(c)" + "," + "humidity" + "," + "pressure" + "," + "altitude"
serial.writeLine(header)
loops.everyInterval(1000, function () {
    if (logging_data) {
        row = "" + input.runningTime() + "," + weatherbit.temperature() + "," + weatherbit.humidity() + "," + weatherbit.pressure() + "" + weatherbit.altitude()
        serial.writeLine(row)
        log_num += 1
        if (log_num % 2 == 0) {
            basic.showIcon(IconNames.SmallDiamond)
        } else {
            basic.showIcon(IconNames.Diamond)
        }
    } else {
        basic.showIcon(IconNames.Umbrella)
    }
})
