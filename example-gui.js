var app = angular.module('demoApp', []);

app.controller('demoController', function($scope) {
    const client = leloF1SdkClientProvider.getClient();
    const BATTERY_SAVING_TRESHOLD = 15;
    const SCALE_SPEED_MIN = 30;
    const SCALE_SPEED_STEP = 5;
    const BUTTONS_ASSIGNMENT_MAIN_MOTOR = 1;
    const BUTTONS_ASSIGNMENT_VIBE_MOTOR = 2;
    const BUTTONS_ASSIGNMENT_BOTH_MOTORS = 3;
    $scope.BUTTONS_ASSIGNMENT_MAIN_MOTOR = BUTTONS_ASSIGNMENT_MAIN_MOTOR;
    $scope.BUTTONS_ASSIGNMENT_VIBE_MOTOR = BUTTONS_ASSIGNMENT_VIBE_MOTOR;
    $scope.BUTTONS_ASSIGNMENT_BOTH_MOTORS = BUTTONS_ASSIGNMENT_BOTH_MOTORS;

    $scope.pending = 0;
    $scope.log = 'click on CONNECT to begin\n';
    $scope.errors = [];
    $scope.authorized = false;
    $scope.batterySaving = false;
    $scope.depth = null;
    $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_VIBE_MOTOR;
    $scope.buttonsStatus = {};

    const notifications = [];
    const sensorNotifications = [];

    setTimeout(function() {
        $("#loading-overlay").remove();
    }, 250);

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
            checkMotorsLevel();
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

    $scope.incrementMainMotor = function() {
        let toSet = ($scope.mainMotorLevel || 0) + SCALE_SPEED_STEP;
        if (toSet > 100) {
            toSet = 100;
        }
        client.setMotorsSpeed(toDeviceSpeed(toSet), toDeviceSpeed($scope.vibeMotorLevel)).then(function() {
            $scope.mainMotorLevel = toSet;
            refresh();
        });
    };

    $scope.decrementMainMotor = function() {
        let toSet = ($scope.mainMotorLevel || 0) - SCALE_SPEED_STEP;
        if (toSet < 0) {
            toSet = 0;
        }
        client.setMotorsSpeed(toDeviceSpeed(toSet), toDeviceSpeed($scope.vibeMotorLevel)).then(function() {
            $scope.mainMotorLevel = toSet;
            refresh();
        });
    };

    $scope.stopMainMotor = function() {
        client.setMotorsSpeed(0, toDeviceSpeed($scope.vibeMotorLevel)).then(function() {
            $scope.mainMotorLevel = 0;
            refresh();
        });
    };

    $scope.incrementVibeMotor = function() {
        let toSet = ($scope.vibeMotorLevel || 0) + SCALE_SPEED_STEP;
        if (toSet > 100) {
            toSet = 100;
        }
        client.setMotorsSpeed(toDeviceSpeed($scope.mainMotorLevel), toDeviceSpeed(toSet)).then(function() {
            $scope.vibeMotorLevel = toSet;
            refresh();
        });
    };

    $scope.decrementVibeMotor = function() {
        let toSet = ($scope.vibeMotorLevel || 0) - SCALE_SPEED_STEP;
        if (toSet < 0) {
            toSet = 0;
        }
        client.setMotorsSpeed(toDeviceSpeed($scope.mainMotorLevel), toDeviceSpeed(toSet)).then(function() {
            $scope.vibeMotorLevel = toSet;
        });
    };

    $scope.stopVibeMotor = function() {
        client.setMotorsSpeed($scope.mainMotorLevel, 0).then(function() {
            $scope.vibeMotorLevel = 0;
            refresh();
        });
    };

    $scope.centralButtonPressed = function() {
        if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_VIBE_MOTOR) {
            $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_MAIN_MOTOR;

        } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_MAIN_MOTOR) {
            $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_BOTH_MOTORS;

        } else {
            $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_VIBE_MOTOR;
        }

        refresh();
    }

    $scope.plusButtonPressed = function() {
        if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_VIBE_MOTOR) {
            $scope.incrementVibeMotor();
        } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_MAIN_MOTOR) {
            $scope.incrementMainMotor();
        } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_BOTH_MOTORS) {
            $scope.incrementMainMotor();
            $scope.incrementVibeMotor();
        }

        refresh();
    }

    $scope.minusButtonPressed = function() {
        if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_VIBE_MOTOR) {
            $scope.decrementVibeMotor();
        } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_MAIN_MOTOR) {
            $scope.decrementMainMotor();
        } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_BOTH_MOTORS) {
            $scope.decrementMainMotor();
            $scope.decrementVibeMotor();
        }

        refresh();
    }

    function onAuthorized() {
        log('connection authorized')

        setTimeout(function() {
            client.shutdownMotors();
            checkMotorsLevel();
            refresh();
        }, 500);
        
        checkMotorsLevel();
        refresh();
    }

    function toLocalSpeed(deviceSpeed) {
        // scale device 30-100 to local 0-100
        if (deviceSpeed < SCALE_SPEED_MIN) {
            return 0;
        } else {
            return (deviceSpeed - SCALE_SPEED_MIN) * (100 / (100 - SCALE_SPEED_MIN));
        }
    }

    function toDeviceSpeed(localSpeed) {
        // scale local 0-100 to device 30-100
        if (localSpeed < 1) {
            return 0;
        } else {
            return SCALE_SPEED_MIN + ( (100 - SCALE_SPEED_MIN) * localSpeed / 100.0 );
        }
    }

    function checkMotorsLevel() {
        if ($scope.isConnected()) {
            client.getMotorsSpeed().then(function(speeds) {
                $scope.mainMotorLevel = toLocalSpeed(speeds[0]);
                $scope.vibeMotorLevel = toLocalSpeed(speeds[1]);
                refresh();
            });
        }
    }

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
        if (!$scope.batterySaving) {
            if (value < BATTERY_SAVING_TRESHOLD) {
                enterBatterySaving();
            }
        }
        refresh();
    }

    function enterBatterySaving() {
        $scope.batterySaving = true;
        for (const notification of sensorNotifications) {
            notification.unregister();
        }
        sensorNotifications.length = 0;
        log('entering power saving mode');
        refresh();
    }

    function keyStateChanged(value) {
        const previous = $scope.authorized;
        $scope.authorized = value;
        if (value && !previous) {
            // just authorized
            onAuthorized();
        }
        refresh();
    }

    function buttonsChanged(value) {
        $scope.buttonsStatus = value;
        
        if ($scope.authorized) {
            if (value.central) {
                $scope.centralButtonPressed();
            } else if (value.minus) {
                $scope.minusButtonPressed();
            } else if (value.plus) {
                $scope.plusButtonPressed();
            }
        }

        refresh();
    }

    function temperatureAndPressureChanged(value) {
        $scope.temperature = value[0];
        $scope.pressure = value[1];
        refresh();
    }

    function readDeviceInfo() {
        client.getBatteryLevel().then(batteryLevelChanged);
        client.getManufacturerName().then(toScope('manufacturerName'));
        client.getModelNumber().then(toScope('modelNumber'));
        client.getHardwareRevision().then(toScope('hardwareRevision'));
        client.getFirmwareRevision().then(toScope('firmwareRevision'));
        client.getSoftwareRevision().then(toScope('softwareRevision'));
    }

    function clearConnection() {
        $scope.errors = [];
        $scope.authorized = false;
        $scope.batterySaving = false;
        
        $scope.depth = null;
        $scope.manufacturerName = null;
        $scope.modelNumber = null;
        $scope.hardwareRevision = null;
        $scope.firmwareRevision = null;
        $scope.softwareRevision = null;
        $scope.acceleration = null;
        $scope.depth = null;
        $scope.buttonsStatus = null;
        $scope.temperature = null;
        $scope.pressure = null;
        $scope.batteryLevel = null;

        $scope.rotationSpeed = null;
        $scope.mainMotorLevel = null;
        $scope.vibeMotorLevel = null;

        notifications.length = 0;
        sensorNotifications.length = 0;

        // $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_VIBE_MOTOR;
        
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
        /*
        refresh();
        const textarea = $('.console')[0];
        setInterval(function(){
            textarea.scrollTop = textarea.scrollHeight;
        }, 300);
        */
    }

    function refresh() {
        setTimeout(function() {
            $scope.$apply();
        });
    }

});
