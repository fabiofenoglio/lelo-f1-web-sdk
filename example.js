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

if (!leloF1SdkClientProvider.isSupported()) {
    alert('sorry, your browser does not support Web Bluetooth API. Try with Chrome! Or see https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md');
    $("#demo-button").remove();
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
            }).catch(err => {
                log('ERROR reading battery level: ' + err);
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
        if (client.isV2()) {
            // is a F1sV2 device
            log('you are connecting a F1sV2 device. Warning: support for this version is experimental!');
            //client.notifySecurityAccess(function(raw) {
              //  log('reading security access from device: ' + raw);
            //});
        } else {
            log('you are connecting a F1s device (original version).');
        }

        log('***');
        log('PRESS THE CENTRAL BUTTON TO AUTHORIZE');
        log('***');

        return client.waitForAuthorization();

    }).then(function() {
        log('connection authorized!');
        log('will power ON motors in 5 seconds');

        /* subscribe to GATT notifications on value changes */
        client.notifyButtons(function(buttonsStatus) {
            if (buttonsStatus.any) {
                log('(notification) button ' + ( buttonsStatus.minus ? 'MINUS' : buttonsStatus.plus ? 'PLUS' : 'CENTRAL' ) + ' pressed!');
            } else {
                log('(notification) no buttons pressed');
            }
        });

        client.notifyInsertionDepthPercentage(function(sensorData) {
            log('(notification) insertion depth: ' + sensorData + ' %');
        });

        client.notifyAuthorization(function(sensorData) {
            log('(notification) authorization state: ' + sensorData);
        });

        client.notifyRotationSpeed(function(sensorData) {
            log('(notification) rotation speed: ' + sensorData);
        });

        return Promise.all([
            client.getUseCount().then(function(value) {
                log('usage counter: ' + value);
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
        log('powering OFF motors. will shutdown in 2 seconds');

        return Promise.all([
            client.shutdownMotors(),
            wait(2000)
        ]);
    })
    .then(function() {
        log('shutting down');
        client.shutdown();

    }, function(err) {
        console.error(err);
        log('disconnecting after error: ' + err);
        client.disconnect();
    });

}