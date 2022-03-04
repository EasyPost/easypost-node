const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

api.ScanForm.all({
  page_size: 2,
  start_datetime: '2020-03-01T08:50:00Z',
})
  .then(console.log)
  .catch(console.log);
