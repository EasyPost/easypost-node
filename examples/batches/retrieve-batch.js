const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Batch.retrieve('batch_...').then(console.log).catch(console.log);
