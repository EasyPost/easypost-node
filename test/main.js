var vows = require('vows'),
    assert = require('assert'),
    sys = require('sys');

var apiKey = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';

if (!apiKey) {
    sys.puts('API key required.');
    process.exit(2);
}

var easypost = require('./../lib/main.js')(apiKey);

vows.describe("EasyPost API").addBatch({
    'Address': {
        'standard create': {
            topic: function() {
                easypost.Address.create({
                	name: 'Jon Calhoun',
                	street1: '388 Townsend St.',
                	city: 'San Francisco',
                	state: 'CA',
                	zip: '94107',
                	country: 'US'}, this.callback);
            },
            'should return an address' : function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.equal(response.object, 'Address');
                assert.isDefined(response.id);
                assert.instanceOf(response, easypost.Address);
            },
            'should be retrieveable' : {
                topic: function(err, response) {
                    easypost.Address.retrieve(response.id, this.callback);
                },
                'retrieved object is an address': function(err, response) {
                    assert.isNull(err);
                    assert.isDefined(response);
                    assert.equal(response.object, 'Address');
                    assert.isDefined(response.id);
                    assert.instanceOf(response, easypost.Address);
                }
            },
            'should be verifyable': {
                topic: function(err, response) {
                    response.verify(this.callback);
                },
                'should return an address and a message': function(err, response) {
                    assert.isNull(err);
                    assert.isDefined(response);
                    assert.isDefined(response.address);
                    assert.isDefined(response.message);
                    assert.equal(response.address.object, 'Address');
                }
            }
        },
        'create and verify': {
            topic: function() {
                try {
                    easypost.Address.create_and_verify({
                        name: 'Jon Calhoun',
                        street1: '388 Townsend St.',
                        city: 'San Francisco',
                        state: 'CA',
                        zip: '94107',
                        country: 'US'}, this.callback);
                } catch(e) {
                    console.log(e);
                }
            },
            'should return a verified address with message': function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.isDefined(response.message)
                assert.equal(response.address.object, 'Address');
            }
        }
    },
    'Shipment': {
        topic: function() {
            easypost.Address.create({
                name: 'Sawyer Bateman',
                street1: '1A Larkspur Cres.',
                city: 'St. Albert',
                state: 'AB',
                zip: 't8n2m4',
                country: 'CA',
                phone: '780273-9383'
            }, this.callback);
        },
        'create a shipment with an address object': {
            topic: function(err, response) {
                var toAddress = response;
                var fromAddress = {
                    name: 'Jon Calhoun',
                    street1: '388 Townsend St.',
                    city: 'San Francisco',
                    state: 'CA',
                    zip: '94107',
                    country: 'US',
                    phone: '415-456-7890'
                };
                var parcel = {
                    width: 16.7,
                    height: 9.9,
                    length: 8.2,
                    weight: 22.9
                }
                var customsItem = {
                    description: 'Many, many EasyPost stickers.',
                    hs_tariff_number: '481141',
                    origin_country: 'US',
                    quantity: 1,
                    value: 87.94,
                    weight: 22.1
                }
                var customsInfo = {
                    customs_certify: true,
                    customs_signer: "Borat Sagdiyev",
                    contents_type: "merchandise",
                    contents_explanation: "",
                    eel_pfc: "NOEEI 30.37(a)",
                    non_delivery_option: "abandon",
                    restriction_type: "none",
                    restriction_comments: "",
                    customs_items: [customsItem]
                }

                easypost.Shipment.create({
                    from_address: fromAddress,
                    to_address: toAddress,
                    parcel: parcel,
                    customs_info: customsInfo
                }, this.callback);
            },
            'shipment is valid and contains international rates': function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.equal(response.object, 'Shipment');
                assert.instanceOf(response.rates, Array);
            },
            'buy shipment with insurance': {
                topic: function(err, response) {
                    response.buy({rate: response.lowestRate(), insurance: 249.99}, this.callback);
                },
                'purchase with insurance successful': function(err, response) {
                    assert.isNull(err);
                    assert.isDefined(response.postage_label);
                    assert.isDefined(response.postage_label.label_url);
                    assert.isDefined(response.insurance);
                    assert.isDefined(response.tracking_code);
                    assert.equal(response.insurance, '249.99');
                }
            }
        }
    },
    'Parcel': {
        'standard list': {
            topic: function() {
                easypost.Parcel.all(this.callback);
            },
            'should return list of Parcels': function(err, response) {
                assert.isNull(err);
                assert.instanceOf(response, Array);
            }
        }
    }
}).export(module, {error: false});