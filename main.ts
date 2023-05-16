input.onButtonPressed(Button.A, function () {
    if (logging_data) {
        logging_data = false
    } else {
        logging_data = true
        logging_soil = false
    }
})
input.onButtonPressed(Button.B, function () {
    logging_data = false
    logging_soil = true
    soil_moisture = weatherbit.soilMoisture()
    row = "" + input.runningTime() + "," + weatherbit.temperature() + "," + weatherbit.humidity() + "," + weatherbit.pressure() + "" + weatherbit.altitude() + "," + soil_moisture
    serial.writeLine(row)
    if (soil_moisture < 16) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            `)
    } else if (soil_moisture >= 16 && soil_moisture < 300) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            `)
    } else if (soil_moisture >= 300 && soil_moisture < 400) {
        basic.showLeds(`
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (soil_moisture >= 400 && soil_moisture < 700) {
        basic.showLeds(`
            . . . . .
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (soil_moisture >= 700) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
})
let log_num = 0
let row = ""
let soil_moisture = 0
let logging_soil = false
let logging_data = false
basic.showIcon(IconNames.Umbrella)
logging_data = false
logging_soil = false
weatherbit.startWeatherMonitoring()
serial.redirect(
SerialPin.P15,
SerialPin.P14,
BaudRate.BaudRate9600
)
let header = "time" + "," + "temp(c)" + "," + "humidity" + "," + "pressure" + "," + "altitude" + "," + "soil moisture"
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
    } else if (!(logging_soil)) {
        basic.showIcon(IconNames.Umbrella)
    }
})
