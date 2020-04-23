var app = angular.module('demoApp', []);

app.controller('demoController', function($scope) {
    const client = leloF1SdkClientProvider.getClient();
    
    $scope.pending = 0;
    $scope.log = '';
    $scope.authorized = false;

    $scope.isConnected = function() {
        return client && client.isConnected();
    }

    $scope.connect = function() {
        $scope.pending ++;

        log('connecting to device ...');
        client.searchAndConnect().then(function() {
            log('device connected!');
            $scope.pending --;
            
            readDeviceInfo();
            
            refresh();

        }, function(err) {
            console.error('error connecting', err);
            log('error connecting: ' + err);
            $scope.pending --;
            refresh();
        });
    };

    $scope.disconnect = function() {
        $scope.pending ++;
        log('disconnecting from device ...');
        client.disconnect().then(function() {
            log('device disconnected');
            $scope.pending --;
            refresh();

        }, function(err) {
            console.error('error disconnecting', err);
            log('error disconnecting: ' + err);
            $scope.pending --;
            refresh();
        });
    };

    $scope.shutdown = function() {
        $scope.pending ++;
        log('shutting down device ...');
        client.shutdown().then(function() {
            log('device shutdown and disconnected');
            $scope.pending --;
            refresh();

        }, function(err) {
            console.error('error shutting down device', err);
            log('error shutting down device: ' + err);
            $scope.pending --;
            refresh();
        });
    };

    function readDeviceInfo() {
        client.getBatteryLevel().then(function(value) {
            $scope.batteryLevel = value;
        });
        client.getManufacturerName().then(function(value) {
            $scope.manufacturerName = value;
        });
        client.getModelNumber().then(function(value) {
            $scope.modelNumber = value;
        });
        client.getHardwareRevision().then(function(value) {
            $scope.hardwareRevision = value;
        });
        client.getFirmwareRevision().then(function(value) {
            $scope.firmwareRevision = value;
        });
        client.getSoftwareRevision().then(function(value) {
            $scope.softwareRevision = value;
        });
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
