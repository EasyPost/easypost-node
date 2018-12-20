require('@easypost/api/easypost.8-lts.js');

const apiKey = '<YOUR-TEST-PROD-API-KEY>';
const EasyPost = require('@easypost/api');

const api = new EasyPost(apiKey);

const toAddress = new api.Address(
    {
        name: 'TEST TEST',
        street1: '14000 NW 67th St.',
        street2: null,
        city: 'Seattle',
        state: 'WA',
        zip: '98107',
        country: "US",
        // residential: false, // some carriers may have different rates if they know the address is residential
        // verify: ["delivery", "zip4"] // optional address verification
    }
);

toAddress.save().then(console.log).catch(console.log);
