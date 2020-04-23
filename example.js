function log(text) {
    $('#log-container').append(text + '<br/>');
}

function runDemo() {
    $("#demo-button").remove();

    const client = leloF1SdkClientProvider.getClient();

    log('looking for device ...');
    client.searchAndConnect().then(function() {

        log('device connected!');

        return Promise.all([
            client.getKeyState().then(function(keyState) {
                log('key state: ' + keyState);
            }),
    
            client.getBatteryLevel().then(function(batteryLevel) {
                log('battery is at ' + batteryLevel + ' %');
            })
        ]);
    })
    .then(function() {
        log('disconnecting');
        client.disconnect();
    }, function(err) {
        log('disconnecting after error');
        client.disconnect();
    });

}