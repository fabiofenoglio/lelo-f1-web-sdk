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
    TO_STRING: value => leloF1SdkConstants.TEXT_DECODER.decode(value),
    TO_BOOLEAN: value => !!(value.getUint8(0)),
    TO_UINT8: value => value.getUint8(0),
    TO_UINT16: value => value.getUint16(0),
    TO_DEPTH_PERCENTAGE: value => value.getUint16(0) * 12.5,
    TO_BUTTONS: value => {
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
    TO_ACCELEROMETER: value => [value.getUint16(0), value.getUint16(2), value.getUint16(4)],
    TO_TEMPERATURE_AND_PRESSURE: value => [
            (value.getUint16(1) + (value.getUint8(0) * 256 * 256)) / 100.0,
            (value.getUint32(4) / 100.0)
        ],
    TO_TEMPERATURE: value  => (value.getUint16(1) + (value.getUint8(0) * 256 * 256)) / 100.0,
    TO_PRESSURE: value => (value.getUint32(4) / 100.0),
    TO_SECURITY_ACCESS: value => [
            value.getUint8(0), value.getUint8(1), value.getUint8(2), value.getUint8(3),
            value.getUint8(4), value.getUint8(5), value.getUint8(6), value.getUint8(7),
        ],
    TO_SECURITY_ACCESS_CONFIRMATION: value => ([
            value.getUint8(0), value.getUint8(1), value.getUint8(2), value.getUint8(3),
            value.getUint8(4), value.getUint8(5), value.getUint8(6), value.getUint8(7),
        ].toString() === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString()),
};

const leloF1SdkLoggerBridge = {
    prefix: () => '[lelo-f1-sdk-web] ' + new Date().toISOString() + ' ',

    log: (text, args) => {
        if (args) console.log(leloF1SdkLoggerBridge.prefix() + '[info] ' + text, args)
        else console.log(leloF1SdkLoggerBridge.prefix() + '[info] ' + text)
    },
    debug: (text, args) => {
        if (args) console.log(leloF1SdkLoggerBridge.prefix() + '[debug] ' + text, args)
        else console.log(leloF1SdkLoggerBridge.prefix() + '[debug] ' + text)
    },
    info: (text, args) => {
        if (args) console.log(leloF1SdkLoggerBridge.prefix() + '[info] ' + text, args)
        else console.log(leloF1SdkLoggerBridge.prefix() + '[info] ' + text)
    },
    warn: (text, args) => {
        if (args) console.warn(leloF1SdkLoggerBridge.prefix() + '[WARN] ' + text, args)
        else console.warn(leloF1SdkLoggerBridge.prefix() + '[WARN] ' + text)
    },
    warning: (text, args) => {
        if (args) console.warn(leloF1SdkLoggerBridge.prefix() + '[WARN] ' + text, args)
        else console.warn(leloF1SdkLoggerBridge.prefix() + '[WARN] ' + text)
    },
    error: (text, args) => {
        if (args) console.error(leloF1SdkLoggerBridge.prefix() + '[ERROR] ' + text, args)
        else console.error(leloF1SdkLoggerBridge.prefix() + '[ERROR] ' + text)
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
            handler: null,
            characteristics: {
                'dummy-char-uuid': {
                    name: 'dummy char',
                    uuid: 'dummy-char-uuid',
                    notificationHandlers: null,
                    handler: null,
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

        /*
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
        */
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

        return {
            name: entry.name,
            uuid: service.uuid,
            handler: service,
            characteristics: {},
        };
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
        return {
            name: charEntry.name,
            uuid: charEntry.uuid,
            handler: characteristic,
            charMatcher: charEntry.uuid,
        };
    },

    _getService: async function(uuid) {
        // implement lazy load for services
        let service = this.services[uuid];

        if (typeof service === 'undefined') {
            // lazy load the service
            service = await this._lazyLoadService(uuid);
        }

        if (!service) {
            this.logger.warn('service ' + uuid + ' not found or not registered');
            return null;
        }

        return service;
    },

    _lazyLoadService: async function(uuid) {
        // find the service entry in the registries
        this.logger.debug('lazy loading service ' + uuid);

        return this._withLock('discovering service ' + uuid, async () => {
            if (typeof this.services[uuid] !== 'undefined') {
                this.logger.debug('lazy loading service ' + uuid + ': cache hit (already loaded)');
                return this.services[uuid];
            }
            const entry = leloF1SdkConstants.USED_SERVICES.find(candidate => candidate.uuid === uuid);
            if (!entry) {
                throw new Error('No service definition found for uuid ' + uuid);
            }
    
            // discover the service
            const service = await this._discoverService(this.server, entry);
            
            this.services[uuid] = service;
            this.logger.debug('finished lazy loading service ' + uuid);
        
            return service;
        }, 'bleServiceDiscovery_' + uuid);
    },

    _getCharacteristic: async function(serviceUUID, uuid) {
        const service = await this._getService(serviceUUID);
        if (!service) {
            return null;
        }
        let characteristic = service.characteristics[uuid];

        if (typeof characteristic === 'undefined') {
            // lazy load the characteristic
            characteristic = await this._lazyLoadCharacteristic(service, serviceUUID, uuid);
        }

        if (!characteristic) {
            this.logger.warn('service ' + serviceUUID + ' characteristic ' + uuid + ' not found or not registered');
            return null;
        }
        return characteristic;
    },

    _lazyLoadCharacteristic: async function(service, serviceUUID, uuid) {
        // find the service entry in the registries
        this.logger.debug('lazy loading characteristic ' + uuid + ' for service ' + serviceUUID);

        return this._withLock('discovering characteristic ' + uuid, async () => {
            if (typeof service.characteristics[uuid] !== 'undefined') {
                this.logger.debug('lazy loading characteristic ' + uuid + ' for service ' + serviceUUID + ': cache hit (already loaded)');
                return service.characteristics[uuid];
            }

            // find the service entry in the registries
            this.logger.debug('lazy loading characteristic ' + uuid + ' for service ' + serviceUUID);
            const entry = leloF1SdkConstants.USED_SERVICES.find(candidate => candidate.uuid === serviceUUID);
            if (!entry) {
                throw new Error('No service definition found for uuid ' + uuid);
            }
            const charEntry = entry.characteristics.find(candidate => candidate.uuid === uuid);
            if (!charEntry) {
                throw new Error('No characteristic definition found for uuid ' + uuid);
            }

            const characteristic = await this._discoverServiceCharacteristic(entry, service.handler, charEntry)
            service.characteristics[uuid] = characteristic;
            this.logger.debug('finished lazy loading characteristic ' + uuid + ' for service ' + serviceUUID);
            return characteristic;

        }, 'bleCharacteristicDiscovery_' + uuid);
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
                handler = setInterval(() => attemptDispatching(), 10);
            }
        });
    },

    _read: async function(serviceUUID, charUUID) {
        const characteristic = await this._getCharacteristic(serviceUUID, charUUID);
        if (!characteristic) {
            throw new Error('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
        }

        return this._withLock('READ ' + characteristic.name, async () => {
            try {
                const value = await characteristic.handler.readValue();
                this.logger.debug('READ ' + serviceUUID + ':' + charUUID);
                return value;
            } catch (err) {
                this.logger.warn('error reading from service ' + serviceUUID + ' characteristic ' + charUUID, err);
                throw err;
            }
        });
    },

    _write: async function(serviceUUID, charUUID, value, lock = true) {
        const characteristic = await this._getCharacteristic(serviceUUID, charUUID);
        if (!characteristic) {
            throw new Error('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
        }

        const dispatcher = async () => {
            try {
                this.logger.debug('WRITE1 ' + serviceUUID + ':' + charUUID);
                await characteristic;
                this.logger.debug('WRITE2 ' + serviceUUID + ':' + charUUID);
                await this.sleep(50);
                this.logger.debug('WRITE3 ' + serviceUUID + ':' + charUUID);
                const wrote = await characteristic.handler.writeValue(value);
                this.logger.debug('WRITE4 ' + serviceUUID + ':' + charUUID);
                return wrote;
            } catch (err) {
                this.logger.warn('error writing to service ' + serviceUUID + ' characteristic ' + charUUID, err);
                throw err;
            }
        };

        if (lock) {
            return this._withLock('WRITE ' + characteristic.name, dispatcher);
        } else {
            return dispatcher();
        }
    },

    waitForAuthorization: async function() {
        if (!this.server) {
            throw new Error('Device not connected');
        }

        if (this._protocol === 1) {
            return this._waitForAuthorizationF1sV1();
        }

        return this._waitForAuthorizationF1sV2();
    },

    _waitForAuthorizationF1sV1: function() {
        return new Promise((resolve, reject) => {
            const attemptNum = this._currentConnectionAttempt;
            const connectStatus = {
                pending: 0
            };

            const handler = setInterval(async () => {
                if (connectStatus.pending) {
                    this.logger.debug('checking for key state skipped (another check is pending)');
                    return;
                }
                if (this._currentConnectionAttempt !== attemptNum || this.disposing) {
                    this.logger.debug('checking for key state aborted (obsolete connection attempt)');
                    clearInterval(handler);
                    reject('aborted (obsolete connection attempt)');
                    return;
                }

                connectStatus.pending++;
                try {
                    this.logger.debug('checking for key state ...');
                    let authorized;
                    try {
                        authorized = await this.isAuthorized();
                        this.logger.debug('checking for key state: ', authorized);
                        if (authorized) {
                            clearInterval(handler);
                            this.authorized = true;
                            resolve(true);
                        }
                    } catch (err) {
                        this.logger.debug('checking for key state threw error', err);
                        clearInterval(handler);
                        reject(err);
                    }
                } finally {
                    connectStatus.pending --;
                }
                
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
        return new Promise((resolve, reject) => {
            const attemptNum = this._currentConnectionAttempt;
            const connectStatus = {
                buttonPressed: false,
                writing: 0,
                wrote: false,
                pending: 0,
            };
            const handler = setInterval(async () => {
                if (connectStatus.pending) {
                    this.logger.debug('checking for security access state skipped (another check is pending)');
                    return;
                }

                this.logger.debug('checking for security access state ...');
                connectStatus.pending++;

                if (connectStatus.pending>1) {
                    this.logger.debug('checking for security access state skipped (another check is pending)');
                    return;
                }

                try {
                    let securityAccess;
                    try {
                        securityAccess = await this.getSecurityAccess();
                    } catch (err) {
                        this.logger.debug('checking for security access threw error', err);
                        //clearInterval(handler);
                        //reject(err);
                        return;
                    }
    
                    var securityAccessStr = securityAccess.toString();
                    this.logger.debug('checking for security access got raw value: ', securityAccessStr);
    
                    if (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_INIT_VALUE.toString()) {
                        this.logger.debug('checking for security access: waiting for button press');
                        while (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_INIT_VALUE.toString()) {
                            securityAccess = await this.getSecurityAccess();
                            securityAccessStr = securityAccess.toString();
                        }
                        this.logger.debug('button pressed');
                        this.logger.debug('checking for security access got raw value: ', securityAccessStr);

                    } 

                    this.logger.debug('checking for security access: button pressed, got password');
                    connectStatus.buttonPressed = true;

                    connectStatus.wrote = true;
                    this.logger.debug('checking for security access: writing connection password to security access');
                    
                    securityAccess = await this.getSecurityAccess();
                    securityAccessStr = securityAccess.toString();

                    try {
                        const pass = Uint8Array.of(252,37,91,35,253,75,144,44);
                        //0xFC255B2;

                        await this.setSecurityAccess(securityAccess);
                        this.logger.debug('checking for security access: wrote connection password to security access succesfully');
                        
                    } catch (saWriteError) {
                        this.logger.error('checking for security access: error writing connection password to security access', saWriteError);
                        return;
                    } finally {
                        
                    }

                    securityAccess = await this.getSecurityAccess();
                    securityAccessStr = securityAccess.toString();
                    
                    if (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString()) {
                        this.logger.debug('checking for security access: received confirmation');
                        clearInterval(handler);
                        this.authorized = true;
                        resolve(true);
                    }

                } finally {
                    connectStatus.pending--;
                }
            }, 5000);
        });
    },


    _waitForAuthorizationF1sV2old: function() {
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
        return new Promise((resolve, reject) => {
            const attemptNum = this._currentConnectionAttempt;
            const connectStatus = {
                buttonPressed: false,
                writing: 0,
                wrote: false,
                pending: 0,
            };
            const handler = setInterval(async () => {
                //if (connectStatus.pending) {
                //    this.logger.debug('checking for security access state skipped (another check is pending)');
                //    return;
                //}

                if (this._currentConnectionAttempt !== attemptNum || this.disposing) {
                    this.logger.debug('checking for security access state aborted (obsolete connection attempt)');
                    clearInterval(handler);
                    reject('aborted');
                    return;
                }

                this.logger.debug('checking for security access state ...');
                connectStatus.pending++;
                try {
                    let securityAccess;
                    try {
                        securityAccess = await this.getSecurityAccess();
                    } catch (err) {
                        this.logger.debug('checking for security access threw error', err);
                        clearInterval(handler);
                        reject(err);
                        return;
                    }
    
                    var securityAccessStr = securityAccess.toString();
                    this.logger.debug('checking for security access got raw value: ', securityAccessStr);
    
                    if (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_INIT_VALUE.toString()) {
                        this.logger.debug('checking for security access: waiting for button press');
                        while (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_INIT_VALUE.toString()) {
                            securityAccess = await this.getSecurityAccess();
                            securityAccessStr = securityAccess.toString();
                        }
                        this.logger.debug('button pressed');
                        this.logger.debug('checking for security access got raw value: ', securityAccessStr);

                    } else if (securityAccessStr === leloF1SdkDeviceDefinitions.SECURITY_ACCESS_CONFIRMED_VALUE.toString()) {
                        this.logger.debug('checking for security access: received confirmation');
                        clearInterval(handler);
                        this.authorized = true;
                        resolve(true);
    
                    } else {
                        this.logger.debug('checking for security access: button pressed, got password');
                        connectStatus.buttonPressed = true;
    
                        setTimeout(async () => {
                            if (!connectStatus.wrote) {
                                connectStatus.wrote = true;
                                this.logger.debug('checking for security access: writing connection password to security access');
                                
                                try {
                                    const pass = Uint8Array.of(252,37,91,35,253,75,144,44);
                                    //const pass = 0xFC255B2;


                                    await this.setSecurityAccess(pass);
                                    this.logger.debug('checking for security access: wrote connection password to security access succesfully');
                                    
                                } catch (saWriteError) {
                                    this.logger.error('checking for security access: error writing connection password to security access', saWriteError);
                                } finally {
                                    
                                }
                            }
                        }, 5000);
                    }
                } finally {
                    connectStatus.pending--;
                }
            }, 5000);
        });
    },

    isConnected: function() {
        return !!this.server && !this.disposing;
    },

    isAuthorized: async function() {
        if (!this.server) {
            return false;
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

    sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    setSecurityAccess: async function(bytes) {
        this._requireProtocol(2);
        this.logger.debug('writing security access input:' + bytes);
        let payload = Uint8Array.of(
            bytes[0], bytes[1], bytes[2], bytes[3],
            bytes[4], bytes[5], bytes[6], bytes[7]
        );
        this.logger.debug('writing security access payload:' + payload);
        await this.sleep(400);
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.SECURITY_ACCESS, payload, true);
    },

    setMotorsSpeed: async function(motorSpeed, vibeSpeed) {
        if (motorSpeed === null || typeof motorSpeed === 'undefined' || vibeSpeed === null || typeof vibeSpeed === 'undefined') {
            throw new Error('Two values are required');
        }
        if (motorSpeed < 0 || motorSpeed > 100 || vibeSpeed < 0 || vibeSpeed > 100) {
            throw new Error('Values should be between 0 and 100');
        }
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, motorSpeed, vibeSpeed));
    },

    setMainMotorSpeed: async function(motorSpeed) {
        if (motorSpeed === null || typeof motorSpeed === 'undefined') {
            throw new Error('Value is required');
        }
        if (motorSpeed < 0 || motorSpeed > 100) {
            throw new Error('Value should be between 0 and 100');
        }
        const otherSpeed = await this.getVibratorSpeed();
        this.logger.debug('other motor speed is' + otherSpeed);
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, motorSpeed, otherSpeed));
    },

    setVibratorSpeed: async function(vibeSpeed) {
        if (vibeSpeed === null || typeof vibeSpeed === 'undefined') {
            throw new Error('Value is required');
        }
        if (vibeSpeed < 0 || vibeSpeed > 100) {
            throw new Error('Value should be between 0 and 100');
        }
        const otherSpeed = await this.getMainMotorSpeed();
        this.logger.debug('other motor speed is' + otherSpeed);
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, otherSpeed, vibeSpeed));
    },

    shutdownMotors: async function() {
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(1, 0, 0));
    },

    stop: async function() {
        /* ALIAS */
        return this.shutdownMotors();
    },

    // NEEDS TESTING
    verifyAccelerometer: async function() {
        this.logger.debug('entering accelerometer verification mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_CONTROL, Uint8Array.of(255, 255, 255));
    },

    getUseCount: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD);
        return leloF1SdkConverters.TO_UINT16(value);
    },

    resetUseCount: async function() {
        this.logger.debug('clearing usage counter');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.USER_RECORD, Uint8Array.of(238));
    },

    getButtonsStatus: async function() {
        const value = await this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.BUTTON);
        return leloF1SdkConverters.TO_BUTTONS(value);
    },

    getButtons: async function() {
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

    getInsertionDepth: async function() {
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
    enableWakeUp: async function() {
        this._requireProtocol(1);
        this.logger.debug('enabling quick wake-up');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.WAKE_UP, Uint8Array.of(1));
    },

    // NEEDS TESTING
    disableWakeUp: async function() {
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
    enableCruiseControl: async function(resetSpeed = false) {
        this._requireProtocol(1);
        this.logger.debug('enabling cruise control mode');
        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.MOTOR_WORK_ON_TOUCH, Uint8Array.of(resetSpeed ? 2 : 1));
    },

    // NEEDS TESTING
    disableCruiseControl: async function() {
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
    setVibrationSettings: async function(values) {
        this._requireProtocol(1);
        if (values === null || typeof values === 'undefined') {
            throw new Error('Values are required');
        } else if (values.length != 8) {
            throw new Error('Exactly 8 values are required');
        }
        for (const val of values) {
            if (val < 0 || val > 100) {
                throw new Error('Values should be between 0 and 100');
            }
        }

        return this._write(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.VIBRATOR_SETTING,
            Uint8Array.of(values[7], values[6], values[5], values[4], values[3], values[2], values[1], values[0]));
    },

    notifyButtons: async function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.BUTTON,
            callback,
            leloF1SdkConverters.TO_BUTTONS,
            distinctUntilChanged);
    },

    notifyInsertionDepth: async function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.LENGTH,
            callback,
            leloF1SdkConverters.TO_UINT16,
            distinctUntilChanged);
    },

    notifyInsertionDepthPercentage: async function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.LENGTH,
            callback,
            leloF1SdkConverters.TO_DEPTH_PERCENTAGE,
            distinctUntilChanged);
    },

    notifyKeyState: async function(callback, distinctUntilChanged = true) {
        this._requireProtocol(1);
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.KEY_STATE,
            callback,
            leloF1SdkConverters.TO_BOOLEAN,
            distinctUntilChanged);
    },

    notifySecurityAccess: async function(callback, distinctUntilChanged = true) {
        this._requireProtocol(2);
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.SECURITY_ACCESS,
            callback,
            leloF1SdkConverters.TO_SECURITY_ACCESS,
            distinctUntilChanged);
    },

    notifyAuthorization: async function(callback, distinctUntilChanged = true) {
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

    notifyRotationSpeed: async function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.HALL,
            callback,
            leloF1SdkConverters.TO_UINT16,
            distinctUntilChanged);
    },

    notifyAccelerometer: async function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.ACCELEROMETER,
            callback,
            leloF1SdkConverters.TO_ACCELEROMETER,
            distinctUntilChanged);
    },

    notifyTemperatureAndPressure: async function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_TEMPERATURE_AND_PRESSURE,
            distinctUntilChanged);
    },

    notifyTemperature: async function(callback, distinctUntilChanged = true) {
        return this._registerNotification(
            leloF1SdkDeviceDefinitions.LELO_SERVICE,
            leloF1SdkDeviceDefinitions.PRESSURE,
            callback,
            leloF1SdkConverters.TO_TEMPERATURE,
            distinctUntilChanged);
    },

    notifyPressure: async function(callback, distinctUntilChanged = true) {
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
            _dispatcher: null,
            unregister: null,
        };

        o._listener = (value, event) => {
            if (!o.active || !o.userCallback) {
                return;
            }
            o.userCallback(value, event);
        }

        o.unregister = () => context.unregister.apply(context, [o]);

        return o;
    },

    _registerNotification: async function(serviceUUID, charUUID, callback, converter, distinctUntilChanged) {
        const context = this;

        const characteristic = await this._getCharacteristic(serviceUUID, charUUID);
        if (!characteristic) {
            throw new Error('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
        }

        return this._withLock('REGISTERING ' + characteristic.name, async () => {
            this.logger.debug('registering notifications callback for characteristic ' + charUUID);
            const handler = this._buildNotificationHandler(characteristic, callback, distinctUntilChanged);

            if (!characteristic.notifying) {
                this.logger.debug('enabling channel notifications for characteristic ' + charUUID);
                try {
                    await characteristic.handler.startNotifications();
                    this.logger.debug('enabled channel notifications for characteristic ' + charUUID);
                } catch (err) {
                    this.logger.error('error enabling channel notifications for characteristic ' + charUUID, err);
                    throw err;
                }
            }

            characteristic.notifying = true;

            if (!characteristic.notificationHandlers) {
                characteristic.notificationHandlers = [];
            }

            handler._dispatcher = event => {
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

            this.logger.debug('there are now ' + characteristic.notificationHandlers.length +
                ' registered notification callbacks for characteristic ' + charUUID);

            handler.active = true;
            return handler;
        });
    },

    unregister: async function(handler) {
        if (!handler) {
            throw new Error('handler is required');
        }

        const characteristic = handler.characteristic;

        return this._withLock('UNREGISTERING ' + characteristic.name, async () => {
            this.logger.debug('unregistering notifications callback for characteristic ' + characteristic.uuid);

            handler.active = false;
            characteristic.notificationHandlers.splice(characteristic.notificationHandlers.indexOf(handler), 1);
            characteristic.handler.removeEventListener(leloF1SdkConstants.EVENTS.CHARACTERISTIC_VALUE_CHANGED, handler._dispatcher);

            this.logger.debug('there are now ' + characteristic.notificationHandlers.length +
                ' registered notification callbacks for characteristic ' + characteristic.uuid);

            if (characteristic.notificationHandlers.length < 1) {
                this.logger.debug('disabling channel notifications for characteristic ' + characteristic.uuid);
                await characteristic.handler.stopNotifications();
                this.logger.debug('disabled channel notifications for characteristic ' + characteristic.uuid);
            }
            return handler;
        });
    },

    _unregisterAllNotificationHandlers: async function() {
        this.logger.debug('unregistering all callbacks');
        const promises = [];

        for (const service of Object.values(this.services)) {
            for (const characteristic of Object.values(service.characteristics)) {
                if (characteristic.notificationHandlers && characteristic.notificationHandlers.length) {
                    for (const handler of characteristic.notificationHandlers) {
                        promises.push(this.unregister(handler));
                    }
                }
            }
        }

        try {
            await Promise.all(promises);
        } catch (err) {
            this.logger.error('error unregistering all callbacks', err);
            throw err;
        }
        this.logger.debug('unregistered all callbacks');
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

    getMacAddress: async function() {
        return this._notImplemented();
    },

    getChipId: async function() {
        return this._notImplemented();
    },

    getIEEE1107320601: async function() {
        return this._notImplemented();
    },

    getPNPId: async function() {
        return this._notImplemented();
    },

    getSerialNumber: async function() {
        return this._notImplemented();
    },

    getSystemId: async function() {
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