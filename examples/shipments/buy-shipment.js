const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Shipment.retrieve('shp_...')
  .then((s) => {
    s.buy(s.lowestRate()).then(console.log).catch(console.log);
    // s.buy('rate_...').then(console.log).catch(console.log);
  })
  .catch(console.log);
