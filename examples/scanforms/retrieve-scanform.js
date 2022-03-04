const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.ScanForm.retrieve('sf_...').then(console.log).catch(console.log);
