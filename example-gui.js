var app = angular.module('demoApp', []);

app.controller('demoController', function($scope) {
    const client = leloF1SdkClientProvider.getClient();
    
    $scope.pending = 0;
    $scope.log = '';
    $scope.errors = [];
    $scope.authorized = false;

    // FAKE SIMULATION:
    $scope.batteryLevel = 80;
    $scope.temperature = 24.15;
    $scope.pressure = 980.75;
    $scope.acceleration = [100, 200, 1000];
    $scope.depth = 80;

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

            client.notifyKeyState(keyStateChanged);

            readDeviceInfo();
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
            refresh();

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
            refresh();

        }, function(err) {
            error('error shutting down device', err);
            $scope.pending --;
        });
    };

    function readDeviceInfo() {
        Promise.all([
            client.getBatteryLevel().then(function(value) {
                $scope.batteryLevel = value;
            }),
            client.getManufacturerName().then(function(value) {
                $scope.manufacturerName = value;
            }),
            client.getModelNumber().then(function(value) {
                $scope.modelNumber = value;
            }),
            client.getHardwareRevision().then(function(value) {
                $scope.hardwareRevision = value;
            }),
            client.getFirmwareRevision().then(function(value) {
                $scope.firmwareRevision = value;
            }),
            client.getSoftwareRevision().then(function(value) {
                $scope.softwareRevision = value;
            })
        ]).then(refresh);
    }

    function keyStateChanged(value) {
        $scope.authorized = value;
        refresh();
    }

    function error(prefix, err) {
        console.error(prefix, err)
        log(prefix + ': ' + err);
        $scope.errors.push(prefix + ': ' + err);
        debugger;
        refresh();
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
