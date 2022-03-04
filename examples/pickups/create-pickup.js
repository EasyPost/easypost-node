const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const address = 'adr_...';
const shipment = 'shp_...';

const pickup = new api.Pickup({
  address,
  shipment,
  reference: 'my-first-pickup',
  min_datetime: '2020-05-21 10:30:00',
  max_datetime: '2020-05-22 10:30:00',
  is_account_address: false,
  instructions: 'Special pickup instructions',
  carrier_accounts: 'ca_...',
});

pickup.save().then(console.log).catch(console.log);
