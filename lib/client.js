const leloF1SdkDeviceDefinitions = {
    LELO_SERVICE: '0000fff0-0000-1000-8000-00805f9b34fb',
    DEVICE_INFORMATION_SERVICE: '0000180a-0000-1000-8000-00805f9b34fb',

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
            { name: 'WAKE UP', uuid: leloF1SdkDeviceDefinitions.WAKE_UP }
        ]
    }],
    OPTIONAL_SERVICES: [
        'battery_service',
        leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE,
        leloF1SdkDeviceDefinitions.LELO_SERVICE
    ]
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
    textDecoder: new TextDecoder('utf-8'),
    
    searchAndConnect: function() {
        const context = this;
        context.logger.debug('running search-and-connect routine');
        return context.requestDevice().then(function(device) {
            return context.connect(device);
        });
    },

    requestDevice: function() {
        const context = this;
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
        this.logger.debug('attempting connection to device', device);

        return device.gatt.connect().then(function(server) {
            context.logger.info('connected to device', device);
            context.device = device;
            context.server = server;
            context.services = {};

            return context._discoverServices(device, server).then(function(result) {
                context.logger.debug('services discovery completed', context.services);
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
        if (!context.device) {
            this.logger.debug('not disconnecting from device because it is not connected');    
            return Promise.resolve();
        }

        this.logger.debug('disconnecting from device');

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
                    name: entry.name,
                    uuid: entry.uuid,
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

    _withLock: function(promiseBuilder) {
        const context = this;

        return new Promise(function(resolve, reject) {
            let handler = null;
            let dispatched = false;

            function attemptDispatching() {
                if (context.lockIndex > 0) {
                    context.logger.debug('waiting for BLE access lock ...');
                    return;
                }
                
                context.lockIndex ++;
                dispatched = true;

                try {
                    context.logger.debug('acquired BLE access lock');
                    const promise = promiseBuilder();

                    promise.then(function(cbResult) {
                        context.lockIndex --;
                        context.logger.debug('released BLE access lock');
                        if (handler) {
                            clearInterval(handler);
                        }
                        resolve(cbResult);
                    }, function(cbError) {
                        context.lockIndex --;
                        context.logger.debug('released BLE access lock');
                        if (handler) {
                            clearInterval(handler);
                        }
                        reject(cbError);
                    });

                } catch (err) {
                    context.logger.error('error in routine inside BLE access lock', err);
                    context.lockIndex --;
                    context.logger.debug('released BLE access lock');
                    if (handler) {
                        clearInterval(handler);
                    }
                    reject(err);
                }
            }
        
            attemptDispatching();

            if (!dispatched) {
                context.logger.debug('BLE access lock is busy. Will wait for lock.');
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

            return context._withLock(function() {
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

    _write: function(serviceUUID, charUUID, value) {
        const context = this;
        try {
            const characteristic = context._getCharacteristic(serviceUUID, charUUID);
            if (!characteristic) {
                return Promise.reject('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
            }

            return context._withLock(function() {
                return characteristic.handler.writeValue(value).then(function(value) {
                    context.logger.debug('WRITE ' + serviceUUID + ':' + charUUID);
                    return value;
                }, function(err) {
                    context.logger.warn('error writing to service ' + serviceUUID + ' characteristic ' + charUUID, err);
                    throw err;
                });
            });
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
        return !!this.server;
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
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MANUFACTURER_NAME).then(function(value) {
            return context.textDecoder.decode(value);
        });
    },

    getFirmwareRevision: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.FIRMWARE_REVISION).then(function(value) {
            return context.textDecoder.decode(value);
        });
    },
    
    getHardwareRevision: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.HARDWARE_REVISION).then(function(value) {
            return context.textDecoder.decode(value);
        });
    },
    
    getModelNumber: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MODEL_NUMBER).then(function(value) {
            return context.textDecoder.decode(value);
        });
    },

    getSoftwareRevision: function() {
        const context = this;
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.SOFTWARE_REVISION).then(function(value) {
            return context.textDecoder.decode(value);
        });
    },
    
    getBatteryLevel: function() {
        return this._read('battery_service', 'battery_level').then(function(value) {
            return value.getUint8(0);
        });
    },

    getKeyState: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.KEY_STATE).then(function(value) {
            return !!(value.getUint8(0));
        });
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
    shutdown: function() {
        this.logger.debug('shutting down device');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, 15, 10)).then(function() {
            this.logger.debug('shut down signal sent, disconnecting');
            return this.disconnect();
        });
    },

    // NEEDS TESTING
    verifyAccelerometer: function() {
        this.logger.debug('entering accelerometer verification mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(255, 255, 255));
    },

    getUseCount: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD).then(function(value) {
            return value.getUint16(0);
        });
    },
    
    resetUseCount: function() {
        this.logger.debug('clearing usage counter');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD, Uint8Array.of(238));
    },
    
    getButtonsStatus: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.BUTTON).then(function(value) {
            const v = value.getUint8(0);
            return {
                any: v !== 3,
                minus: v === 2,
                plus: v === 1,
                central: v === 0,
                none: v === 3,
                value: v
            };
        });
    },

    getButtons: function() {
        /* ALIAS */
        return this.getButtonsStatus();
    },
    
    getTemperatureAndPressure: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE).then(function(value) {
            return [
                (value.getUint16(1) + (value.getUint8(0)*256*256))/100.0,
                (value.getUint32(4) / 100.0)
            ];
        });
    },
    
    getPressure: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE).then(function(value) {
            return (value.getUint32(4) / 100.0);
        });
    },
    
    getTemperature: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE).then(function(value) {
            return (value.getUint16(1) + (value.getUint8(0)*256*256))/100.0;
        });
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
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER).then(function(value) {
            return [
                value.getUint16(0),
                value.getUint16(2),
                value.getUint16(4)
            ];
        });
    },

    getDepth: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.LENGTH).then(function(value) {
            return value.getUint16(0);
        });
    },
    
    getInsertionDepth: function() {
        /* ALIAS */
        return this.getDepth();
    },
    
    getInsertionDepthPercentage: function() {
        return this.getDepth().then(function(on8) {
            return on8 * 12.5;
        });
    },

    getRotationSpeed: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.HALL).then(function(value) {
            return value.getUint16(0);
        });
    },
    
    ping: function() {
        return this.getKeyState().then(function() {
            return true;
        });
    },
    
    // NEEDS TESTING
    getWakeUp: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP).then(function(value) {
            return !!(value.getUint8(0));
        });
    },
    
    // NEEDS TESTING
    disableWakeUp: function() {
        this.logger.debug('disabling quick wake-up');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, Uint8Array.of(0));
    },
    
    // NEEDS TESTING
    enableWakeUp: function() {
        this.logger.debug('enabling quick wake-up');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, Uint8Array.of(1));
    },

    getCruiseControl: function() {
        this._notImplemented();
    },

    enableCruiseControl: function() {
        this._notImplemented();
    },

    disableCruiseControl: function() {
        this._notImplemented();
    },

    getMacAddress: function() {
        this._notImplemented();
    },
    
    getChipId: function() {
        this._notImplemented();
    },
    
    getVibrationSetting: function() {
        this._notImplemented();
    },
    
    setVibrationSetting: function() {
        this._notImplemented();
    },
    
    notifyAccelerometer: function() {
        this._notImplemented();
    },
    
    notifyButtons: function() {
        this._notImplemented();
    },
    
    notifyDepth: function() {
        this._notImplemented();
    },
    
    notifyKeyState: function() {
        this._notImplemented();
    },
    
    notifyRotationSpeed: function() {
        this._notImplemented();
    },
    
    notifyTemperatureAndPressure: function() {
        this._notImplemented();
    },
    
    unregister: function() {
        this._notImplemented();
    },
    
    getDeviceName: function() {
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
