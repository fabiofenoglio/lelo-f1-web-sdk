const leloF1SdkDeviceDefinitions = {
    LELO_SERVICE: '0000fff0-0000-1000-8000-00805f9b34fb',
    DEVICE_INFORMATION_SERVICE: '0000180a-0000-1000-8000-00805f9b34fb',
	GENERIC_ACCESS_PROFILE: '00001800-0000-1000-8000-00805f9b34fb',
	GENERIC_ATTRIBUTE_PROFILE: '00001801-0000-1000-8000-00805f9b34fb',

    MOTOR_CONTROL: '0000fff1-',
    KEY_STATE:  '00000a0f-',
    USER_RECORD: '00000a04-',
    BUTTON: '00000aa4-',
    PRESSURE: '00000a0a-',
    ACCELEROMETER: '00000a0c-',
    LENGTH: '00000a0b-',
    HALL: '00000aa3-',
    WAKE_UP: '00000aa1-',
    MOTOR_WORK_ON_TOUCH: '00000aa5-',
	VIBRATOR_SETTING: '00000a0d-',
    
    MANUFACTURER_NAME: '00002a29-',
	MODEL_NUMBER: '00002a24-',
	HARDWARE_REVISION: '00002a27-',
	FIRMWARE_REVISION: '00002a26-',
    SOFTWARE_REVISION: '00002a28-',
    
    BATTERY_LEVEL: '00002a19-',
    CHIP_ID: '00000a07-',
    MAC_ADDRESS: '00000a06-',
	SERIAL_NUMBER: '00000a05-',

    ADVANCED_MOTOR_CONTROL: '00000a1a-', // F1sV2 chars
    SECURITY_ACCESS: '00000a10-',

    SECURITY_ACCESS_INIT_VALUE: [0, 0, 0, 0, 0, 0, 0, 0],
    SECURITY_ACCESS_CONFIRMED_VALUE: [1, 0, 0, 0, 0, 0, 0, 0],
};

const leloF1SdkConstants = {
    DEVICE_NAME: 'F1s',
    COMPATIBLE_DEVICE_NAMES: ['F1s', 'F1S', 'F1SV2A', 'F1SV2X'],
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
            { name: 'KEY STATE', uuid: leloF1SdkDeviceDefinitions.KEY_STATE, protocol: [1] },
            { name: 'SECURITY ACCESS', uuid: leloF1SdkDeviceDefinitions.SECURITY_ACCESS, protocol: [2] },
            { name: 'MOTOR CONTROL', uuid: leloF1SdkDeviceDefinitions.MOTOR_CONTROL },
            { name: 'ADVANCED MOTOR CONTROL', uuid: leloF1SdkDeviceDefinitions.ADVANCED_MOTOR_CONTROL, protocol: [2] },
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
    TO_PRESSURE: function(value) { return (value.getUint32(4) / 100.0); },
    TO_SECURITY_ACCESS: function(value) {
        return [ 
            value.getUint8(0), value.getUint8(1), value.getUint8(2), value.getUint8(3), 
            value.getUint8(4), value.getUint8(5), value.getUint8(6), value.getUint8(7), 
        ];
    },
    TO_SECURITY_ACCESS_CONFIRMATION: function(value) {
        return [ 
            value.getUint8(0), value.getUint8(1), value.getUint8(2), value.getUint8(3), 
            value.getUint8(4), value.getUint8(5), value.getUint8(6), value.getUint8(7), 
        ].toString() === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString();
    },
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
    protocol: 0, /* 1 = F1s (first version), 2 = F1sV2 */
    
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

        return navigator.bluetooth.requestDevice({ 
        	filters: 
        		leloF1SdkConstants.COMPATIBLE_DEVICE_NAMES.map(function(deviceName) {
        			return { name: deviceName };
        		}),
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

            // TODO - decode protocol from device name 
            // (maybe read some char instead of checking the name?)
            if (device.name.toUpperCase().includes("V2")) {
                context.protocol = 2;
            } else {
                context.protocol = 1;
            }
            context.logger.debug('discovering protocol from device name: ' + device.name + ' => ' + context.protocol);

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
    
        return server.getPrimaryServices().then(services => {
          context.logger.debug('found ' + services.length + ' device services');
          for (const discoveredService of services) {
            context.logger.debug('discovered service ' + discoveredService.uuid);
          }
    
          const promises = [];
          for (const entry of leloF1SdkConstants.USED_SERVICES) {
            context.logger.debug('discovering device service', entry.name);
    
            const servicePromise = entry.uuid.endsWith('-') ?
              Promise.resolve(services.find(candidate => candidate.uuid.startsWith(entry.uuid))) : server.getPrimaryService(entry.uuid);
    
            promises.push(
              servicePromise.then((service) => {
                if (!service) {
                  throw new Error('No service found for matcher ' + entry.uuid);
                }
        
                context.logger.debug('discovery found service ' + entry.name + ' with UUID ' + service.uuid);
        
                const serviceEntry = {
                  name: entry.name,
                  uuid: service.uuid,
                  handler: service,
                  characteristics: {},
                  serviceMatcher: entry.uuid,
                };
                this.services[entry.uuid] = serviceEntry;
        
                return this._discoverServiceCharacteristics(entry, service).then(
                  (result) => {
                    context.logger.debug('characteristics discovery for service ' + entry.name + ' completed', result);
                    return result;
                  },
                  (errSD) => {
                    context.logger.error('error in characteristics discovery for service ' + entry.name, errSD);
                    throw errSD;
                  }
                );
              }, (errExt) => {
                context.logger.error('error in characteristics discovery', errExt);
                throw errExt;
              })
            );
          }
    
          return Promise.all(promises).then(
            () => {
                context.logger.debug('services discovery completed', this.services);
              return this.services;
            },
            (errExt) => {
                context.logger.error('error in services discovery', errExt);
              throw errExt;
            }
          );
        }, (errTop) => {
            context.logger.error('error in services list', errTop);
          throw errTop;
        });
    },
    
    _discoverServiceCharacteristics: function(entry, service) {
        const context = this;
        context.logger.debug('discovering service ' + entry.name + ' characteristics');
        
        return service.getCharacteristics().then((characteristics) => {      
            context.logger.debug('found ' + characteristics.length + ' service characteristics');
          for (const discoveredChar of characteristics) {
            context.logger.debug('discovered service characteristic ' + discoveredChar.uuid);
          }
    
          const charPromises = [];
    
          for (const charEntry of entry.characteristics) {
            // check if supported from current protocol
            if (charEntry.protocol && !charEntry.protocol.includes(context.protocol)) {
                context.logger.debug('skipping service characteristic (unsupported protocol)', charEntry);
                continue;
            }

            context.logger.debug('discovering service characteristic', charEntry);
      
            const charPromise = charEntry.uuid.endsWith('-') ?
              Promise.resolve(characteristics.find(candidate => candidate.uuid.startsWith(charEntry.uuid))) : service.getCharacteristic(charEntry.uuid);
    
            charPromises.push(
              charPromise.then(
                (characteristic) => {
                context.logger.debug('discovery found service ' + entry.name + ' characteristic ' + charEntry.uuid);
                  const charToAdd = {
                    name: charEntry.name,
                    uuid: charEntry.uuid,
                    handler: characteristic,
                    charMatcher: charEntry.uuid,
                  };
                  this.services[entry.uuid].characteristics[charEntry.uuid] = charToAdd;
                  return characteristic;
                },
                (charErr) => {
                context.logger.error('error looking for service ' + entry.name + ' characteristic ' + charEntry.uuid, charErr);
                  throw charErr;
                }
              )
            );
          }
          
          return Promise.all(charPromises).then(
            () => {
                context.logger.debug('characteristics discovery for service ' + entry.name + ' completed', this.services);
                return this.services;
            },
            (errExt) => {
                context.logger.error('error in characteristics discovery for service ' + entry.name, errExt);
                throw errExt;
            }
          );
        }, (errTop) => {
            context.logger.error('error in characteristics listing for service ' + entry.name, errTop);
            throw errTop;
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
        if (!this.server) {
            return Promise.reject('Device not connected');
        }

        if (this.protocol === 1) {
            return this._waitForAuthorizationF1sV1();
        }

        return this._waitForAuthorizationF1sV2();
    },

    _waitForAuthorizationF1sV1: function() {
        const context = this;
        return new Promise(function(resolve, reject) {

            const handler = setInterval(function() {
                context.logger.debug('checking for key state ...');
                
                context.isAuthorized().then(function(authorized) {
                    context.logger.debug('checking for key state: ', authorized);
                    if (authorized) {
                        clearInterval(handler);
                        resolve(true);
                    }
                }, function(err) {
                    context.logger.debug('checking for key state threw error', err);
                    clearInterval(handler);
                    reject(err);
                });

            }, 500);
        });
    },

    _waitForAuthorizationF1sV2: function() {
        /*
        - The user starts the app, which starts bluetooth scanning for devices
        - The user powers up the F1S device
        - The app connects to the F1S device
        - The app monitor Security Access characteristic, 
            Initially, Security Access is set to 00.
        - After connecting, the app shows a message to the user, 
            prompting them to press the power button again
        - After Security Access is set to a certain String 
            (that is the password of connecting F1S) rather than the default(00)
        - Write the String(password) into Security Access characteristic. 
            If password is correct then the Security Access characteristic is set to 01. 
            the app continues operation.
        */
        const context = this;
        return new Promise(function(resolve, reject) {
            const connectStatus = {
                buttonPressed: false,
                writing: 0,
                wrote: false,
            };
            const handler = setInterval(function() {
                context.logger.debug('checking for security access state ...');
                
                context.this.getSecurityAccess().then(function(securityAccess) {
                    const securityAccessStr = securityAccess.toString();
                    context.logger.debug('checking for security access got raw value: ', securityAccessStr);

                    if (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_INIT_VALUE.toString()) {
                        context.logger.debug('checking for security access: waiting for button press');
                        return;
                    }

                    if (securityAccessStr !== leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString()) {
                        context.logger.debug('checking for security access: button pressed, got password');
                        connectStatus.buttonPressed = true;
                        if (!connectStatus.wrote && !connectStatus.writing) {
                            connectStatus.writing ++;
                            context.logger.debug('checking for security access: writing connection password to security access');
                            context.setSecurityAccess(securityAccess).then(function() {
                                context.logger.debug('checking for security access: wrote connection password to security access succesfully');
                                connectStatus.wrote = true;
                                connectStatus.writing --;
                            }, function(saWriteError) {
                                context.logger.error('checking for security access: error writing connection password to security access', saWriteError);
                                connectStatus.writing --;
                            });
                        }
                        return;
                    }

                    context.logger.debug('checking for security access: received confirmation');
                    clearInterval(handler);
                    resolve(true);

                }, function(err) {
                    context.logger.debug('checking for security access threw error', err);
                    clearInterval(handler);
                    reject(err);
                });

            }, 500);
        });
    },

    isConnected: function() {
        return !!this.server && !this.disposing;
    },

    isAuthorized: function() {
        if (!this.server) {
            return Promise.resolve(false);
        }

        // if F1s (original) just check key state
        if (this.protocol === 1) {
            return this.getKeyState();
        }

        // for F1sV2 check security access
        return this.getSecurityAccessConfirmed();
    },

    getSecurityAccessConfirmed: function() {
        this._requireProtocol(2);
        return this.getSecurityAccess().then(function(bytes) {
            return bytes.toString() === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString()
        });
    },
    
    getManufacturerName: function() {
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MANUFACTURER_NAME)
            .then(leloF1SdkConverters.TO_STRING);
    },

    getFirmwareRevision: function() {
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.FIRMWARE_REVISION)
            .then(leloF1SdkConverters.TO_STRING);
    },
    
    getHardwareRevision: function() {
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.HARDWARE_REVISION)
            .then(leloF1SdkConverters.TO_STRING);
    },
    
    getModelNumber: function() {
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MODEL_NUMBER)
            .then(leloF1SdkConverters.TO_STRING);
    },

    getSoftwareRevision: function() {
        return this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.SOFTWARE_REVISION)
            .then(leloF1SdkConverters.TO_STRING);
    },
    
    getBatteryLevel: function() {
        return this._read('battery_service', 'battery_level')
            .then(leloF1SdkConverters.TO_UINT8);
    },

    getKeyState: function() {
        this._requireProtocol(1);
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.KEY_STATE)
            .then(leloF1SdkConverters.TO_BOOLEAN);
    },

    getSecurityAccess: function() {
        this._requireProtocol(2);
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.SECURITY_ACCESS)
            .then(leloF1SdkConverters.TO_SECURITY_ACCESS);
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
    
    setSecurityAccess: function(bytes) {
        this._requireProtocol(2);
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.SECURITY_ACCESS,
            Uint8Array.of(
                bytes[0], bytes[1], bytes[2], bytes[3],
                bytes[4], bytes[5], bytes[6], bytes[7]
            )
        );
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
        if (this.protocol === 1) {
            return this.getKeyState().then(function() {
                return true;
            });
        } else {
            return this.getSecurityAccess().then(function() {
                return true;
            });
        }
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
    enableCruiseControl: function(resetSpeed = false) {
        this.logger.debug('enabling cruise control mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH, Uint8Array.of(resetSpeed ? 2 : 1));
    },

    // NEEDS TESTING
    disableCruiseControl: function() {
        this.logger.debug('disabling cruise control mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH, Uint8Array.of(0));
    },

    getVibrationSettings: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.VIBRATOR_SETTING).then(function(value) {
            return [
                value.getUint8(7),
                value.getUint8(6),
                value.getUint8(5),
                value.getUint8(4),
                value.getUint8(3),
                value.getUint8(2),
                value.getUint8(1),
                value.getUint8(0)
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

        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.VIBRATOR_SETTING, 
            Uint8Array.of( values[7], values[6], values[5], values[4], values[3], values[2], values[1], values[0] ));
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
        this._requireProtocol(1);
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.KEY_STATE,
            callback,
            leloF1SdkConverters.TO_BOOLEAN,
            distinctUntilChanged );
    },
    
    notifySecurityAccess: function(callback, distinctUntilChanged = true) {
        this._requireProtocol(2);
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.SECURITY_ACCESS,
            callback,
            leloF1SdkConverters.TO_SECURITY_ACCESS,
            distinctUntilChanged );
    },
    
    notifyAuthorization: function(callback, distinctUntilChanged = true) {
        if (this.protocol === 1) {
            return this.notifyKeyState(callback, distinctUntilChanged);
        } else {
            return this._registerNotification(
                leloF1SdkDeviceDefinitions.LELO_SERVICE,
                leloF1SdkDeviceDefinitions.SECURITY_ACCESS,
                callback,
                leloF1SdkConverters.TO_SECURITY_ACCESS_CONFIRMATION,
                distinctUntilChanged 
            );
        }
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

        });
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

        });
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
    
    getDeviceName: function() {
        // fixed - lookup implemented by name so ...
        // TODO no longer working with F1sV2 release
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

    _requireProtocol: function(version) {
        if (this.protocol !== version) {
            throw new Error('Invalid protocol. Expected ' + version + ', got ' + this.protocol);
        }
    },
    
    _notImplemented: function() {
        return Promise.reject('NOT IMPLEMENTED - but working on it!');
    }
};

const leloF1SdkClientProvider = {

    getClient: function(){
        return leloF1SdkWebClient;
    },

    isSupported: function() {
        return navigator && navigator.bluetooth && navigator.bluetooth.requestDevice;
    }
};
