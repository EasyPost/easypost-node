const Easypost = require('@easypost/api');

const api = new Easypost(process.env.API_KEY);

// Create a list of trackers
const trackingCodes = {
  0: { tracking_code: 'EZ1000000001' },
  1: { tracking_code: 'EZ1000000002' },
  2: { tracking_code: 'EZ1000000003' },
};
api.Tracker.createList(trackingCodes).then(console.log).catch(console.log);
