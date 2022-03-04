const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

// Grab all trackers in date range
api.Tracker.all({
  page_size: 100,
  start_datetime: '2020-03-01T08:50:00Z',
  end_datetime: '2020-03-27T08:50:00Z',
})
  .then(console.log)
  .catch(console.log);
