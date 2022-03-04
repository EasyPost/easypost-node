const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.ApiKey.all().then(console.log).catch(console.log);
