const leloF1SdkDeviceDefinitions = {
    LELO_SERVICE: '0000fff0-0000-1000-8000-00805f9b34fb',
    DEVICE_INFORMATION_SERVICE: '0000180a-0000-1000-8000-00805f9b34fb',
    GENERIC_ACCESS_PROFILE: '00001800-0000-1000-8000-00805f9b34fb',
    GENERIC_ATTRIBUTE_PROFILE: '00001801-0000-1000-8000-00805f9b34fb',
    BATTERY_SERVICE: '0000180f-0000-1000-8000-00805f9b34fb',

    MOTOR_CONTROL: '0000fff1-0000-1000-8000-00805f9b34fb',
    KEY_STATE: '00000a0f-0000-1000-8000-00805f9b34fb',
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

    ADVANCED_MOTOR_CONTROL: '00000a1a-0000-1000-8000-00805f9b34fb', // F1sV2 chars
    SECURITY_ACCESS: '00000a10-0000-1000-8000-00805f9b34fb',

    SECURITY_ACCESS_INIT_VALUE: [0, 0, 0, 0, 0, 0, 0, 0],
    SECURITY_ACCESS_CONFIRMED_VALUE: [1, 0, 0, 0, 0, 0, 0, 0],
};

const leloF1SdkConstants = {
    DEVICE_NAME: 'F1s',
    COMPATIBLE_DEVICE_NAMES: ['F1s', 'F1S', 'F1SV2A', 'F1SV2X'],
    USED_SERVICES: [{
        name: 'Battery service',
        uuid: leloF1SdkDeviceDefinitions.BATTERY_SERVICE,
        characteristics: [{
            name: 'battery level',
            uuid: leloF1SdkDeviceDefinitions.BATTERY_LEVEL
        }]
    }, {
        name: 'DeviceInformation service',
        uuid: leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE,
        characteristics: [{
                name: 'MANUFACTURER NAME',
                uuid: leloF1SdkDeviceDefinitions.MANUFACTURER_NAME
            },
            {
                name: 'MODEL NUMBER',
                uuid: leloF1SdkDeviceDefinitions.MODEL_NUMBER
            },
            {
                name: 'HARDWARE REVISION',
                uuid: leloF1SdkDeviceDefinitions.HARDWARE_REVISION
            },
            {
                name: 'FIRMWARE REVISION',
                uuid: leloF1SdkDeviceDefinitions.FIRMWARE_REVISION
            },
            {
                name: 'SOFTWARE REVISION',
                uuid: leloF1SdkDeviceDefinitions.SOFTWARE_REVISION
            }
        ]
    }, {
        name: 'LELO service',
        uuid: leloF1SdkDeviceDefinitions.LELO_SERVICE,
        characteristics: [{
                name: 'KEY STATE',
                uuid: leloF1SdkDeviceDefinitions.KEY_STATE,
                protocol: [1]
            },
            {
                name: 'SECURITY ACCESS',
                uuid: leloF1SdkDeviceDefinitions.SECURITY_ACCESS,
                protocol: [2]
            },
            {
                name: 'MOTOR CONTROL',
                uuid: leloF1SdkDeviceDefinitions.MOTOR_CONTROL
            },
            {
                name: 'ADVANCED MOTOR CONTROL',
                uuid: leloF1SdkDeviceDefinitions.ADVANCED_MOTOR_CONTROL,
                protocol: [2]
            },
            {
                name: 'USER RECORD',
                uuid: leloF1SdkDeviceDefinitions.USER_RECORD
            },
            {
                name: 'BUTTON',
                uuid: leloF1SdkDeviceDefinitions.BUTTON
            },
            {
                name: 'PRESSURE',
                uuid: leloF1SdkDeviceDefinitions.PRESSURE
            },
            {
                name: 'ACCELEROMETER',
                uuid: leloF1SdkDeviceDefinitions.ACCELEROMETER
            },
            {
                name: 'LENGTH',
                uuid: leloF1SdkDeviceDefinitions.LENGTH
            },
            {
                name: 'HALL',
                uuid: leloF1SdkDeviceDefinitions.HALL
            },
            {
                name: 'WAKE UP',
                uuid: leloF1SdkDeviceDefinitions.WAKE_UP,
                protocol: [1]
            },
            {
                name: 'CRUISE CONTROL',
                uuid: leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH,
                protocol: [1]
            },
            {
                name: 'VIBRATOR SETTING',
                uuid: leloF1SdkDeviceDefinitions.VIBRATOR_SETTING,
                protocol: [1]
            }
        ]
    }],
    OPTIONAL_SERVICES: [
        leloF1SdkDeviceDefinitions.BATTERY_SERVICE,
        leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE,
        leloF1SdkDeviceDefinitions.LELO_SERVICE
    ],
    EVENTS: {
        CHARACTERISTIC_VALUE_CHANGED: 'characteristicvaluechanged'
    },
    TEXT_DECODER: new TextDecoder('utf-8'),
};

const leloF1SdkConverters = {
    TO_STRING: function(value) {
        return leloF1SdkConstants.TEXT_DECODER.decode(value);
    },
    TO_BOOLEAN: function(value) {
        return !!(value.getUint8(0));
    },
    TO_UINT8: function(value) {
        return value.getUint8(0);
    },
    TO_UINT16: function(value) {
        return value.getUint16(0);
    },
    TO_DEPTH_PERCENTAGE: function(value) {
        return value.getUint16(0) * 12.5;
    },
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
        return [value.getUint16(0), value.getUint16(2), value.getUint16(4)];
    },
    TO_TEMPERATURE_AND_PRESSURE: function(value) {
        return [
            (value.getUint16(1) + (value.getUint8(0) * 256 * 256)) / 100.0,
            (value.getUint32(4) / 100.0)
        ];
    },
    TO_TEMPERATURE: function(value) {
        return (value.getUint16(1) + (value.getUint8(0) * 256 * 256)) / 100.0;
    },
    TO_PRESSURE: function(value) {
        return (value.getUint32(4) / 100.0);
    },
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
    prefix: function() {
        return '[lelo-f1-sdk-web] ' + new Date().toISOString() + ' ';
    },

    log: function(text, args) {
        if (args) console.log(this.prefix() + '[info] ' + text, args)
        else console.log(this.prefix() + '[info] ' + text)
    },
    debug: function(text, args) {
        if (args) console.log(this.prefix() + '[debug] ' + text, args)
        else console.log(this.prefix() + '[debug] ' + text)
    },
    info: function(text, args) {
        if (args) console.log(this.prefix() + '[info] ' + text, args)
        else console.log(this.prefix() + '[info] ' + text)
    },
    warn: function(text, args) {
        if (args) console.warn(this.prefix() + '[WARN] ' + text, args)
        else console.warn(this.prefix() + '[WARN] ' + text)
    },
    warning: function(text, args) {
        if (args) console.warn(this.prefix() + '[WARN] ' + text, args)
        else console.warn(this.prefix() + '[WARN] ' + text)
    },
    error: function(text, args) {
        if (args) console.error(this.prefix() + '[ERROR] ' + text, args)
        else console.error(this.prefix() + '[ERROR] ' + text)
    }
};

const leloF1SdkWebClient = {
    device: null,
    server: null,
    disposing: false,
    connecting: 0,
    discovering: 0,
    authorized: false,
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

    _lockIndex: 0,
    _lockUUID: 0,
    _notificationProgressive: 0,
    _connectionAttemptProgressive: 0,
    _currentConnectionAttempt: 0,
    _protocol: 0,
    /* 1 = F1s (first version), 2 = F1sV2 */

    isV1: function() {
        return this._protocol === 1;
    },

    isV2: function() {
        return this._protocol === 2;
    },

    searchAndConnect: async function() {
        this.disposing = false;
        this.logger.debug('running search-and-connect routine');
        const device = await this.requestDevice();
        return this.connect(device);
    },

    requestDevice: async function() {
        this.disposing = false;
        this.logger.debug('requesting devices. Browser window should popup');

        let result;
        try {
            result = await navigator.bluetooth.requestDevice({
                filters: leloF1SdkConstants.COMPATIBLE_DEVICE_NAMES.map(n => ({ name: n })),
                optionalServices: leloF1SdkConstants.OPTIONAL_SERVICES
            });
        } catch (err) {
            this.logger.error('error in devices request', err);
            throw err;
        }

        this.logger.debug('devices request finished', result);
        return result;
    },

    connect: async function(device) {
        this.disposing = false;
        this.connecting++;
        this._currentConnectionAttempt = ++this._connectionAttemptProgressive;
        this.logger.debug('attempting connection to device', device);

        let server;
        try {
            server = await device.gatt.connect();
        } catch (err) {
            this.logger.error('error in device connection', err);
            this.connecting--;
            throw err;
        }

        this.logger.info('connected to device', device);
        this.services = {};

        // TODO - decode protocol from device name 
        // (maybe read some char instead of checking the name?)
        this._protocol = device.name.toUpperCase().includes("V2") ? 2 : 1;
        this.logger.debug('discovering protocol from device name: ' + device.name + ' => ' + this._protocol);
        this.discovering++;

        try {
            await this._discoverServices(server);
        } catch (err) {
            this.logger.error('error in services discovery after connection', err);
            this.connecting--;
            this.discovering--;
            throw err;
        }

        this.logger.debug('services discovery completed', this.services);
        this.device = device;
        this.server = server;
        this.disposing = false;

        this.connecting--;
        this.discovering--;

        // spawn waitForAuthorization promise without waiting for it
        this.waitForAuthorization().then(() => {
            this.logger.debug('authorization detected');
        });
        
        return server;
    },

    disconnect: async function() {
        this.disposing = true;
        if (!this.device) {
            this.logger.debug('not disconnecting from device because it is not connected');
            return;
        }

        await this._unregisterAllNotificationHandlers();

        this.logger.debug('disconnecting from device');

        const device = this.device;
        this.device = null;
        this.server = null;
        this.services = {};

        device.gatt.disconnect();
        this.logger.info('disconnected from device');
    },

    // NEEDS TESTING
    shutdown: async function() {
        const context = this;
        this.disposing = true;
        this.logger.debug('shutdown requested');
        this.logger.debug('unregistering all notifications');

        await this._unregisterAllNotificationHandlers();
        this.logger.debug('shutting down device');

        try {
            await context._write(
                leloF1SdkDeviceDefinitions.LELO_SERVICE, 
                leloF1SdkDeviceDefinitions.MOTOR_CONTROL,
                Uint8Array.of(1, 250), 
                true
            );
        } catch (err) {
            this.logger.warn('error writing shutdown signal - this might be normal as a SHUTDOWN signal has been sent', err);
        }

        this.logger.debug('shut down signal sent');
        const device = this.device;

        this.device = null;
        this.server = null;
        this.services = {};

        device.gatt.disconnect();
        return true;
    },

    _discoverServices: async function(server) {
        this.logger.debug('discovering device services');

        let services;
        
        try {
            services = await server.getPrimaryServices();
        } catch (err) {
            this.logger.error('error in listing services via getPrimaryServices', err);
            throw err;
        }

        this.logger.debug('found ' + services.length + ' device services');
        for (const discoveredService of services) {
            this.logger.debug('discovered service ' + discoveredService.uuid);
        }

        const promises = [];
        for (const entry of leloF1SdkConstants.USED_SERVICES) {
            promises.push(this._discoverService(server, entry));
        }

        try {
            await Promise.all(promises);
        } catch (err) {
            this.logger.error('error in services discovery', errExt);
            throw errExt;
        }

        this.logger.debug('services discovery completed', this.services);
        return this.services;
    },

    _discoverService: async function(server, entry) {
        this.logger.debug('searching for needed device service', entry.name);

        let service;
        try {
            service = await server.getPrimaryService(entry.uuid);
        } catch (err) {
            this.logger.error('error searching for needed device service ' + entry.name, err);
            throw err;
        }

        if (!service) {
            throw new Error('No service found for matcher ' + entry.uuid + ' with name ' + entry.name);
        }

        this.logger.debug('discovery found service ' + entry.name + ' with UUID ' + service.uuid);

        const serviceEntry = {
            name: entry.name,
            uuid: service.uuid,
            handler: service,
            characteristics: {},
            serviceMatcher: entry.uuid,
        };
        this.services[entry.uuid] = serviceEntry;

        let dscResult;
        try {
            dscResult = await this._discoverServiceCharacteristics(entry, service);
        } catch (err) {
            this.logger.error('error in characteristics discovery for service ' + entry.name, err);
            throw err;
        }

        this.logger.debug('characteristics discovery for service ' + entry.name + ' completed', dscResult);
        return dscResult;
    },

    _discoverServiceCharacteristics: async function(entry, service) {
        this.logger.debug('discovering service ' + entry.name + ' characteristics');

        let characteristics;
        try {
            characteristics = await service.getCharacteristics();
        } catch (err) {
            this.logger.error('error in characteristics listing for service ' + entry.name, err);
            throw err;
        }

        this.logger.debug('found ' + characteristics.length + ' service characteristics');
        for (const discoveredChar of characteristics) {
            this.logger.debug('discovered service characteristic ' + discoveredChar.uuid);
        }

        const charPromises = [];

        for (const charEntry of entry.characteristics) {
            charPromises.push(this._discoverServiceCharacteristic(entry, service, charEntry));
        }

        try {
            await Promise.all(charPromises);
        } catch (err) {
            this.logger.error('error in characteristics discovery for service ' + entry.name, err);
            throw err;
        }

        this.logger.debug('characteristics discovery for service ' + entry.name + ' completed', this.services);
        return this.services;
    },
    
    _discoverServiceCharacteristic: async function(entry, service, charEntry) {
        // check if supported from current protocol
        if (charEntry.protocol && !charEntry.protocol.includes(this._protocol)) {
            this.logger.debug('skipping service characteristic (unsupported protocol)', charEntry);
            return null;
        }

        this.logger.debug('discovering service characteristic', charEntry);

        let characteristic;
        try {
            characteristic = await service.getCharacteristic(charEntry.uuid);
        } catch (err) {
            this.logger.error('error looking for service ' + entry.name + ' characteristic ' + charEntry.uuid, err);
            throw err;
        }

        this.logger.debug('discovery found service ' + entry.name + ' characteristic ' + charEntry.uuid);
        const charToAdd = {
            name: charEntry.name,
            uuid: charEntry.uuid,
            handler: characteristic,
            charMatcher: charEntry.uuid,
        };

        this.services[entry.uuid].characteristics[charEntry.uuid] = charToAdd;
        return characteristic;
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

    _withLock: function(routineName, callback, lockProperty = 'bleReadWrite') {
        const context = this;
        const _lockUUID = ++this._lockUUID;

        this.logger.debug('processing routine with access lock ' + lockProperty + ':' + _lockUUID + ' - ' + routineName);

        return new Promise((resolve, reject) => {
            let handler = null;
            let dispatched = false;

            const attemptDispatching = async () => {
                if (dispatched) {
                    return;
                }
                const currVal = context[lockProperty] || 0;
                if (currVal) {
                    return;
                }
                context[lockProperty] = currVal + 1;

                context.logger.debug('acquired BLE access lock ' + lockProperty + ':' + _lockUUID + ' - ' + routineName);

                dispatched = true;
                if (handler) {
                    clearInterval(handler);
                }

                let cbResult, cbErr;
                try {
                    cbResult = await callback();
                } catch (e) {
                    cbErr = e;
                } finally {
                    context[lockProperty]--;
                    context.logger.debug('released BLE access lock ' + lockProperty + ':' + _lockUUID + ' - ' + routineName);
                }

                if (cbErr) {
                    reject(cbErr);
                } else {
                    resolve(cbResult);
                }
            }

            attemptDispatching();

            if (!dispatched) {
                this.logger.debug('BLE access lock ' + lockProperty + ':' + _lockUUID + ' is busy. Will wait for lock.');
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
        } catch (runtimeError) {
            return Promise.reject(runtimeError);
        }
    },

    _write: function(serviceUUID, charUUID, value, lock = true) {
        const context = this;
        try {
            const characteristic = this._getCharacteristic(serviceUUID, charUUID);
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
        } catch (runtimeError) {
            return Promise.reject(runtimeError);
        }
    },

    waitForAuthorization: function() {
        if (!this.server) {
            return Promise.reject('Device not connected');
        }

        if (this._protocol === 1) {
            return this._waitForAuthorizationF1sV1();
        }

        return this._waitForAuthorizationF1sV2();
    },

    _waitForAuthorizationF1sV1: function() {
        const context = this;
        const attemptNum = context._currentConnectionAttempt;
        return new Promise(function(resolve, reject) {
            const connectStatus = {
                pending: 0,
            };

            const handler = setInterval(function() {
                if (connectStatus.pending) {
                    context.logger.debug('checking for key state skipped (another check is pending)');
                    return;
                }
                connectStatus.pending++;
                context.logger.debug('checking for key state ...');

                if (context._currentConnectionAttempt !== attemptNum || context.disposing) {
                    context.logger.debug('checking for key state aborted (obsolete connection attempt)');
                    clearInterval(handler);
                    connectStatus.pending--;
                    reject('aborted');
                    return;
                }

                context.isAuthorized().then(function(authorized) {
                    context.logger.debug('checking for key state: ', authorized);
                    connectStatus.pending--;
                    if (authorized) {
                        clearInterval(handler);
                        context.authorized = true;
                        resolve(true);
                    }
                }, function(err) {
                    context.logger.debug('checking for key state threw error', err);
                    connectStatus.pending--;
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
        const attemptNum = context._currentConnectionAttempt;
        return new Promise(function(resolve, reject) {
            const connectStatus = {
                buttonPressed: false,
                writing: 0,
                wrote: false,
                pending: 0,
            };
            const handler = setInterval(function() {
                if (connectStatus.pending) {
                    context.logger.debug('checking for security access state skipped (another check is pending)');
                    return;
                }
                connectStatus.pending++;
                context.logger.debug('checking for security access state ...');

                if (context._currentConnectionAttempt !== attemptNum || context.disposing) {
                    context.logger.debug('checking for security access state aborted (obsolete connection attempt)');
                    connectStatus.pending--;
                    clearInterval(handler);
                    reject('aborted');
                    return;
                }

                context.getSecurityAccess().then(function(securityAccess) {
                    const securityAccessStr = securityAccess.toString();
                    context.logger.debug('checking for security access got raw value: ', securityAccessStr);

                    if (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_INIT_VALUE.toString()) {
                        context.logger.debug('checking for security access: waiting for button press');
                        connectStatus.pending--;
                        return;
                    }

                    if (securityAccessStr !== leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString()) {
                        context.logger.debug('checking for security access: button pressed, got password');
                        connectStatus.buttonPressed = true;

                        setTimeout(function() {
                            if (!connectStatus.wrote && !connectStatus.writing) {
                                connectStatus.writing++;
                                context.logger.debug('checking for security access: writing connection password to security access');
                                context.setSecurityAccess(securityAccess).then(function() {
                                    context.logger.debug('checking for security access: wrote connection password to security access succesfully');
                                    connectStatus.wrote = true;
                                    connectStatus.writing--;
                                }, function(saWriteError) {
                                    context.logger.error('checking for security access: error writing connection password to security access', saWriteError);
                                    connectStatus.writing--;
                                });
                            }
                        }, 500);

                        connectStatus.pending--;
                        return;
                    }

                    context.logger.debug('checking for security access: received confirmation');
                    clearInterval(handler);
                    connectStatus.pending--;
                    context.authorized = true;
                    resolve(true);

                }, function(err) {
                    context.logger.debug('checking for security access threw error', err);
                    connectStatus.pending--;
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
        if (this._protocol === 1) {
            return this.getKeyState();
        }

        // for F1sV2 check security access
        return this.getSecurityAccessConfirmed();
    },

    getSecurityAccessConfirmed: async function() {
        this._requireProtocol(2);
        const bytes = await this.getSecurityAccess();
        return bytes.toString() === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString();
    },

    getManufacturerName: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MANUFACTURER_NAME);
        return leloF1SdkConverters.TO_STRING(value);
    },

    getFirmwareRevision: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.FIRMWARE_REVISION);
        return leloF1SdkConverters.TO_STRING(value);
    },

    getHardwareRevision: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.HARDWARE_REVISION);
        return leloF1SdkConverters.TO_STRING(value);
    },

    getModelNumber: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.MODEL_NUMBER);
        return leloF1SdkConverters.TO_STRING(value);
    },

    getSoftwareRevision: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.DEVICE_INFORMATION_SERVICE, leloF1SdkDeviceDefinitions.SOFTWARE_REVISION);
        return leloF1SdkConverters.TO_STRING(value);
    },

    getBatteryLevel: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.BATTERY_SERVICE, leloF1SdkDeviceDefinitions.BATTERY_LEVEL);
        return leloF1SdkConverters.TO_UINT8(value);
    },

    getKeyState: async function() {
        this._requireProtocol(1);
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.KEY_STATE);
        return leloF1SdkConverters.TO_BOOLEAN(value);
    },

    getSecurityAccess: async function() {
        this._requireProtocol(2);
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.SECURITY_ACCESS);
        return leloF1SdkConverters.TO_SECURITY_ACCESS(value);
    },

    getMotorsSpeed: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL);
        return [value.getUint8(1), value.getUint8(2)];
    },

    getMainMotorSpeed: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL);
        return value.getUint8(1);
    },

    getVibratorSpeed: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL);
        return value.getUint8(2);
    },

    setSecurityAccess: function(bytes) {
        this._requireProtocol(2);
        this.logger.debug('writing security access input:' + bytes);
        const payload = Uint8Array.of(
            bytes[0], bytes[1], bytes[2], bytes[3],
            bytes[4], bytes[5], bytes[6], bytes[7]
        );
        this.logger.debug('writing security access payload:' + payload);
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.SECURITY_ACCESS, payload);
    },

    setMotorsSpeed: function(motorSpeed, vibeSpeed) {
        if (motorSpeed === null || typeof motorSpeed === 'undefined' || vibeSpeed === null || typeof vibeSpeed === 'undefined') {
            return Promise.reject('Two values are required');
        }
        if (motorSpeed < 0 || motorSpeed > 100 || vibeSpeed < 0 || vibeSpeed > 100) {
            return Promise.reject('Values should be between 0 and 100');
        }
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, motorSpeed, vibeSpeed));
    },

    setMainMotorSpeed: function(motorSpeed) {
        const context = this;
        if (motorSpeed === null || typeof motorSpeed === 'undefined') {
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
        if (vibeSpeed === null || typeof vibeSpeed === 'undefined') {
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

    getUseCount: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD);
        return leloF1SdkConverters.TO_UINT16(value);
    },

    resetUseCount: function() {
        this.logger.debug('clearing usage counter');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD, Uint8Array.of(238));
    },

    getButtonsStatus: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.BUTTON);
        return leloF1SdkConverters.TO_BUTTONS(value);
    },

    getButtons: function() {
        /* ALIAS */
        return this.getButtonsStatus();
    },

    getTemperatureAndPressure: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE);
        return leloF1SdkConverters.TO_TEMPERATURE_AND_PRESSURE(value);
    },

    getPressure: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE);
        return leloF1SdkConverters.TO_PRESSURE(value);
    },

    getTemperature: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.PRESSURE);
        return leloF1SdkConverters.TO_TEMPERATURE(value);
    },

    getAccelerometerX: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER);
        return value.getUint16(0);
    },

    getAccelerometerY: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER);
        return value.getUint16(2);
    },

    getAccelerometerZ: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER);
        return value.getUint16(4);
    },

    getAccelerometer: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.ACCELEROMETER);
        return leloF1SdkConverters.TO_ACCELEROMETER(value);
    },

    getDepth: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.LENGTH);
        return leloF1SdkConverters.TO_UINT16(value);
    },

    getInsertionDepth: function() {
        /* ALIAS */
        return this.getDepth();
    },

    getInsertionDepthPercentage: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.LENGTH);
        return leloF1SdkConverters.TO_DEPTH_PERCENTAGE(value);
    },

    getRotationSpeed: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.HALL);
        return leloF1SdkConverters.TO_UINT16(value);
    },

    ping: async function() {
        if (this._protocol === 1) {
            await this.getKeyState();
        } else {
            await this.getSecurityAccess();
        }
        return true;
    },

    getWakeUp: async function() {
        this._requireProtocol(1);
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP);
        return leloF1SdkConverters.TO_BOOLEAN(value);
    },

    // NEEDS TESTING
    enableWakeUp: function() {
        this._requireProtocol(1);
        this.logger.debug('enabling quick wake-up');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, Uint8Array.of(1));
    },

    // NEEDS TESTING
    disableWakeUp: function() {
        this._requireProtocol(1);
        this.logger.debug('disabling quick wake-up');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, Uint8Array.of(0));
    },

    getCruiseControl: async function() {
        this._requireProtocol(1);
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH);
        return leloF1SdkConverters.TO_BOOLEAN(value);
    },

    // NEEDS TESTING
    enableCruiseControl: function(resetSpeed = false) {
        this._requireProtocol(1);
        this.logger.debug('enabling cruise control mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH, Uint8Array.of(resetSpeed ? 2 : 1));
    },

    // NEEDS TESTING
    disableCruiseControl: function() {
        this._requireProtocol(1);
        this.logger.debug('disabling cruise control mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH, Uint8Array.of(0));
    },

    getVibrationSettings: async function() {
        this._requireProtocol(1);
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.VIBRATOR_SETTING);
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
    },

    // NEEDS TESTING
    setVibrationSettings: function(values) {
        this._requireProtocol(1);
        if (values === null || typeof values === 'undefined') {
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
            Uint8Array.of(values[7], values[6], values[5], values[4], values[3], values[2], values[1], values[0]));
    },

    notifyButtons: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.BUTTON,
            callback,
            leloF1SdkConverters.TO_BUTTONS,
            distinctUntilChanged);
    },

    notifyInsertionDepth: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.LENGTH,
            callback,
            leloF1SdkConverters.TO_UINT16,
            distinctUntilChanged);
    },

    notifyInsertionDepthPercentage: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.LENGTH,
            callback,
            leloF1SdkConverters.TO_DEPTH_PERCENTAGE,
            distinctUntilChanged);
    },

    notifyKeyState: function(callback, distinctUntilChanged = true) {
        this._requireProtocol(1);
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.KEY_STATE,
            callback,
            leloF1SdkConverters.TO_BOOLEAN,
            distinctUntilChanged);
    },

    notifySecurityAccess: function(callback, distinctUntilChanged = true) {
        this._requireProtocol(2);
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.SECURITY_ACCESS,
            callback,
            leloF1SdkConverters.TO_SECURITY_ACCESS,
            distinctUntilChanged);
    },

    notifyAuthorization: function(callback, distinctUntilChanged = true) {
        if (this._protocol === 1) {
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
            distinctUntilChanged);
    },

    notifyAccelerometer: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.ACCELEROMETER,
            callback,
            leloF1SdkConverters.TO_ACCELEROMETER,
            distinctUntilChanged);
    },

    notifyTemperatureAndPressure: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_TEMPERATURE_AND_PRESSURE,
            distinctUntilChanged);
    },

    notifyTemperature: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_TEMPERATURE,
            distinctUntilChanged);
    },

    notifyPressure: function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_PRESSURE,
            distinctUntilChanged);
    },

    _buildNotificationHandler: function(characteristic, callback, distinctUntilChanged) {
        const context = this;
        const o = {
            characteristic: characteristic,
            id: ++context._notificationProgressive,
            active: false,
            userCallback: callback,
            distinctUntilChanged: distinctUntilChanged,
            lastDataBuffer: null,
            _listener: null,
            unregister: null,
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

        const characteristic = this._getCharacteristic(serviceUUID, charUUID);
        if (!characteristic) {
            return Promise.reject('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
        }

        return this._withLock('REGISTERING ' + characteristic.name, function() {
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

        return this._withLock('UNREGISTERING ' + characteristic.name, function() {
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

        this.logger.debug('unregistering all callbacks');
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
        for (var i = 0; i < buf1.byteLength; i++) {
            if (dv1[i] != dv2[i]) {
                return false;
            }
        }
        return true;
    },

    getDeviceName: async function() {
        // fixed - lookup implemented by name so ...
        // TODO no longer working with F1sV2 release
        return this._protocol === 2 ?
            leloF1SdkConstants.DEVICE_NAME + ' v2' :
            leloF1SdkConstants.DEVICE_NAME;
    },

    getMacAddress: function() {
        return this._notImplemented();
    },

    getChipId: function() {
        return this._notImplemented();
    },

    getIEEE1107320601: function() {
        return this._notImplemented();
    },

    getPNPId: function() {
        return this._notImplemented();
    },

    getSerialNumber: function() {
        return this._notImplemented();
    },

    getSystemId: function() {
        return this._notImplemented();
    },

    _requireProtocol: function(version) {
        if (this._protocol !== version) {
            let msg;
            if (version === 1) {
                msg = 'This feature is only available on the original F1s version';
            } else if (version === 2) {
                msg = 'This feature is only available on the F1s V2 version';
            } else {
                msg = 'Invalid protocol. Expected ' + version + ', got ' + this._protocol;
            }
            throw new Error(msg);
        }
    },

    _notImplemented: async function() {
        throw new Error('NOT IMPLEMENTED - please open an issue at https://github.com/fabiofenoglio/lelo-f1-web-sdk/issues if you need this feature.');
    }
};

const leloF1SdkClientProvider = {

    getClient: function() {
        return leloF1SdkWebClient;
    },

    isSupported: function() {
        return navigator && navigator.bluetooth && navigator.bluetooth.requestDevice;
    }
};