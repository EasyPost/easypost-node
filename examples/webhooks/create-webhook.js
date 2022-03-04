const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const webhook = new api.Webhook({ url: 'https://example.com`' });
webhook.save().then(console.log);
