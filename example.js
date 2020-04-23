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
        log('PRESS THE CENTRAL BUTTON TO AUTHORIZE');

        return Promise.all([
            client.getBatteryLevel().then(function(batteryLevel) {
                log('battery is at ' + batteryLevel + ' %');
            }),
            client.waitForAuthorization()
        ]);
    }).then(function() {

        log('connection authorized!');
        log('will power ON motors in 5 seconds');

        return Promise.all([
            client.getKeyState().then(function(keyState) {
                log('key state: ' + keyState);
            }),
            client.shutdownMotors(),
            wait(6000)
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
            })
            ;

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