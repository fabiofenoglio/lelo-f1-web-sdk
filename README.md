# LELO F1 SDK Web Bluetooth Client

### WARNING: COMPATIBILITY WITH THE NEWER VERSION OF THE DEVICE (F1S V2) IS WORK IN PROGRESS. PLEASE REACH OUT IF YOU ARE AVAILABLE FOR BETA TESTING.

The original and official repository with sample code for Android and iOS as well as BLE specifications can be found at:

- [BLE-Specs.md](https://github.com/LELO-Devs/F1S-SDK/blob/master/BLE-Specs.md) for the original F1s (first version)
- [F1S-V2-SPEC.md](https://github.com/LELO-Devs/F1S-SDK/blob/master/F1S-V2-SPEC.md) for the F1sV2 (second release)

This is an unofficial vanilla JavaScript client based on the new Web Bluetooth API.

### PLEASE NOTE: this project evolved into the newer and more powerful HUB prototype that you can check out  on [github.com/fabiofenoglio/lelo-f1-hub](https://github.com/fabiofenoglio/lelo-f1-hub)


### WARNING: Work in progress! Currently developing on Chrome.

See the [Simple working demo](https://fabiofenoglio.github.io/lelo-f1-web-sdk/example.html)

See the [AngularJS working demo](https://fabiofenoglio.github.io/lelo-f1-web-sdk/example-gui.html)

See the [Mobile working demo](https://fabiofenoglio.github.io/lelo-f1-web-sdk/example-mobile.html)


### Available methods

All method return promises and can be chained.

- requestDevice -> returns list of devices responding to filter (name equals 'F1s')
- connect (device)
- searchAndConnect (shortcut for requestDevice chained with connect)
- disconnect
- waitForAuthorization
- isAuthorized -> returns boolean
- getManufacturerName -> returns string
- getFirmwareRevision -> returns string
- getHardwareRevision -> returns string
- getModelNumber -> returns string
- getSoftwareRevision -> returns string
- getBatteryLevel -> returns integer from 0 to 100
- getKeyState -> returns boolean (F1s first version only)
- getSecurityAccess -> returns 8 bytes (F1sV2 only)
- getSecurityAccessConfirmed -> returns boolean (F1sV2 only)
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
- notifyAccelerometer ( callback(value) ) -> returns handler
- notifyButtons ( callback(value) ) -> returns handler
- notifyInsertionDepth ( callback(value) ) -> returns handler
- notifyInsertionDepthPercentage ( callback(value) ) -> returns handler
- notifyKeyState ( callback(value) ) -> returns handler (F1s first version only)
- notifySecurityAccess ( callback(value) ) -> returns handler (F1sV2 only)
- notifyAuthorization ( callback(value) ) -> returns handler (both F1s and F1sV2)
- notifyRotationSpeed ( callback(value) ) -> returns handler
- notifyTemperatureAndPressure ( callback(value) ) -> returns handler
- notifyTemperature ( callback(value) ) -> returns handler
- notifyPressure ( callback(value) ) -> returns handler
- unregister (handler)
