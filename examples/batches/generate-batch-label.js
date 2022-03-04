const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Batch.retrieve('batch_...')
  .then((b) => {
    b.generateLabel('ZPL').then(console.log).catch(console.log);
  })
  .catch(console.log);
