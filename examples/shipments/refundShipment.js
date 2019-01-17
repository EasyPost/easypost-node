const Easypost = require('@easypost/api');
const api = new Easypost('<YOUR-TEST-PROD-API-KEY>');

api.Shipment.retrieve('shp_...').then(s => {
    s.refund(console.log(s));
}).catch(console.log);
