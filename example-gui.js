var app = angular.module('demoApp', []);

app.controller('demoController', function($scope) {
    const client = leloF1SdkClientProvider.getClient();
    
    $scope.pending = 0;
    $scope.log = '';
    $scope.errors = [];
    $scope.authorized = false;
    
    $scope.depth = null;

    setTimeout(function() {
        $("#loading-overlay").remove();
    }, 250);

    const notifications = [];
    const sensorNotifications = [];

    setInterval(checkConnectionStatus, 2000);

    setInterval(checkBatteryStatus, 5000);

    $scope.isConnected = function() {
        return client && client.isConnected();
    }

    $scope.connect = function() {
        $scope.pending ++;
        refresh();

        log('connecting to device ...');
        client.searchAndConnect().then(function() {
            log('device connected!');
            $scope.pending --;
            $scope.authorized = false;

            readDeviceInfo();
            subscribeNotifications();
            refresh();

        }, function(err) {
            error('error connecting', err);
            $scope.pending --;
        });
    };

    $scope.disconnect = function() {
        $scope.pending ++;
        refresh();

        log('disconnecting from device ...');
        client.disconnect().then(function() {
            log('device disconnected');
            $scope.pending --;
            clearConnection();

        }, function(err) {
            error('error disconnecting', err);
            $scope.pending --;
        });
    };

    $scope.shutdown = function() {
        $scope.pending ++;
        refresh();

        log('shutting down device ...');
        client.shutdown().then(function() {
            log('device shutdown and disconnected');
            $scope.pending --;
            clearConnection();

        }, function(err) {
            error('error shutting down device', err);
            $scope.pending --;
        });
    };

    function checkConnectionStatus() {
        if ($scope.isConnected()) {
            client.ping().then(function() {
                // still connected
            }, function(err) {
                // device not responding
                setTimeout(function() {
                    if ($scope.isConnected()) {
                        error('device is not responding', err);
                        $scope.authorized = false;
                        client.disconnect();
                        clearConnection();
                    }
                }, 500);
            });
        }
    }

    function checkBatteryStatus() {
        if ($scope.isConnected()) {
            client.getBatteryLevel().then(function(batteryLevel) {
                batteryLevelChanged(batteryLevel);
            });
        }
    }

    function subscribeNotifications() {
        $scope.depth = 0;

        notifications.push(client.notifyKeyState(keyStateChanged));
        notifications.push(client.notifyButtons(buttonsChanged));

        sensorNotifications.push(client.notifyAccelerometer(toScope('acceleration')));
        sensorNotifications.push(client.notifyInsertionDepthPercentage(toScope('depth')));
        sensorNotifications.push(client.notifyRotationSpeed(toScope('rotationSpeed')));
        sensorNotifications.push(client.notifyTemperatureAndPressure(temperatureAndPressureChanged));
    }

    function batteryLevelChanged(value) {
        $scope.batteryLevel = value;
        refresh();
    }

    function keyStateChanged(value) {
        const previous = $scope.authorized;
        $scope.authorized = value;
        if (value && !previous) {
            // just authorized
            setTimeout(function() {
                client.shutdownMotors();
            }, 500);
        }
        refresh();
    }

    function buttonsChanged(value) {
        $scope.buttonsStatus = value;
        refresh();
    }

    function temperatureAndPressureChanged(value) {
        $scope.temperature = value[0];
        $scope.pressure = value[1];
        refresh();
    }

    function readDeviceInfo() {
        Promise.all([
            client.getBatteryLevel().then(batteryLevelChanged),
            client.getManufacturerName().then(toScope('manufacturerName')),
            client.getModelNumber().then(toScope('modelNumber')),
            client.getHardwareRevision().then(toScope('hardwareRevision')),
            client.getFirmwareRevision().then(toScope('firmwareRevision')),
            client.getSoftwareRevision().then(toScope('softwareRevision'))
        ]).then(refresh);
    }

    function clearConnection() {
        $scope.errors = [];
        $scope.authorized = false;
        
        $scope.depth = null;
        $scope.manufacturerName = null;
        $scope.modelNumber = null;
        $scope.hardwareRevision = null;
        $scope.firmwareRevision = null;
        $scope.softwareRevision = null;
        $scope.acceleration = null;
        $scope.depth = null;
        $scope.rotationSpeed = null;
        $scope.buttonsStatus = null;
        $scope.temperature = null;
        $scope.pressure = null;
        $scope.batteryLevel = null;

        notifications.length = 0;
        sensorNotifications.length = 0;
        
        refresh();
    }

    function toScope(name) {
        return function(value) {
            $scope[name] = value;
            refresh();
        }
    }

    function error(prefix, err) {
        console.error(prefix, err)
        log(prefix + ': ' + err);
        $scope.errors.push(prefix + ': ' + err);
        refresh();
        setTimeout(function() {
            $scope.errors.splice(0, 1);
            refresh();
        }, 5000);
    }

    function log(text) {
        $scope.log = $scope.log + text + '\n';
        refresh();
    }

    function refresh() {
        setTimeout(function() {
            $scope.$apply();
        });
    }

});
