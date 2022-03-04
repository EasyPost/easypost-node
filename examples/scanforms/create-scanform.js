const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const scanform = new api.ScanForm({
  shipments: ['shp_...'],
});

scanform.save().then(console.log).catch(console.log);
