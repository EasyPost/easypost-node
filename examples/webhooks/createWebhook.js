const Easypost = require('@easypost/api');
const api = new Easypost(process.env.prodkey);

const webhook = new api.Webhook({
    url: 'your full URL or server IP address here'
});

webhook.save().then(console.log);
