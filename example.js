function log(text) {
    $('#log-container').append(text + '<br/>');
}

function wait(millis) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, millis);
    });
}

function runDemo() {
    $("#demo-button").remove();

    const client = leloF1SdkClientProvider.getClient();

    log('looking for device ...');
    client.searchAndConnect().then(function() {

        log('device connected!');
        
        return Promise.all([
            client.getBatteryLevel().then(function(batteryLevel) {
                log('battery is at ' + batteryLevel + ' %');
            }),
            client.getManufacturerName().then(function(value) {
                log('manufacturer name: ' + value);
            }),
            client.getModelNumber().then(function(value) {
                log('model number: ' + value);
            }),
            client.getHardwareRevision().then(function(value) {
                log('hardware revision: ' + value);
            }),
            client.getFirmwareRevision().then(function(value) {
                log('firmware revision: ' + value);
            }),
            client.getSoftwareRevision().then(function(value) {
                log('software revision: ' + value);
            })
        ]);

    }).then(function() {
        log('***');
        log('PRESS THE CENTRAL BUTTON TO AUTHORIZE');
        log('***');

        return client.waitForAuthorization();

    }).then(function() {
        log('connection authorized!');
        log('will power ON motors in 5 seconds');

        /* Poll sensors data every 300 ms */
        setInterval(function() {
            if (client.isConnected()) {
                client.getButtonsStatus().then(function(buttonsStatus) {
                    if (buttonsStatus.any) {
                        log('button ' + ( buttonsStatus.minus ? 'MINUS' : buttonsStatus.plus ? 'PLUS' : 'CENTRAL' ) + ' pressed!');
                    }
                });
            }
        }, 300);

        return Promise.all([
            client.getKeyState().then(function(keyState) {
                log('key state: ' + keyState);
            }),
            client.getUseCount().then(function(value) {
                log('usage counter: ' + value);
            }),
            client.getWakeUp().then(function(value) {
                log('quick wake-up is: ' + (value ? 'ENABLED' : 'disabled'));
            }),
            client.getCruiseControl().then(function(value) {
                log('cruise control is: ' + (value ? 'ENABLED' : 'disabled'));
            }),
            client.getVibrationSettings().then(function(values) {
                log('cruise control vibration settings: ' + values.join(', '));
            }),
            
            client.shutdownMotors(),
            wait(4000)
        ]);

    }).then(function() {
        log('reading sensors data');

        return Promise.all([
            client.getTemperatureAndPressure().then(function(sensorData) {
                log('temperature: ' + sensorData[0] + ' C');
                log('pressure: ' + sensorData[1] + ' mBar');
            }),
            client.getAccelerometer().then(function(sensorData) {
                log('acceleration: X=' + sensorData[0] + ', Y=' + sensorData[1] + ', Z=' + sensorData[2]);
            }),
            client.getInsertionDepthPercentage().then(function(sensorData) {
                log('insertion depth: ' + sensorData + ' %');
            }),
            client.shutdownMotors(),
            wait(2000)
        ]);

    }).then(function() {
        log('powering ON motors to 30 %, 30 %.');

        return client
            .setMotorsSpeed(30, 30)
            .then(function() {
                return wait(3000);
            })
            .then(function() {
                log('setting motors to 30 %, 0 %');
                return client.setVibratorSpeed(0);
            })
            .then(function() {
                return wait(3000);
            })
            .then(function() {
                log('setting motors to 30 %, 30 %');
                return client.setMotorsSpeed(30, 30)
            })
            .then(function() {
                return wait(3000);
            })
            .then(function() {
                log('setting motors to 0 %, 30 %');
                return client.setMainMotorSpeed(0);
            })
            .then(function() {
                log('will power OFF motors in 3 seconds');
                return wait(3000);
            });

    }).then(function() {
        log('powering OFF motors. will disconnect in 2 seconds');

        return Promise.all([
            client.shutdownMotors(),
            wait(2000)
        ]);
    })
    .then(function() {
        log('disconnecting');
        client.disconnect();

    }, function(err) {
        console.error(err);
        log('disconnecting after error: ' + err);
        client.disconnect();
    });

}