function runDemo() {

    const client = leloF1SdkClientProvider.getClient();

    client.requestDevice().then(function(device) {
        return client.connect(device);
    })
    .then(function() {
        return client.getBatteryLevel().then(function(batteryLevel) {
            alert('battery is at ' + batteryLevel + ' %');
        });
    })
    .then(function() {
        client.disconnect();
    });
}