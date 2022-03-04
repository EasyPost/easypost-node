const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.Order.retrieve('order_...')
  .then((order) => {
    order.buy('FEDEX', 'INTERNATIONAL_FIRST').then(console.log).catch(console.error);
  })
  .catch(console.log);
