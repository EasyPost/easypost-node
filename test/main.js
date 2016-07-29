var vows = require('vows'),
    assert = require('assert');

var apiKey = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';

if (!apiKey) {
    console.error('API key required.');
    process.exit(2);
}

var easypost = require('./../lib/main.js')(apiKey);

vows.describe("EasyPost API").addBatch({
    'Address': {
        'standard create': {
            topic: function() {
                easypost.Address.create({
                	name: 'Dr. Steve Brule',
                	street1: '179 N Harbor Dr',
                	city: 'Redondo Beach',
                	state: 'CA',
                	zip: '90277',
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
                    assert.equal(response.address.object, 'Address');
                }
            }
        },
        'create and verify': {
            topic: function() {
                try {
                    easypost.Address.create_and_verify({
                        name: 'Dr. Steve Brule',
                        street1: '179 N Harbor Dr',
                        city: 'Redondo Beach',
                        state: 'CA',
                        zip: '90277',
                        country: 'US'}, this.callback);
                } catch(e) {
                    console.log(e);
                }
            },
            'should return a verified address with message': function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.equal(response.address.object, 'Address');
            }
        },
        'pass verify param': {
            topic: function() {
                easypost.Address.create({
                    verify: ["delivery"],
                    street1: "118 2 streat",
                    street2: "FL 4",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94105",
                    country: "US",
                    company: "EasyPost",
                    phone: "415-123-4567"}, this.callback);
            },
            'should return a verified address': function(err, response) {
                assert.isNull(err);

                assert.equal(response.street1, "118 2ND ST FL 4");
                assert.equal(response.street2, "");
                assert.equal(response.zip, "94105-3620");
            }
        },
        'pass verify param and fail': {
            topic: function() {
                easypost.Address.create({
                    verify: ["delivery"],
                    street1: "UNDELIEVRABLE ST",
                    street2: "FL 4",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94105",
                    country: "US",
                    company: "EasyPost",
                    phone: "415-123-4567"}, this.callback);
            },
            'should return an unverified address': function(err, response) {
                assert.isNull(err);

                assert.equal(response.verifications["delivery"]["success"], false);

                assert.equal(response.verifications["delivery"]["errors"].length, 2);
                assert.equal(response.verifications["delivery"]["errors"][0]["message"], "Address not found");
                assert.equal(response.verifications["delivery"]["errors"][1]["message"], "House number is missing");
            }
        },
        'pass verify_strict param and fail': {
            topic: function() {
                easypost.Address.create({
                    verify_strict: ["delivery"],
                    street1: "UNDELIEVRABLE ST",
                    street2: "FL 4",
                    city: "San Francisco",
                    state: "CA",
                    zip: "94105",
                    country: "US",
                    company: "EasyPost",
                    phone: "415-123-4567"}, this.callback);
            },
            'should raise an error': function(err, response) {
                assert.equal(err.message["code"], "ADDRESS.VERIFY.FAILURE");
                assert.equal(err.message["message"], "Unable to verify address.");
                assert.equal(err.message["errors"][0]["message"], "Address not found");
                assert.equal(err.message["errors"][1]["message"], "House number is missing");
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
                    response.buy({rate: response.lowestRate(['ups']), insurance: 249.99}, this.callback);
                },
                'purchase with insurance successful': function(err, response) {
                    assert.isNull(err);
                    assert.isDefined(response.postage_label);
                    assert.isDefined(response.postage_label.label_url);

                    assert.isDefined(response.insurance);
                    assert.equal(response.insurance, '249.99');

                    assert.isDefined(response.tracking_code);
                    assert.isDefined(response.tracker);

                    assert.equal(response.tracker.object, "Tracker")
                    assert.equal(response.tracking_code, response.tracker.tracking_code)
                    assert.equal(response.tracker.shipment_id, response.id)
                },
                "refund shipment": {
                    topic: function(err, response) {
                        response.refund(this.callback)
                    },
                    'refunds successfully': function(err, response) {
                        assert.isNull(err);

                        assert.equal(response.refund_status, "refunded")
                    }
                }
            }
        }
    },
    'Order': {
        'create order': {
            topic: function() {
                easypost.Order.create({
                    to_address: {
                        name: 'Dr. Steve Brule',
                        street1: '179 N Harbor Dr',
                        city: 'Redondo Beach',
                        state: 'CA',
                        zip: '90277',
                        country: 'US'
                    },
                    from_address: {
                        name: 'Jon Calhoun',
                        street1: '388 Townsend St.',
                        city: 'San Francisco',
                        state: 'CA',
                        zip: '94107',
                        country: 'US',
                        phone: '415-456-7890'
                    },
                    shipments: [
                        {"parcel": {"length": 8, "width": 6, "height": 4, "weight": 12}}
                    ]
                }, this.callback);
            },
            'should create an order': function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);

                assert.instanceOf(response, easypost.Order);
                assert.equal(response.object, 'Order');
                assert.instanceOf(response.shipments, Array);
            },
            'buy': {
                topic: function(err, response) {
                    response.buy({
                        carrier: "UPS",
                        service: "Ground"
                    }, this.callback);
                },
                'should buy a valid order': function(error, bought){
                    assert.isNull(error);
                    assert.isDefined(bought);
                    assert.isDefined(bought.shipments[0].postage_label);
                },
            },
            'created an order with multiple shipments': {
                topic: function() {
                    easypost.Order.create({
                        to_address: {
                            name: 'Dr. Steve Brule',
                            street1: '179 N Harbor Dr',
                            city: 'Redondo Beach',
                            state: 'CA',
                            zip: '90277',
                            country: 'US'
                        },
                        from_address: {
                            name: 'Jon Calhoun',
                            street1: '388 Townsend St.',
                            city: 'San Francisco',
                            state: 'CA',
                            zip: '94107',
                            country: 'US',
                            phone: '415-456-7890'
                        },
                        carrier_accounts: [{id: "ca_12345678"}],
                        shipments: [
                            {"parcel": {"length": 8, "width": 6, "height": 4, "weight": 12}},
                            {"parcel": {"length": 9, "width": 7, "height": 5, "weight": 24}}
                        ]
                    }, this.callback);
                },
                'should create an order with two shipments': function(err, response) {
                    assert.isNull(err);
                    assert.isDefined(response);

                    assert.instanceOf(response, easypost.Order);
                    assert.equal(response.object, 'Order');
                    assert.instanceOf(response.shipments, Array);
                },
            }
        }
    },
    // Yeah so this test has started failing consistantly because of the number
    // of parcels the Demo User has. Could use some fixing
    // 'Parcel': {
    //     'standard list': {
    //         topic: function() {
    //             easypost.Parcel.all(this.callback);
    //         },
    //         'should return list of Parcels': function(err, response) {
    //             assert.isNull(err);
    //             assert.instanceOf(response, Array);
    //             assert.equal(retrieved.id, response.id);
    //         }
    //     }
    // },
    'Tracker': {
        'create and retrieve': {
            topic: function() {
                easypost.Tracker.create({
                    tracking_code: 'EZ2000000002',
                    carrier: "USPS"
                }, this.callback);
            },
            'should return a valid Tracker': function(err, response) {
                assert.isNull(err);
                assert.equal(response.id.slice(0,4), 'trk_')
                easypost.Tracker.retrieve(response.id, function(errors, retrieved) {
                    assert.isNull(errors)
                    assert.equal(retrieved.id, response.id)
                })
            },
            'retrieves all shipments with a given tracking code': {
                topic: function(err, response) {
                    var callback = this.callback
                    var tracker_id = response.id
                    var tracking_code = response.tracking_code

                    easypost.Tracker.all({
                        tracking_code: response.tracking_code
                    }, function(err, response){ callback(err, response, tracker_id, tracking_code) });
                },
                'should return a list of Trackers': function(err, response, tracker_id, tracking_code) {
                    assert.isNull(err);

                    assert.equal(response["trackers"].length, 30);
                    assert.equal(response["has_more"], true);
                    assert.equal(response["trackers"][0].id, tracker_id);
                    for (var i = 0; i < response["trackers"].length; i++) {
                        assert.equal(response["trackers"][i].tracking_code, tracking_code);
                    }
                }
            }
        }
    },
    'Insurance': {
        topic: function() {
            easypost.Address.create({
                name: "Dr. Steve Brule",
                street1: "179 N Harbor Dr",
                city: "Redondo Beach",
                state: "CA",
                zip: "90277",
                phone: "310-808-5243"
            }, this.callback);
        },
        'create an insurance with an address object': {
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

                var tracking_code = "EZ2000000002"
                var carrier = "USPS"
                var amount = 101.00

                easypost.Insurance.create({
                    from_address: fromAddress,
                    to_address: toAddress,
                    tracking_code: tracking_code,
                    carrier: carrier,
                    amount: amount
                }, this.callback);
            },
            'shipment is valid and contains international rates': function(err, response) {
                assert.isNull(err);
                assert.isDefined(response);
                assert.equal(response.object, 'Insurance');
                assert.equal(response.tracking_code, "EZ2000000002");
                assert.equal(response.amount, "101.00000");
                assert.isDefined(response.tracker);
            },
            'retrieve insurance': {
                topic: function(err, response) {
                    var insurance2 = easypost.Insurance.retrieve(response.id, this.callback);
                },
                'retrieve insurance successfuly': function(err, response) {
                    assert.isNull(err);
                    assert.isDefined(response);
                    assert.equal(response.object, 'Insurance');
                    assert.equal(response.tracking_code, "EZ2000000002");
                    assert.equal(response.amount, "101.00000");
                    assert.isDefined(response.tracker);
                },
                "index insurances": {
                    topic: function(err, response) {
                        var insurances = easypost.Insurance.all({page_size: 5}, this.callback);
                    },
                    'refunds successfully': function(err, response) {
                        assert.equal(response.insurances.length, 5);
                        assert.isTrue(response.has_more);
                    }
                }
            }
        }
    },
    'Pickup': {
        topic: function() {
            var toAddress = {
                name: "Sawyer Bateman",
                street1: "164 Townsend St",
                city: "San Francisco",
                state: "CA",
                zip: "94107",
                country: 'US',
                phone: "415-456-7890"
            };
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
        'with shipment' : {
            topic: function(err, response) {
                response.buy({rate: response.lowestRate('ups')}, this.callback);
            },
            'create and retrieve': {
                topic: function(err, response) {
                    var pickupAddress = {
                        name: "Sawyer Bateman",
                        street1: "164 Townsend St",
                        city: "San Francisco",
                        state: "CA",
                        zip: "94107",
                        country: 'US',
                        phone: "415-456-7890"
                    };

                    easypost.Pickup.create({
                        address: pickupAddress,
                        shipment: response,
                        reference: "internal_id_1234",
                        min_datetime: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                        max_datetime: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
                        is_account_address: true,
                        instructions: "Special pickup instructions"
                    }, this.callback);
                },
                'should return a valid Pickup': function(err, response) {
                    assert.isNull(err);
                    assert.equal(response.id.slice(0,7), 'pickup_')
                    easypost.Pickup.retrieve(response.id, function(errors, retrieved) {
                        assert.isNull(errors)
                        assert.equal(retrieved.id, response.id)
                    })
                },
                'buy': {
                    topic: function(err, response) {
                        response.buy({
                            carrier: "UPS",
                            service: "Same-day Pickup"
                        }, this.callback);
                    },
                    'should buy a valid pickup': function(err, response){
                        assert.isNull(err);
                        assert.equal(response.id.slice(0,7), 'pickup_')
                    },
                    'and cancel': {
                        topic: function(err, response) {
                            response.cancel({
                                id: response.id
                            }, this.callback);
                        },
                        'should cancel the pickup': function(err, response){
                            assert.isNull(err);
                        }
                    }
                }
            }
        }
    }
}).addBatch({
    'Requestor': {
        'request': {
            topic: function() {
                timeoutEasypost = require('./../lib/main.js')(apiKey, {timeout: 1});
                timeoutEasypost.Address.create({
                	name: 'Dr. Steve Brule',
                	street1: '179 N Harbor Dr',
                	city: 'Redondo Beach',
                	state: 'CA',
                	zip: '90277',
                	country: 'US'}, this.callback)
            },
            'should timeout': function(err, response) {
                assert.equal(err.param, 'ETIMEDOUT');
                assert.equal(err.message, 'Request has been aborted because it did not respond within the timeout limit of 1ms.');
            }
        }
    }
}).export(module, {error: false});
