const leloF1SdkDeviceDefinitions = {
    LELO_SERVICE: '0000fff0-0000-1000-8000-00805f9b34fb',
    KEY_STATE:  '00000a0f-0000-1000-8000-00805f9b34fb'
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
        name: 'LELO service',
        uuid: leloF1SdkDeviceDefinitions.LELO_SERVICE,
        characteristics: [{
            name: 'key state',
            uuid: leloF1SdkDeviceDefinitions.KEY_STATE
        }]
    }],
    OPTIONAL_SERVICES: [
        'battery_service',
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
            return err;
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
                return err2;
            })
        }, function(err) {
            context.logger.error('error in device connection', err);
            return err;
        });
    },

    disconnect: function() {
        const context = this;
        if (!context.device) {
            this.logger.debug('not disconnecting from device because it is not connected');    
            return Promise.resolve();
        }

        this.logger.debug('disconnecting from device');

        context.device.gatt.disconnect();
        
        return Promise.resolve().then(function() {
            context.logger.info('disconnected from device');
            context.device = null;
            context.server = null;
            context.services = {};
            return;
        }, function(err) {
            context.logger.error('error in disconnection', err);
            return err;
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
                    return errSD;
                });

            }, function(err) {
                context.logger.error('error looking for service ' + entry.name, err);
                return err;
            }));
        }

        return Promise.all(promises).then(function() {
            context.logger.debug('services discovery completed', context.services);
            return context.services;
        }, function(errExt) {
            context.logger.error('error in services discovery', errExt);
            return errExt;
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
                return charErr;
            }));
        }

        return Promise.all(charPromises).then(function() {
            context.logger.debug('characteristics discovery for service ' + entry.name + ' completed', context.services);
            return context.services;
        }, function(errExt) {
            context.logger.error('error in characteristics discovery for service ' + entry.name, errExt);
            return errExt;
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

    _read: function(serviceUUID, charUUID) {
        const context = this;
        const characteristic = context._getCharacteristic(serviceUUID, charUUID);
        if (!characteristic) {
            return Promise.reject('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
        }

        return characteristic.handler.readValue().then(function(value) {
            context.logger.debug('READ ' + serviceUUID + ':' + charUUID);
            return value;
        }, function(err) {
            context.logger.warn('error reading from service ' + serviceUUID + ' characteristic ' + charUUID, err);
            return err;
        })
    },

    _write: function(serviceUUID, charUUID, value) {
        const context = this;
        const characteristic = context._getCharacteristic(serviceUUID, charUUID);
        if (!characteristic) {
            return Promise.reject('service ' + serviceUUID + ' characteristic ' + charUUID + ' not found or not registered');
        }

        return characteristic.handler.writeValue(value).then(function(value) {
            context.logger.debug('WRITE ' + serviceUUID + ':' + charUUID);
            return value;
        }, function(err) {
            context.logger.warn('error writing to service ' + serviceUUID + ' characteristic ' + charUUID, err);
            return err;
        })
    },

    getBatteryLevel: function() {
        return this._read('battery_service', 'battery_level').then(function(value) {
            return value.getUint8(0);
        });
    },

    getKeyState: function() {
        return this._read(leloF1SdkDeviceDefinitions.LELO_SERVICE, leloF1SdkDeviceDefinitions.KEY_STATE).then(function(value) {
            return !!value.getUint8(0);
        });
    }
};

const leloF1SdkClientProvider = {

    getClient: function(){
        return leloF1SdkWebClient;
    }
};
