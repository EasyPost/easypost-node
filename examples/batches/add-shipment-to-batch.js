const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const batch = api.Batch.retrieve('batch_...');
batch.addShipments(['shp_...', 'shp_...']).then(console.log).catch(console.log);
