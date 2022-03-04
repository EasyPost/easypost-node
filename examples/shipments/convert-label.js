const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Shipment.retrieve('shp_...')
  .then((shipment) => {
    shipment.convertLabelFormat('ZPL').then(console.log).catch(console.log);
  })
  .catch(console.log);
