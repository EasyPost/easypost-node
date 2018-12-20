const Easypost = require('@easypost/api');
const api = new Easypost('<YOUR-TEST-PROD-API-KEY>');

const scanForm = new api.ScanForm({
    shipments: ['shp_...'] // you can also pass in a batch id to scan form an entire batch of shipments at once
});

scanForm.save().then(console.log);
