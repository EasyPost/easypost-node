require('dotenv').config()
const Easypost = require('@easypost/api');
const api = new Easypost(process.env.testkey);

api.Shipment.retrieve('shp_90f1b68882d34118b20837f81bb8a7f8').then(s => {
    s.buy('rate_5dcec376eec14f22a64220d6cbb87ec8').then(console.log);
});