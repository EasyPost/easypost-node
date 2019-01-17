require('dotenv').config()
const Easypost = require('@easypost/api');
const api = new Easypost(process.env.testkey);

api.Shipment.retrieve('shp_...').then(s => {
    s.buy('rate_...').then(console.log);
});
