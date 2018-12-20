const Easypost = require('@easypost/api');
const api = new Easypost('<YOUR-TEST-PROD-API-KEY>');

api.Webhook.all().then(console.log);