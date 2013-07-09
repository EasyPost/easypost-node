"use strict";

var https = require('https');
// var http = require('http');
var querystring = require('querystring');

module.exports = function (apiKey, options) {
    options = options || {};

    var responseToResource = function(response) {
        if (response === null) {
            return false;
        }

        var types = {
            Address: 'Address',
            CustomsItem: 'CustomsItem',
            CustomsInfo: 'CustomsInfo',
            Parcel: 'Parcel',
            Shipment: 'Shipment',
            Rate: 'Rate',
            Refund: 'Refund',
            Batch: 'Batch',
            ScanForm: 'ScanForm',
            PostageLabel: 'PostageLabel'
        };

        var prefixes = {
            adr: 'Address',
            sf: 'ScanForm',
            cstitem: 'CustomsItem',
            cstinfo: 'CustomsInfo',
            prcl: 'Parcel',
            shp: 'Shipment',
            rate: 'Rate',
            refund: 'Refund',
            batch: 'Batch',
            postagelabel: 'PostageLabel'
        };

        if (Object.prototype.toString.call(response) === '[object Array]') {
            for (var i = 0; i < response.length; i++) {
                response[i] = responseToResource(response[i]);
            }
        } else if (typeof response === 'object') {
            var cls = 'Resource';
            if (response.object !== undefined && response.object !== null) {
                if (types[response.object] !== undefined && types[response.object] !== null) {
                    cls = types[response.object];
                }
            } else if (response.id !== undefined && response.id !== null) {
                var prefix = response.id.substr(0, response.id.indexOf('_'));
                if(prefixes[prefix] !== undefined && prefixes[prefix] !== null) {
                    cls = prefixes[prefix];
                }
            }

            var obj = new easypost[cls];
            obj.createFromResponse(response);
            return obj;
        }

        return response;
    }

    var Requestor = function(myApiKey) {
        this.apiKey = myApiKey || apiKey;
        this.queryParams = {};

    }
    Requestor.prototype.request = function(method, path, params, callback) {
        delete params.apiKey;
        this.encodeParams(params);
        var requestData = querystring.stringify(this.queryParams);
        
        path = '/v2' + path;

        // console.log(method, "request for", path);
        // console.log("http request", requestData);

        var auth = 'Basic ' + new Buffer(apiKey + ":").toString('base64');

        var request_options = {
            host: 'api.easypost.com',
            port: '443',
            // host: 'localhost',
            // port: '5000',
            path: path,
            method: method,
            headers: {
                'Authorization': auth,
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': requestData.length
            }
        };

        var req = https.request(request_options);
        // var req = http.request(request_options);
        this.responseListener(req, callback);    
        req.write(requestData);
        req.end();
    }
    Requestor.prototype.encodeParams = function(params, prefix) {
        if(typeof params !== 'object') {
            return params;
        }

        var newParams = [];

        Object.keys(params).forEach(function(key) {
            if(params[key] === null) {
                return;
            }

            var newKey = key;
            if(prefix && key) {
                var newKey = prefix + '[' + key + ']';
            }

            if(params[key] instanceof easypost.Resource) {
                params[key] = {id: params[key].id};
            }
            
            if(typeof params[key] === 'object') {
                newParams.push(this.encodeParams(params[key], newKey));
            } else {
                this.queryParams[newKey] = params[key];
            }

        }, this);
        
        return newParams;
    }
    Requestor.prototype.responseListener = function(req, cb) {
        if(typeof cb !== 'function') {
            throw new easypost.Error("Requestor requires a callback to handle response.");
        }

        req.on('response', function(res) {
            var response = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                response += chunk;
            });
            res.on('end', function() {
                var err = null;
                try {
                    response = JSON.parse(response);
                    if(response.error !== undefined && response.error !== null) {
                        err = new easypost.Error(response.error.message);
                        err.param = response.error.param;
                        response = null;
                    }
                } catch(e) {
                    err = new easypost.Error("Invalid response body from API.");
                    response = null;
                }

                try {
                    var parsedResponse = responseToResource(response);
                    cb(err, parsedResponse);
                } catch(e) {
                    console.log(e.stack);
                }
            });
        });
        req.on('error', function(err) {
            cb(err);
        });
    }
    
    var normalizeArgs = function(args) {
        var params = {};
        var cb = null;

        if (args.length === 2) {
            params = args[0];
            cb = args[1];
        } else {
            cb = args[0];
        }
        return {params: params, cb: cb};
    }

    // parent for the easypost.Resource classes - necessary for reflection in responseToResource
    var easypost = {};

    easypost.Error = function(message, param) {
        this.message = message;
        this.param = param;
    }

    easypost.Resource = function(cls, apiKey) {
        this.cls = cls;
        this.apiKey = apiKey;

    };
    easypost.Resource.classUrl = function(cls) {
        if(cls.substr(-1) == "s" || cls.substr(-1) == "h") {
            return '/' + cls + 'es';
        } else {
            return '/' + cls + 's';
        }
    }
    easypost.Resource.prototype.instanceUrl = function() {
        if(!this.id) {
            throw new easypost.Error("Object requires an id to generate an instance url.");
        }
        var base = easypost.Resource.classUrl(this.cls);
        return base + '/' + this.id;
    }
    easypost.Resource.prototype.createFromResponse = function(response) {
        Object.keys(response).forEach(function(key) {
            this[key] = response[key];
        }, this);
    }
    easypost.Resource.prototype.refresh = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl();

        var requestor = new Requestor(this.apiKey);
        requestor.request('get', url, args.params, args.cb);
    }
    easypost.Resource.create = function(cls, params, cb) {
        var url = easypost.Resource.classUrl(cls);

        if (params[cls] === undefined || params[cls] === null) {
            var temp = params;
            params = {};
            params[cls] = temp;
        }

        var requestor = new Requestor(params.apiKey);
        requestor.request('post', url, params, cb);
    };
    easypost.Resource.retrieve = function(cls, params, cb) {
        if (typeof params === 'object') {
            var url = easypost.Resource.classUrl(cls) + '/' + params.id;
            var requestor = new Requestor(params.apiKey);
        } else {
            var url = easypost.Resource.classUrl(cls) + '/' + params;
            var requestor = new Requestor();
        }

        requestor.request('get', url, params, cb);
    };
    easypost.Resource.all = function(cls, params, cb) {
        var url = easypost.Resource.classUrl(cls);
        var requestor = new Requestor(params.apiKey);
        requestor.request('get', url, params, cb);
    };

    easypost.Address = function(apiKey) {
        easypost.Resource.call(this, 'address', apiKey);
    }
    easypost.Address.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('address', args.params, args.cb); }
    easypost.Address.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('address', args.params, args.cb); }
    easypost.Address.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('address', args.params, args.cb); }
    easypost.Address.prototype = new easypost.Resource();
    easypost.Address.prototype.constructor = easypost.Address;
    easypost.Address.create_and_verify = function(params, cb) {
        var args = normalizeArgs(arguments);

        var url = easypost.Resource.classUrl('address') + '/create_and_verify';

        if (args.params['address'] === undefined || args.params['address'] === null) {
            var temp = args.params;
            args.params = {};
            args.params['address'] = temp;
        }

        var requestor = new Requestor(args.params.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }
    easypost.Address.prototype.verify = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/verify';

        var requestor = new Requestor(this.apiKey);
        requestor.request('get', url, args.params, args.cb);
    }


    easypost.Parcel = function(apiKey) {
        easypost.Resource.call(this, 'parcel', apiKey);
    }
    easypost.Parcel.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('parcel', args.params, args.cb); }
    easypost.Parcel.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('parcel', args.params, args.cb); }
    easypost.Parcel.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('parcel', args.params, args.cb); }
    easypost.Parcel.prototype = new easypost.Resource();
    easypost.Parcel.prototype.constructor = easypost.Parcel;


    easypost.CustomsItem = function(apiKey) {
        easypost.Resource.call(this, 'customs_item', apiKey);
    }
    easypost.CustomsItem.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('customs_item', args.params, args.cb); }
    easypost.CustomsItem.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('customs_item', args.params, args.cb); }
    easypost.CustomsItem.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('customs_item', args.params, args.cb); }
    easypost.CustomsItem.prototype = new easypost.Resource();
    easypost.CustomsItem.prototype.constructor = easypost.CustomsItem;


    easypost.CustomsInfo = function(apiKey) {
        easypost.Resource.call(this, 'customs_info', apiKey);
    }
    easypost.CustomsInfo.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('customs_info', args.params, args.cb); }
    easypost.CustomsInfo.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('customs_info', args.params, args.cb); }
    easypost.CustomsInfo.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('customs_info', args.params, args.cb); }
    easypost.CustomsInfo.prototype = new easypost.Resource();
    easypost.CustomsInfo.prototype.constructor = easypost.CustomsInfo;


    easypost.Shipment = function(apiKey) {
        easypost.Resource.call(this, 'shipment', apiKey);
    }
    easypost.Shipment.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('shipment', args.params, args.cb); }
    easypost.Shipment.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('shipment', args.params, args.cb); }
    easypost.Shipment.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('shipment', args.params, args.cb); }
    easypost.Shipment.prototype = new easypost.Resource();
    easypost.Shipment.prototype.constructor = easypost.Shipment;
    easypost.Shipment.prototype.getRates = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/rates';

        var requestor = new Requestor(this.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }
    easypost.Shipment.prototype.buy = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/buy';

        var requestor = new Requestor(this.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }
    easypost.Shipment.prototype.refund = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/refund';

        var requestor = new Requestor(this.apiKey);
        requestor.request('get', url, args.params, args.cb);
    }
    easypost.Shipment.prototype.label = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/label';

        var requestor = new Requestor(this.apiKey);
        requestor.request('get', url, args.params, args.cb);
    }
    easypost.Shipment.prototype.insure = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/insure';

        var requestor = new Requestor(this.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }
    easypost.Shipment.prototype.lowestRate = function(carriers, services) {
        carriers = null;
        services = null;

        if (arguments.length === 1) {
            carriers = arguments[0];
        } else if (arguments.length === 2) {
            carriers = arguments[0];
            services = arguments[1];
        }

        var lowestRate = null;

        if (carriers != null) {
            try {
                carriers = carriers.split(',');
            } catch(e) {}

            for(var i=0; i < carriers.length; i++) {
                carriers[i] = carriers[i].toLowerCase();
            }
        }

        if (services != null) {
            try {
                services = services.split(',');
            } catch(e) {}

            for(var i=0; i < services.length; i++) {
                services[i] = services[i].toLowerCase();
            }
        }

        for(var i=0; i < this.rates.length; i++) {
            if (carriers != null && carriers.length > 0 && carriers.indexOf(this.rates[i].carrier.toLowerCase()) === -1) {
                continue;
            }
            if (services != null && services.length > 0 && services.indexOf(this.rates[i].service.toLowerCase()) === -1) {
                continue;
            }

            if (lowestRate === null || lowestRate.rate > this.rates[i].rate) {
                lowestRate = this.rates[i];
            }
        }

        return lowestRate;
    }

    easypost.Rate = function(apiKey) {
        easypost.Resource.call(this, 'rate', apiKey);
    }
    easypost.Rate.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('rate', args.params, args.cb); }
    easypost.Rate.prototype = new easypost.Resource();
    easypost.Rate.prototype.constructor = easypost.Rate;


    easypost.Refund = function(apiKey) {
        easypost.Resource.call(this, 'refund', apiKey);
    }
    easypost.Refund.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('refund', args.params, args.cb); }
    easypost.Refund.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('refund', args.params, args.cb); }
    easypost.Refund.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('refund', args.params, args.cb); }
    easypost.Refund.prototype = new easypost.Resource();
    easypost.Refund.prototype.constructor = easypost.Refund;


    easypost.Batch = function(apiKey) {
        easypost.Resource.call(this, 'batch', apiKey);
    }
    easypost.Batch.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('batch', args.params, args.cb); }
    easypost.Batch.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('batch', args.params, args.cb); }
    easypost.Batch.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('batch', args.params, args.cb); }
    easypost.Batch.create_and_buy = function(params, cb) {
        var args = normalizeArgs(arguments);

        var url = easypost.Resource.classUrl('batch') + '/create_and_buy';

        if (args.params['batch'] === undefined || args.params['batch'] === null) {
            var temp = args.params;
            args.params = {};
            args.params['batch'] = temp;
        }

        var requestor = new Requestor(args.params.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }
    easypost.Batch.prototype = new easypost.Resource();
    easypost.Batch.prototype.constructor = easypost.Shipment;
    easypost.Batch.prototype.label = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/label';

        var requestor = new Requestor(this.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }
    easypost.Batch.prototype.removeShipments = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/remove_shipments';

        var requestor = new Requestor(this.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }
    easypost.Batch.prototype.addShipments = function(params, cb) {
        var args = normalizeArgs(arguments);
        var url = this.instanceUrl() + '/add_shipments';

        var requestor = new Requestor(this.apiKey);
        requestor.request('post', url, args.params, args.cb);
    }


    easypost.ScanForm = function(apiKey) {
        easypost.Resource.call(this, 'scan_form', apiKey);
    }
    easypost.ScanForm.create = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.create('scan_form', args.params, args.cb); }
    easypost.ScanForm.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('scan_form', args.params, args.cb); }
    easypost.ScanForm.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('scan_form', args.params, args.cb); }
    easypost.ScanForm.prototype = new easypost.Resource();
    easypost.ScanForm.prototype.constructor = easypost.ScanForm;


    easypost.PostageLabel = function(apiKey) {
        easypost.Resource.call(this, 'postage_label', apiKey);
    }
    easypost.PostageLabel.retrieve = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.retrieve('postage_label', args.params, args.cb); }
    easypost.PostageLabel.all = function(params, cb) { var args = normalizeArgs(arguments); easypost.Resource.all('postage_label', args.params, args.cb); }
    easypost.PostageLabel.prototype = new easypost.Resource();
    easypost.PostageLabel.prototype.constructor = easypost.Shipment;

    return {
        Address: easypost.Address,
        Parcel: easypost.Parcel,
        CustomsItem: easypost.CustomsItem,
        CustomsInfo: easypost.CustomsInfo,
        Shipment: easypost.Shipment,
        Rate: easypost.Rate,
        Refund: easypost.Refund,
        Batch: easypost.Batch,
        ScandForm: easypost.ScanForm,
        PostageLabel: easypost.PostageLabel
    }
}
