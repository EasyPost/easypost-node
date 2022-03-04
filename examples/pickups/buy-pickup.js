const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Pickup.retrieve('pickup_...').then((p) => {
  p.buy('USPS', 'NextDay').catch(console.error);
});
