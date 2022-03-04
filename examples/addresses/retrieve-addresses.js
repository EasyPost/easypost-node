const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const addresses = api.Address.all();
addresses.then(console.log).catch(console.log);
