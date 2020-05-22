const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const carrier = api.CarrierAccount.retrieve('ca_...');
carrier.delete().then(console.log).catch(console.log);
