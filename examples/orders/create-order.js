const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const toAddress = 'adr_...';
const fromAddress = 'adr_...';

const order = new api.Order({
  to_address: toAddress,
  from_address: fromAddress,
  shipments: [
    new api.Shipment({
      parcel: {
        predefined_package: 'FedExBox',
        weight: 10.2,
      },
    }),
    new api.Shipment({
      parcel: {
        predefined_package: 'FedExBox',
        weight: 17.5,
      },
    }),
  ],
});

order.save().then(console.log);
