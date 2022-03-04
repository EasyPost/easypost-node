const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Webhook.retrieve('hook_...')
  .then((wh) => {
    wh.save().then(console.log).catch(console.log);
  })
  .catch(console.log);
