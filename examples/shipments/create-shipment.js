const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

/* Either objects or ids can be passed in. If the object does
 * not have an id, it will be created. */

const toAddress = new api.Address({});
const fromAddress = new api.Address({});
const parcel = new api.Parcel({});
const customsInfo = new api.CustomsInfo({});

const shipment = new api.Shipment({
  to_address: toAddress,
  from_address: fromAddress,
  parcel: parcel,
  customs_info: customsInfo,
});

shipment.save().then(console.log);
