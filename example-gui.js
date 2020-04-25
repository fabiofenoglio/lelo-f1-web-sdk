var app = angular.module('demoApp', []);

if (!leloF1SdkClientProvider.isSupported()) {
    alert('sorry, your browser does not support Web Bluetooth API. Try with Chrome! Or see https://github.com/WebBluetoothCG/web-bluetooth/blob/master/implementation-status.md');
}

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

    $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_VIBE_MOTOR;

    $scope.cruiseControlModal = {
        enabled: false,
        levels: [30, 40, 50, 60, 70, 80, 90, 100]
    };

    const notifications = [];
    const sensorNotifications = [];
    
    clearConnection();

    setInterval(checkConnectionStatus, 2000);
    setInterval(checkMotorsLevelOnCruiseControl, 1000);
    setInterval(checkBatteryStatus, 5000);

    $scope.isConnected = function() {
        return client && client.isConnected();
    }

    $scope.connect = function() {
        $scope.pending ++;
        refresh();

        console.log('connecting to device ...');
        client.searchAndConnect().then(function() {
            console.log('device connected!');
            $scope.pending --;
            $scope.authorized = false;

            readDeviceInfo();
            subscribeNotifications();
            checkMotorsLevel();
            refresh();

        }, function(err) {
            $scope.pending --;
            error('error connecting', err);
        });
    };

    $scope.disconnect = function() {
        $scope.pending ++;
        refresh();

        console.log('disconnecting from device ...');
        client.disconnect().then(function() {
            console.log('device disconnected');
            $scope.pending --;
            clearConnection();

        }, function(err) {
            $scope.pending --;
            error('error disconnecting', err);
        });
    };

    $scope.shutdown = function() {
        $scope.pending ++;
        refresh();

        console.log('shutting down device ...');
        client.shutdown().then(function() {
            console.log('device shutdown and disconnected');
            $scope.pending --;
            clearConnection();

        }, function(err) {
            $scope.pending --;
            error('error shutting down device', err);
        });
    };

    $scope.incrementMainMotor = function() {
        let toSet = ($scope.mainMotorLevel || 0) + SCALE_SPEED_STEP;
        if (toSet > 100) {
            toSet = 100;
        } else if (toSet < SCALE_SPEED_MIN) {
            toSet = SCALE_SPEED_MIN;
        }
        client.setMotorsSpeed(toDeviceSpeed(toSet), toDeviceSpeed($scope.vibeMotorLevel)).then(function() {
            $scope.mainMotorLevel = toSet;
            refresh();
        });
    };

    $scope.decrementMainMotor = function() {
        let toSet = ($scope.mainMotorLevel || 0) - SCALE_SPEED_STEP;
        if (toSet < SCALE_SPEED_MIN) {
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
        } else if (toSet < SCALE_SPEED_MIN) {
            toSet = SCALE_SPEED_MIN;
        }
        client.setMotorsSpeed(toDeviceSpeed($scope.mainMotorLevel), toDeviceSpeed(toSet)).then(function() {
            $scope.vibeMotorLevel = toSet;
            refresh();
        });
    };

    $scope.decrementVibeMotor = function() {
        let toSet = ($scope.vibeMotorLevel || 0) - SCALE_SPEED_STEP;
        if (toSet < SCALE_SPEED_MIN) {
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
        if (!$scope.isConnected() || !$scope.authorized) {
            return;
        }

        if (!$scope.cruiseControlStatus) {
            if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_VIBE_MOTOR) {
                $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_MAIN_MOTOR;

            } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_MAIN_MOTOR) {
                $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_BOTH_MOTORS;

            } else {
                $scope.buttonsAssignment = BUTTONS_ASSIGNMENT_VIBE_MOTOR;
            }
        }

        refresh();
    }

    $scope.plusButtonPressed = function() {
        if (!$scope.isConnected() || !$scope.authorized) {
            return;
        }
        
        if (!$scope.cruiseControlStatus) {
            if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_VIBE_MOTOR) {
                $scope.incrementVibeMotor();
            } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_MAIN_MOTOR) {
                $scope.incrementMainMotor();
            } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_BOTH_MOTORS) {
                $scope.incrementMainMotor();
                $scope.incrementVibeMotor();
            }
        }

        refresh();
    }

    $scope.minusButtonPressed = function() {
        if (!$scope.isConnected() || !$scope.authorized) {
            return;
        }
        
        if (!$scope.cruiseControlStatus) {
            if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_VIBE_MOTOR) {
                $scope.decrementVibeMotor();
            } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_MAIN_MOTOR) {
                $scope.decrementMainMotor();
            } else if ($scope.buttonsAssignment === BUTTONS_ASSIGNMENT_BOTH_MOTORS) {
                $scope.decrementMainMotor();
                $scope.decrementVibeMotor();
            }
        }

        refresh();
    }

    $scope.applyCruiseControlModal = function() {
        $('#cruiseControlModal').modal('hide');
        $scope.pending ++;
        refresh();
        const parsed = $scope.cruiseControlModal.levels.map(function(x){return parseInt(x, 10); });

        client.setVibrationSettings(parsed).then(function() {
            $scope.cruiseControlLevels = parsed;
            $scope.pending ++;
            refresh();
            const dispatcher = $scope.cruiseControlModal.enabled ? client.enableCruiseControl : client.disableCruiseControl;
            
            client.shutdownMotors().then(function() {
                dispatcher().then(function() {
                    $scope.cruiseControlStatus = $scope.cruiseControlModal.enabled;
                    $scope.pending --;
                    refresh();
                    setTimeout(function() {
                        client.shutdownMotors().then(checkMotorsLevel);
                    }, 200);
                }, function(err2) {
                    $scope.pending --;
                    error('error configuring cruise control', err2);
                });
            });

            $scope.pending --;
            refresh();
        }, function(err) {
            $scope.pending --;
            error('error applying vibration settings', err);
        });
    }

    function onAuthorized() {
        console.log('connection authorized')

        setTimeout(function() {
            client.shutdownMotors();
            checkMotorsLevel();
            checkCruiseControl();
            refresh();
        }, 500);
        
        checkMotorsLevel();
        refresh();
    }

    function toLocalSpeed(deviceSpeed) {
        return deviceSpeed;
        /*
        // scale device 30-100 to local 0-100
        if (deviceSpeed < SCALE_SPEED_MIN) {
            return 0;
        } else {
            return (deviceSpeed - SCALE_SPEED_MIN) * (100 / (100 - SCALE_SPEED_MIN));
        }
        */
    }

    function toDeviceSpeed(localSpeed) {
        return localSpeed;
        /*
        // scale local 0-100 to device 30-100
        if (localSpeed < 1) {
            return 0;
        } else {
            return SCALE_SPEED_MIN + ( (100 - SCALE_SPEED_MIN) * localSpeed / 100.0 );
        }
        */
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

    function checkCruiseControl() {
        if ($scope.isConnected()) {
            client.getCruiseControl().then(function(cruiseControlStatus) {
                $scope.cruiseControlStatus = cruiseControlStatus;
                $scope.cruiseControlModal.enabled = cruiseControlStatus;
                refresh();
            });
            client.getVibrationSettings().then(function(values) {
                $scope.cruiseControlLevels = values;
                $scope.cruiseControlModal.levels = values;
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

    function checkMotorsLevelOnCruiseControl() {
        if ($scope.isConnected()) {
            checkMotorsLevel();
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

        client.notifyKeyState(keyStateChanged).then(toArray(notifications));
        client.notifyButtons(buttonsChanged).then(toArray(notifications));

        client.notifyAccelerometer(toScope('acceleration')).then(toArray(sensorNotifications));
        client.notifyInsertionDepthPercentage(toScope('depth')).then(toArray(sensorNotifications));
        client.notifyRotationSpeed(rotationSpeedChanged).then(toArray(sensorNotifications));
        client.notifyTemperatureAndPressure(temperatureAndPressureChanged).then(toArray(sensorNotifications));
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
        console.log('entering power saving mode');
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

    function rotationSpeedChanged(value) {
        $scope.rotationSpeed = value;
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
        $scope.cruiseControlStatus = null;
        $scope.cruiseControlLevels = null;
        $scope.buttonsStatus = {};

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

    function toArray(target) {
        return function(value) {
            target.push(value);
        }
    }

    function error(prefix, err) {
        console.error(prefix, err)
        $scope.errors.push(prefix + ': ' + err);
        refresh();
        setTimeout(function() {
            $scope.errors.splice(0, 1);
            refresh();
        }, 5000);
    }

    function refresh() {
        setTimeout(function() {
            $scope.$apply();
        });
    }

    setTimeout(function() {
        $("#loading-overlay").remove();
    }, 250);

});
