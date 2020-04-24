const leloF1SdkDeviceDefinitions = {
    LELO_SERVICE: '0000fff0-0000-1000-8000-00805f9b34fb',
    DEVICE_INFORMATION_SERVICE: '0000180a-0000-1000-8000-00805f9b34fb',
	GENERIC_ACCESS_PROFILE: '00001800-0000-1000-8000-00805f9b34fb',
	GENERIC_ATTRIBUTE_PROFILE: '00001801-0000-1000-8000-00805f9b34fb',

    MOTOR_CONTROL: '0000fff1-0000-1000-8000-00805f9b34fb',
    KEY_STATE:  '00000a0f-0000-1000-8000-00805f9b34fb',
    USER_RECORD: '00000a04-0000-1000-8000-00805f9b34fb',
    BUTTON: '00000aa4-0000-1000-8000-00805f9b34fb',
    PRESSURE: '00000a0a-0000-1000-8000-00805f9b34fb',
    ACCELEROMETER: '00000a0c-0000-1000-8000-00805f9b34fb',
    LENGTH: '00000a0b-0000-1000-8000-00805f9b34fb',
    HALL: '00000aa3-0000-1000-8000-00805f9b34fb',
    WAKE_UP: '00000aa1-0000-1000-8000-00805f9b34fb',
    MOTOR_WORK_ON_TOUCH: '00000aa5-0000-1000-8000-00805f9b34fb',
	VIBRATOR_SETTING: '00000a0d-0000-1000-8000-00805f9b34fb',
    
    MANUFACTURER_NAME: '00002a29-0000-1000-8000-00805f9b34fb',
	MODEL_NUMBER: '00002a24-0000-1000-8000-00805f9b34fb',
	HARDWARE_REVISION: '00002a27-0000-1000-8000-00805f9b34fb',
	FIRMWARE_REVISION: '00002a26-0000-1000-8000-00805f9b34fb',
    SOFTWARE_REVISION: '00002a28-0000-1000-8000-00805f9b34fb',
    
    BATTERY_LEVEL: '00002a19-0000-1000-8000-00805f9b34fb',
    CHIP_ID: '00000a07-0000-1000-8000-00805f9b34fb',
    MAC_ADDRESS: '00000a06-0000-1000-8000-00805f9b34fb',
	SERIAL_NUMBER: '00000a05-0000-1000-8000-00805f9b34fb',
};

const leloF1SdkConstants = {
    DEVICE_NAME: 'F1s',
    USED_SERVICES: [{
        name: 'battery service',
        uuid: 'battery_service',
        characteristics: [{
            name: 'battery level',
            uuid: 'battery_level'
        }]
    }, {
        name: 'DeviceInformation service',
        uuid: leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE,
        characteristics: [
            { name: 'MANUFACTURER NAME', uuid: leloF1SdkDeviceDefinitions.MANUFACTURER_NAME },
            { name: 'MODEL NUMBER', uuid: leloF1SdkDeviceDefinitions.MODEL_NUMBER },
            { name: 'HARDWARE REVISION', uuid: leloF1SdkDeviceDefinitions.HARDWARE_REVISION },
            { name: 'FIRMWARE REVISION', uuid: leloF1SdkDeviceDefinitions.FIRMWARE_REVISION },
            { name: 'SOFTWARE REVISION', uuid: leloF1SdkDeviceDefinitions.SOFTWARE_REVISION }
        ]
    }, {
        name: 'LELO service',
        uuid: leloF1SdkDeviceDefinitions.LELO_SERVICE,
        characteristics: [
            { name: 'KEY STATE', uuid: leloF1SdkDeviceDefinitions.KEY_STATE },
            { name: 'MOTOR CONTROL', uuid: leloF1SdkDeviceDefinitions.MOTOR_CONTROL },
            { name: 'USER RECORD', uuid: leloF1SdkDeviceDefinitions.USER_RECORD },
            { name: 'BUTTON', uuid: leloF1SdkDeviceDefinitions.BUTTON },
            { name: 'PRESSURE', uuid: leloF1SdkDeviceDefinitions.PRESSURE },
            { name: 'ACCELEROMETER', uuid: leloF1SdkDeviceDefinitions.ACCELEROMETER },
            { name: 'LENGTH', uuid: leloF1SdkDeviceDefinitions.LENGTH },
            { name: 'HALL', uuid: leloF1SdkDeviceDefinitions.HALL },
            { name: 'WAKE UP', uuid: leloF1SdkDeviceDefinitions.WAKE_UP },
            { name: 'CRUISE CONTROL', uuid: leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH },
            { name: 'VIBRATOR SETTING', uuid: leloF1SdkDeviceDefinitions.VIBRATOR_SETTING }
        ]
    }],
    OPTIONAL_SERVICES: [
        'battery_service',
        leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE,
        leloF1SdkDeviceDefinitions.LELO_SERVICE
    ],
    EVENTS: {
        CHARACTERISTIC_VALUE_CHANGED: 'characteristicvaluechanged'
    },
    TEXT_DECODER: new TextDecoder('utf-8'),
};

const leloF1SdkConverters = {
    TO_STRING: function(value) { return leloF1SdkConstants.TEXT_DECODER.decode(value); },
    TO_BOOLEAN: function(value) { return !!(value.getUint8(0)); },
    TO_UINT8: function(value) { return value.getUint8(0); },
    TO_UINT16: function(value) { return value.getUint16(0); },
    TO_DEPTH_PERCENTAGE: function(value) { return value.getUint16(0) * 12.5; },
    TO_BUTTONS: function(value) {
        const v = value.getUint8(0);
        return {
            any: v !== 3,
            minus: v === 2,
            plus: v === 1,
            central: v === 0,
            none: v === 3,
            value: v
        };
    },
    TO_ACCELEROMETER: function(value) {
        return [ value.getUint16(0), value.getUint16(2), value.getUint16(4) ];
    },
    TO_TEMPERATURE_AND_PRESSURE: function(value) {
        return [
            (value.getUint16(1) + (value.getUint8(0)*256*256))/100.0,
            (value.getUint32(4) / 100.0)
        ];
    },
    TO_TEMPERATURE: function(value) { return (value.getUint16(1) + (value.getUint8(0)*256*256))/100.0; },
    TO_PRESSURE: function(value) { return (value.getUint32(4) / 100.0); }
};

const leloF1SdkLoggerBridge = {
    prefix: '[lelo-f1-sdk-web] ',

    log: function(text, args) {
        if (args) console.log(this.prefix + '[info] ' + text, args)
        else console.log(this.prefix + '[info] ' + text)
    },
    debug: function(text, args) {
        if (args) console.log(this.prefix + '[debug] ' + text, args)
        else console.log(this.prefix + '[debug] ' + text)
    },
    info: function(text, args) {
        if (args) console.log(this.prefix + '[info] ' + text, args)
        else console.log(this.prefix + '[info] ' + text)
    },
    warn: function(text, args) {
        if (args) console.warn(this.prefix + '[WARN] ' + text, args)
        else console.warn(this.prefix + '[WARN] ' + text)
    },
    warning: function(text, args) {
        if (args) console.warn(this.prefix + '[WARN] ' + text, args)
        else console.warn(this.prefix + '[WARN] ' + text)
    },
    error: function(text, args) {
        if (args) console.error(this.prefix + '[ERROR] ' + text, args)
        else console.error(this.prefix + '[ERROR] ' + text)
    }
};

const leloF1SdkWebClient = {
    device: null,
    server: null,
    disposing: false,
    services: {
        'dummy-uuid': {
            name: 'dummy service',
            uuid: 'dummy-uuid',
            characteristics: {
                'dummy-char-uuid': {
                    name: 'dummy char',
                    uuid: 'dummy-char-uuid',
                }
            }
        }
    },
    logger: leloF1SdkLoggerBridge,
    lockIndex: 0,
    lockUUID: 0,
    notificationProgressive: 0,
    
    searchAndConnect: function() {
        const context = this;
        context.disposing = false;
        context.logger.debug('running search-and-connect routine');
        return context.requestDevice().then(function(device) {
            return context.connect(device);
        });
    },

    requestDevice: function() {
        const context = this;
        context.disposing = false;
        context.logger.debug('requesting devices. Browser window should popup');

        return navigator.bluetooth.requestDevice({ filters: [{
            name: leloF1SdkConstants.DEVICE_NAME
          }],
          optionalServices: leloF1SdkConstants.OPTIONAL_SERVICES 
        }).then(function(result) {
            context.logger.debug('devices request finished', result);
            return result;
        }, function(err) {
            context.logger.error('error in devices request', err);
            throw err;
        });
    },

    connect: function(device) {
        const context = this;
        context.disposing = false;
        this.logger.debug('attempting connection to device', device);

        return device.gatt.connect().then(function(server) {
            context.logger.info('connected to device', device);
            context.services = {};

            return context._discoverServices(device, server).then(function(result) {
                context.logger.debug('services discovery completed', context.services);
                context.device = device;
                context.server = server;
                context.disposing = false;

                return server;
            }, function(err2) {
                context.logger.error('error in services discovery after connection', err2);
                throw err2;
            })
        }, function(err) {
            context.logger.error('error in device connection', err);
            throw err;
        });
    },

    disconnect: function() {
        const context = this;
        context.disposing = true;
        if (!context.device) {
            context.logger.debug('not disconnecting from device because it is not connected');    
            return Promise.resolve();
        }

        return this._unregisterAllNotificationHandlers().then(function() {
            context.logger.debug('disconnecting from device');

            const device = context.device;
    
            context.device = null;
            context.server = null;
            context.services = {};
    
            device.gatt.disconnect();
            
            return Promise.resolve().then(function() {
                context.logger.info('disconnected from device');
                return;
            }, function(err) {
                context.logger.error('error in disconnection', err);
                throw err;
            });
        });
    },

    // NEEDS TESTING
    shutdown: function() {
        const context = this;
        context.disposing = true;
        context.logger.debug('shutdown requested');
        context.logger.debug('unregistering all notifications');

        return context._unregisterAllNotificationHandlers().then(function() {
            context.logger.debug('shutting down device');

            function onShutdown() {
                context.logger.debug('shut down signal sent');
                const device = context.device;
    
                context.device = null;
                context.server = null;
                context.services = {};

                device.gatt.disconnect();

                return true;
            }

            return context._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, 
                Uint8Array.of(1, 250), true).then(function() {
                return onShutdown();

            }, function(err) {
                context.logger.warn('error writing shutdown signal - this might be normal as a SHUTDOWN signal has been sent', err);
                return onShutdown();
            });
        });
    },

    _discoverServices: function(device, server) {
        const context = this;
        context.logger.debug('discovering device services');

        const promises = [];
        for (const entry of leloF1SdkConstants.USED_SERVICES) {
            context.logger.debug('discovering device service', entry.name);

            promises.push(server.getPrimaryService(entry.uuid).then(function(service) {
                context.logger.debug('discovery found service ' + entry.name);
                const serviceEntry = {
                    name: entry.name,
                    uuid: entry.uuid,
                    handler: service,
                    characteristics: {}
                };
                context.services[entry.uuid] = serviceEntry;
                return context._discoverServiceCharacteristics(entry, service).then(function(result) {
                    context.logger.debug('characteristics discovery for service ' + entry.name + ' completed', result);
                    return result;
                }, function(errSD) {
                    context.logger.error('error in characteristics discovery for service ' + entry.name, errSD);
                    throw errSD;
                });

            }, function(err) {
                context.logger.error('error looking for service ' + entry.name, err);
                throw err;
            }));
        }

        return Promise.all(promises).then(function() {
            context.logger.debug('services discovery completed', context.services);
            return context.services;
        }, function(errExt) {
            context.logger.error('error in services discovery', errExt);
            throw errExt;
        });
    },

    _discoverServiceCharacteristics(entry, service) {
        const context = this;
        context.logger.debug('discovering service ' + entry.name + ' characteristics');
        const charPromises = [];

        for (const charEntry of entry.characteristics) {
            context.logger.debug('discovering service characteristic', charEntry);
            
            charPromises.push(service.getCharacteristic(charEntry.uuid).then(function(characteristic) {
                context.logger.debug('discovery found service ' + entry.name + ' characteristic ' + charEntry.uuid);
                const charToAdd = {
                    name: charEntry.name,
                    uuid: charEntry.uuid,
                    handler: characteristic
                };
                context.services[entry.uuid].characteristics[charEntry.uuid] = charToAdd;
                return characteristic;

            }, function(charErr) {
                context.logger.error('error looking for service ' + entry.name + ' characteristic ' + charEntry.uuid, charErr);
                throw charErr;
            }));
        }

        return Promise.all(charPromises).then(function() {
            context.logger.debug('characteristics discovery for service ' + entry.name + ' completed', context.services);
            return context.services;
        }, function(errExt) {
            context.logger.error('error in characteristics discovery for service ' + entry.name, errExt);
            throw errExt;
        });
    },

    _getService: function(uuid) {
        const service = this.services[uuid];
        if (!service) {
            this.logger.warn('service ' + uuid + ' not found or not registered');
            return null;
        }
        return service;
    },

    _getCharacteristic: function(serviceUUID, uuid) {
        const service = this._getService(serviceUUID);
        if (!service) {
            return null;
        }
        const characteristic = service.characteristics[uuid];
        if (!characteristic) {
            this.logger.warn('service ' + serviceUUID + ' characteristic ' + uuid + ' not found or not registered');
            return null;
        }
        return characteristic;
    },

    _withLock: function(routineName, promiseBuilder, lockProperty = 'bleReadWrite') {
        const context = this;
        const lockUUID = ++context.lockUUID;

        context.logger.debug('processing routine with access lock ' + lockProperty + ':' + lockUUID + ' - ' + routineName);

        return new Promise(function(resolve, reject) {
            let handler = null;
            let dispatched = false;

            function attemptDispatching() {
                if (!context[lockProperty]) {
                    context[lockProperty] = 0;
                }

                if (context[lockProperty] > 0) {
                    return;
                }

                context[lockProperty] ++;
                dispatched = true;

                try {
                    context.logger.debug('acquired BLE access lock ' + lockProperty + ':' + lockUUID + ' - ' + routineName);
                    const promise = promiseBuilder();

                    promise.then(function(cbResult) {
                        if (handler) {
                            clearInterval(handler);
                        }
                        context[lockProperty] --;
                        context.logger.debug('released BLE access lock ' + lockProperty + ':' + lockUUID + ' - ' + routineName);
                        resolve(cbResult);
                    }, function(cbError) {
                        if (handler) {
                            clearInterval(handler);
                        }
                        context[lockProperty] --;
                        context.logger.warn('promise rejected inside BLE access lock ' + lockProperty + ':' + lockUUID + ' - ' + routineName, cbError);
                        context.logger.debug('released BLE access lock ' + lockProperty + ':' + lockUUID + ' - ' + routineName);
                        reject(cbError);
                    });

                } catch (err) {
                    if (handler) {
                        clearInterval(handler);
                    }
                    context.logger.error('error in routine inside BLE access lock ' + lockProperty + ':' + lockUUID + ' - ' + routineName, err);
                    context[lockProperty] --;
                    context.logger.debug('released BLE access lock ' + lockProperty + ':' + lockUUID + ' - ' + routineName);
                    reject(err);
                }
            }
        
            attemptDispatching();

            if (!dispatched) {
                context.logger.debug('BLE access lock ' + lockProperty + ':' + lockUUID + ' is busy. Will wait for lock.');
                handler = setInterval(function() {
                    attemptDispatching();
                }, 10);
            }
        });
    },

    _read: function(serviceUUID, charUUID) {
        const context = this;
        try {
            const characteristic = context._getCharacteristic(serviceUUID, charUUID);
            if (!characteristic) {
                return Promise.reject('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
            }

            return context._withLock('READ ' + characteristic.name, function() {
                return characteristic.handler.readValue().then(function(value) {
                    context.logger.debug('READ ' + serviceUUID + ':' + charUUID);
                    return value;
                }, function(err) {
                    context.logger.warn('error reading from service ' + serviceUUID + ' characteristic ' + charUUID, err);
                    throw err;
                })
            });
        }
        catch(runtimeError) {
            return Promise.reject(runtimeError);
        }
    },

    _write: function(serviceUUID, charUUID, value, lock = true) {
        const context = this;
        try {
            const characteristic = context._getCharacteristic(serviceUUID, charUUID);
            if (!characteristic) {
                return Promise.reject('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
            }

            const dispatcher = function() {
                return characteristic.handler.writeValue(value).then(function(value) {
                    context.logger.debug('WRITE ' + serviceUUID + ':' + charUUID);
                    return value;
                }, function(err) {
                    context.logger.warn('error writing to service ' + serviceUUID + ' characteristic ' + charUUID, err);
                    throw err;
                });
            };

            if (lock) {
                return context._withLock('WRITE ' + characteristic.name, dispatcher);
            } else {
                return dispatcher();
            }
        }
        catch(runtimeError) {
            return Promise.reject(runtimeError);
        }
    },

    waitForAuthorization: function() {
        const context = this;
        if (!context.server) {
            return Promise.reject('Device not connected');
        }

        const promise = new Promise(function(resolve, reject) {

            const handler = setInterval(function() {
                context.logger.debug('checking for key_state ...');
                context.getKeyState().then(function(keyState) {
                    context.logger.debug('checking for key_state: ', keyState);
                    if (keyState) {
                        clearInterval(handler);
                        resolve(true);
                    }
                }, function(err) {
                    context.logger.debug('checking for key_state threw error', err);
                    clearInterval(handler);
                    reject(err);
                });
            }, 500);
    
        });

        return promise;
    },

    isConnected: function() {
        return !!this.server && !this.disposing;
    },
    
    isAuthorized: function() {
        const context = this;
        if (!context.server) {
            return Promise.resolve(false);
        } else {
            return context.getKeyState();
        }
    },
    
    getManufacturerName: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MANUFACTURER_NAME)
            .then(leloF1SdkConverters.TO_STRING);
    },

    getFirmwareRevision: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.FIRMWARE_REVISION)
            .then(leloF1SdkConverters.TO_STRING);
    },
    
    getHardwareRevision: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.HARDWARE_REVISION)
            .then(leloF1SdkConverters.TO_STRING);
    },
    
    getModelNumber: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MODEL_NUMBER)
            .then(leloF1SdkConverters.TO_STRING);
    },

    getSoftwareRevision: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.SOFTWARE_REVISION)
            .then(leloF1SdkConverters.TO_STRING);
    },
    
    getBatteryLevel: function() {
        return this._read('battery_service', 'battery_level')
            .then(leloF1SdkConverters.TO_UINT8);
    },

    getKeyState: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.KEY_STATE)
            .then(leloF1SdkConverters.TO_BOOLEAN);
    },
    
    getMotorsSpeed: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL).then(function(value) {
            return [value.getUint8(1), value.getUint8(2)];
        });
    },
    
    getMainMotorSpeed: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL).then(function(value) {
            return value.getUint8(1);
        });
    },
    
    getVibratorSpeed: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL).then(function(value) {
            return value.getUint8(2);
        });
    },
    
    setMotorsSpeed: function(motorSpeed, vibeSpeed) {
        if (motorSpeed === null || typeof motorSpeed ==='undefined' || vibeSpeed === null || typeof vibeSpeed ==='undefined') {
            return Promise.reject('Two values are required');
        }
        if (motorSpeed < 0 || motorSpeed > 100 || vibeSpeed < 0 || vibeSpeed > 100) {
            return Promise.reject('Values should be between 0 and 100');
        }
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, motorSpeed, vibeSpeed));
    },

    setMainMotorSpeed: function(motorSpeed) {
        const context = this;
        if (motorSpeed === null || typeof motorSpeed ==='undefined') {
            return Promise.reject('Value is required');
        }
        if (motorSpeed < 0 || motorSpeed > 100) {
            return Promise.reject('Value should be between 0 and 100');
        }
        return this.getVibratorSpeed().then(function(otherSpeed) {
            context.logger.debug('other motor speed is' + otherSpeed);
            return context._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, motorSpeed, otherSpeed));
        });
    },

    setVibratorSpeed: function(vibeSpeed) {
        const context = this;
        if (vibeSpeed === null || typeof vibeSpeed ==='undefined') {
            return Promise.reject('Value is required');
        }
        if (vibeSpeed < 0 || vibeSpeed > 100) {
            return Promise.reject('Value should be between 0 and 100');
        }
        return this.getMainMotorSpeed().then(function(otherSpeed) {
            context.logger.debug('other motor speed is' + otherSpeed);
            return context._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, otherSpeed, vibeSpeed));
        });
    },

    shutdownMotors: function() {
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, 0, 0));
    },

    stop: function() {
        /* ALIAS */
        return this.shutdownMotors();
    },

    // NEEDS TESTING
    verifyAccelerometer: function() {
        this.logger.debug('entering accelerometer verification mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(255, 255, 255));
    },

    getUseCount: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD)
            .then(leloF1SdkConverters.TO_UINT16);
    },
    
    resetUseCount: function() {
        this.logger.debug('clearing usage counter');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD, Uint8Array.of(238));
    },
    
    getButtonsStatus: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.BUTTON)
            .then(leloF1SdkConverters.TO_BUTTONS);
    },

    getButtons: function() {
        /* ALIAS */
        return this.getButtonsStatus();
    },
    
    getTemperatureAndPressure: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE)
            .then(leloF1SdkConverters.TO_TEMPERATURE_AND_PRESSURE);
    },
    
    getPressure: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE)
            .then(leloF1SdkConverters.TO_PRESSURE);
    },
    
    getTemperature: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE)
            .then(leloF1SdkConverters.TO_TEMPERATURE);
    },
    
    getAccelerometerX: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER).then(function(value) {
            return value.getUint16(0);
        });
    },

    getAccelerometerY: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER).then(function(value) {
            return value.getUint16(2);
        });
    },

    getAccelerometerZ: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER).then(function(value) {
            return value.getUint16(4);
        });
    },
    
    getAccelerometer: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER)
            .then(leloF1SdkConverters.TO_ACCELEROMETER);
    },

    getDepth: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.LENGTH)
            .then(leloF1SdkConverters.TO_UINT16);
    },
    
    getInsertionDepth: function() {
        /* ALIAS */
        return this.getDepth();
    },
    
    getInsertionDepthPercentage: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.LENGTH)
            .then(leloF1SdkConverters.TO_DEPTH_PERCENTAGE);
    },

    getRotationSpeed: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.HALL)
            .then(leloF1SdkConverters.TO_UINT16);
    },
    
    ping: function() {
        return this.getKeyState().then(function() {
            return true;
        });
    },
    
    getWakeUp: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP)
            .then(leloF1SdkConverters.TO_BOOLEAN);
    },
    
    // NEEDS TESTING
    enableWakeUp: function() {
        this.logger.debug('enabling quick wake-up');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, Uint8Array.of(1));
    },

    // NEEDS TESTING
    disableWakeUp: function() {
        this.logger.debug('disabling quick wake-up');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, Uint8Array.of(0));
    },
    
    getCruiseControl: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH)
            .then(leloF1SdkConverters.TO_BOOLEAN);
    },

    // NEEDS TESTING
    enableCruiseControl: function() {
        this.logger.debug('enabling cruise control mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH, Uint8Array.of(1));
    },

    // NEEDS TESTING
    disableCruiseControl: function() {
        this.logger.debug('disabling cruise control mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH, Uint8Array.of(0));
    },

    getVibrationSettings: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.VIBRATOR_SETTING).then(function(value) {
            return [
                value.getUint8(0),
                value.getUint8(1),
                value.getUint8(2),
                value.getUint8(3),
                value.getUint8(4),
                value.getUint8(5),
                value.getUint8(6),
                value.getUint8(7)
            ];
        });
    },
    
    // NEEDS TESTING
    setVibrationSettings: function(values) {
        if (values === null || typeof values ==='undefined') {
            return Promise.reject('Values are required');
        } else if (values.length != 8) {
            return Promise.reject('Exactly 8 values are required');
        }
        for (const val of values) {
            if (val < 0 || val > 100) {
                return Promise.reject('Values should be between 0 and 100');
            }
        }

        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, 
            Uint8Array.of( values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7] ));
    },
    
    notifyButtons: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.BUTTON,
            callback,
            leloF1SdkConverters.TO_BUTTONS,
            distinctUntilChanged );
    },
    
    notifyInsertionDepth: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.LENGTH,
            callback,
            leloF1SdkConverters.TO_UINT16,
            distinctUntilChanged );
    },
    
    notifyInsertionDepthPercentage: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.LENGTH,
            callback,
            leloF1SdkConverters.TO_DEPTH_PERCENTAGE,
            distinctUntilChanged );
    },
    
    notifyKeyState: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.KEY_STATE,
            callback,
            leloF1SdkConverters.TO_BOOLEAN,
            distinctUntilChanged );
    },
    
    notifyRotationSpeed: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.HALL,
            callback,
            leloF1SdkConverters.TO_UINT16,
            distinctUntilChanged );
    },
    
    notifyAccelerometer: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.ACCELEROMETER,
            callback,
            leloF1SdkConverters.TO_ACCELEROMETER,
            distinctUntilChanged );
    },
    
    notifyTemperatureAndPressure: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_TEMPERATURE_AND_PRESSURE,
            distinctUntilChanged );
    },
    
    notifyTemperature: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_TEMPERATURE,
            distinctUntilChanged );
    },
    
    notifyPressure: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_PRESSURE,
            distinctUntilChanged );
    },
    
    _buildNotificationHandler: function(characteristic, callback, distinctUntilChanged) {
        const context = this;
        const o = {
            characteristic: characteristic,
            id: ++context.notificationProgressive,
            active: false,
            userCallback: callback,
            distinctUntilChanged: distinctUntilChanged,
            lastDataBuffer: null
        };

        o._listener = function(value, event) {
            if (!o.active || !o.userCallback) {
                return;
            }
            o.userCallback(value, event);
        }

        o.unregister = function() {
            return context.unregister.apply(context, [o]);
        }

        return o;
    },

    _registerNotification: function(serviceUUID, charUUID, callback, converter, distinctUntilChanged) {
        const context = this;

        const characteristic = context._getCharacteristic(serviceUUID, charUUID);
        if (!characteristic) {
            return Promise.reject('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
        }

        return context._withLock('REGISTERING ' + characteristic.name, function() {
            context.logger.debug('registering notifications callback for characteristic ' + charUUID);
            const handler = context._buildNotificationHandler(characteristic, callback, distinctUntilChanged);

            let beRegisterHandle;

            if (!characteristic.notifying) {
                context.logger.debug('enabling channel notifications for characteristic ' + charUUID);
                beRegisterHandle = characteristic.handler.startNotifications().then(function(result) {
                    context.logger.debug('enabled channel notifications for characteristic ' + charUUID);
                    return result;
                });
            } else {
                beRegisterHandle = Promise.resolve(true);
            }

            return beRegisterHandle.then(function(value) {
                characteristic.notifying = true;

                if (!characteristic.notificationHandlers) {
                    characteristic.notificationHandlers = [];
                }

                handler._dispatcher = function(event) {
                    const convertedValue = converter && event && event.target && event.target.value ?
                        converter(event.target.value) : undefined;

                    if (distinctUntilChanged && event.target && event.target.value) {
                        if (handler.lastDataBuffer && context._callbackBufferEquals(event.target.value.buffer, handler.lastDataBuffer)) {
                            return;
                        }
                        handler.lastDataBuffer = event.target.value.buffer;
                    }

                    handler._listener.apply(handler, [convertedValue, event]);
                }
                
                characteristic.handler.addEventListener(leloF1SdkConstants.EVENTS.CHARACTERISTIC_VALUE_CHANGED, handler._dispatcher);
                characteristic.notificationHandlers.push(handler);

                context.logger.debug('there are now ' + characteristic.notificationHandlers.length + 
                    ' registered notification callbacks for characteristic ' + charUUID);

                handler.active = true;
                return handler;
            }, function(err) {
                context.logger.error('error enabling channel notifications for characteristic ' + charUUID, err);
                throw err;
            })

        }, 'notificationsLock');
    },

    unregister: function(handler) {
        const context = this;

        if (!handler) {
            return Promise.reject('handler is required');
        }

        const characteristic = handler.characteristic;

        return context._withLock('UNREGISTERING ' + characteristic.name, function() {
            context.logger.debug('unregistering notifications callback for characteristic ' + characteristic.uuid);

            handler.active = false;
            characteristic.notificationHandlers.splice(characteristic.notificationHandlers.indexOf(handler), 1);
            characteristic.handler.removeEventListener(leloF1SdkConstants.EVENTS.CHARACTERISTIC_VALUE_CHANGED, handler._dispatcher);

            context.logger.debug('there are now ' + characteristic.notificationHandlers.length + 
                ' registered notification callbacks for characteristic ' + characteristic.uuid);

            if (characteristic.notificationHandlers.length < 1) {
                context.logger.debug('disabling channel notifications for characteristic ' + characteristic.uuid);
                return characteristic.handler.stopNotifications().then(function() {
                    context.logger.debug('disabled channel notifications for characteristic ' + characteristic.uuid);
                    return handler;
                });
            } else {
                return Promise.resolve(handler);
            }

        }, 'notificationsLock');
    },

    _unregisterAllNotificationHandlers: function() {
        const context = this;

        context.logger.debug('unregistering all callbacks');
        const promises = [];

        for (const service of Object.values(this.services)) {
            for (const characteristic of Object.values(service.characteristics)) {
                if (characteristic.notificationHandlers && characteristic.notificationHandlers.length) {
                    for (const handler of characteristic.notificationHandlers) {
                        promises.push(this.unregister(handler).then(function(ok) {
                            return ok;
                        }, function(e) {
                            context.logger.warn('error unregistering callback', e);
                        }));
                    }
                }
            }
        }

        return Promise.all(promises).then(function() {
            context.logger.debug('unregistered all callbacks');

        }, function(err) {
            context.logger.error('error unregistering all callbacks', err);
            throw err;
        });
    },

    _callbackBufferEquals: function(buf1, buf2) {
        if (!buf1 || !buf2) {
            return false;
        }
        if (buf1.byteLength != buf2.byteLength) {
            return false;
        }
        var dv1 = new Int8Array(buf1);
        var dv2 = new Int8Array(buf2);
        for (var i = 0 ; i < buf1.byteLength ; i++) {
            if (dv1[i] != dv2[i]) {
                return false;
            }
        }
        return true;
    },

    _callbackDataDiffers(actual, previous) {
        /* 
        wrote line-by-line with many branches in order to optimize performances
        as this function could be called hundres of times each second.
        */
        const nullActual = actual === null || typeof actual === 'undefined';
        const nullPrevious = previous === null || typeof previous === 'undefined';
        if (nullActual && nullPrevious) {
            return false;
        } else if (nullActual !== nullPrevious) {
            return true;
        } else {
            if (Array.isArray(actual)) {
                // compare array
                if (actual.length != previous.length) {
                    return true;
                }
                for (let i = 0; i < actual.length; i ++) {
                    if (actual[i] !== previous[i]) {
                        return true;
                    }
                }
                return false;

            } else if (typeof actual === 'object') {
                // compare object
                for (const key of Object.keys(actual)) {
                    // TODO
                }

            } else {
                // compare primitive
                return actual !== previous;
            }
        }
    },
    
    getDeviceName: function() {
        // fixed - lookup implemented by name so ...
        return Promise.resolve(leloF1SdkConstants.DEVICE_NAME);
    },
    
    getMacAddress: function() {
        this._notImplemented();
    },
    
    getChipId: function() {
        this._notImplemented();
    },

    getIEEE1107320601: function() {
        this._notImplemented();
    },
    
    getPNPId: function() {
        this._notImplemented();
    },
    
    getSerialNumber: function() {
        this._notImplemented();
    },
    
    getSystemId: function() {
        this._notImplemented();
    },
    
    _notImplemented: function() {
        return Promise.reject('NOT IMPLEMENTED - but working on it!');
    }
};

const leloF1SdkClientProvider = {

    getClient: function(){
        return leloF1SdkWebClient;
    }
};
