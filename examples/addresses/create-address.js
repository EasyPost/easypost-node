const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const address = new api.Address({
  verify: ['delivery'],
  street1: '417 montgomery streat',
  city: 'SAN FRANCISCO',
  state: 'CA',
  zip: '94104',
  country: 'US',
  company: 'EasyPost',
  phone: '415-123-4567',
});

address.save().then(console.log).catch(console.log);
