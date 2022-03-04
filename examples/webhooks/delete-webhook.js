const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Webhook.delete('hook_...').then(console.log).catch(console.log);
