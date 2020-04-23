# LELO F1 SDK Web Bluetooth Client

The original and official repository with sample code for Android and iOS as well as BLE specifications can be found at [https://github.com/LELO-Devs/F1s-SDK](https://github.com/LELO-Devs/F1s-SDK).

This is an unofficial vanilla JavaScript  client based on the new Web Bluetooth API.


### WARNING: Work in progress! Currently developing on Chrome.

See the [Working demo](https://fabiofenoglio.github.io/lelo-f1-web-sdk/example.html)


### Available methods

All method return promises and can be chained.

- requestDevice -> returns list of devices responding to filter (name equals 'F1s')
- connect (device)
- searchAndConnect (shortcut for requestDevice chained with connect)
- disconnect
- waitForAuthorization

- getManufacturerName -> returns string
- getFirmwareRevision -> returns string
- getHardwareRevision -> returns string
- getModelNumber -> returns string
- getSoftwareRevision -> returns string
- getBatteryLevel -> returns integer from 0 to 100
- getKeyState -> returns boolean
- getUseCount -> returns integer
- resetUseCount
- getButtonsStatus -> returns an object {plus: boolean, minus: boolean, central: boolean, any: boolean, none: boolean}
- getMotorsSpeed -> returns array of integers [motorSpeed, vibeSpeed] from 0 to 100
- getMainMotorSpeed -> returns integer from 0 to 100
- getVibratorSpeed -> returns integer from 0 to 100
- setMotorsSpeed (motorSpeed, vibeSpeed) 
- setMainMotorSpeed (motorSpeed)
- setVibratorSpeed (vibeSpeed)
- shutdownMotors
- getTemperatureAndPressure -> returns array of floats [temperature in C, pressure in mBar]
- getTemperature -> returns float in C
- getPressure-> returns float in mBar
- getAccelerometer -> returns array of integers [x, y, z]
- getAccelerometerX -> returns integer
- getAccelerometerY -> returns integer
- getAccelerometerZ -> returns integer
- getInsertionDepth -> returns integer from 0 to 8
- getInsertionDepthPercentage -> returns integer from 0 to 100
- getRotationSpeed -> returns integer in rpm
- getWakeUp -> returns boolean
- enableWakeUp
- disableWakeUp
- getCruiseControl -> returns boolean
- enableCruiseControl
- disableCruiseControl
- getVibrationSettings -> returns array of integers [value0, value1, ... value7]
- setVibrationSettings (value0, value1, ... value7)
