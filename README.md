# EasyPost Node Client Library

EasyPost is a simple shipping API. You can sign up for an account at https://easypost.com

Installation
---------------

```
npm install node-easypost
```

Example
------------------

```javascript
var apiKey = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';
var easypost = require('node-easypost')(apiKey);

// set addresses
var toAddress = {
    name: "Sawyer Bateman",
    street1: "1A Larkspur Cres.",
    city: "St. Albert",
    state: "AB",
    zip: "t8n2m4",
    country: "CA",
    phone: "780-123-4567"
};
var fromAddress = {
    name: "EasyPost",
    street1: "164 Townsend St",
    street2: "#1",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    phone: "415-123-4567"
};

// verify address
easypost.Address.create(fromAddress, function(err, fromAddress) {
    fromAddress.verify(function(err, response) {
        if (err) {
            console.log('Address is invalid.');
        } else if (response.message !== undefined && response.message !== null) {
            console.log('Address is valid but has an issue: ', response.message);
            var verifiedAddress = response.address;
        } else {
            var verifiedAddress = response;
        }
    });
});

// set parcel
easypost.Parcel.create({
    predefined_package: "InvalidPackageName",
    weight: 21.2
}, function(err, response) {
    console.log(err);
});

var parcel = {
    length: 10.2,
    width: 7.8,
    height: 4.3,
    weight: 21.2
};

// create customs_info form for intl shipping
var customsItem = {
    description: "EasyPost t-shirts",
    hs_tariff_number: 123456,
    origin_country: "US",
    quantity: 2,
    value: 96.27,
    weight: 21.1
};

var customsInfo = {
    customs_certify: 1,
    customs_signer: "Hector Hammerfall",
    contents_type: "gift",
    contents_explanation: "",
    eel_pfc: "NOEEI 30.37(a)",
    non_delivery_option: "return",
    restriction_type: "none",
    restriction_comments: "",
    customs_items: [customsItem]
};

// create shipment
easypost.Shipment.create({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
    customs_info: customsInfo
}, function(err, shipment) {
    // buy postage label with one of the rate objects
    shipment.buy({rate: shipment.lowestRate(['USPS', 'ups'])}, function(err, shipment) {
        console.log(shipment.tracking_code);
        console.log(shipment.postage_label.label_url);
    });
});
```

Documentation
--------------------

Up-to-date documentation at: https://www.easypost.com/docs

Tests
--------------------

```
npm test
```
