const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

const parcel = new api.Parcel({
  length: 20.2,
  width: 10.9,
  height: 5,
  weight: 65.9,
});

parcel.save().then(console.log);
