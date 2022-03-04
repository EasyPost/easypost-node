const Easypost = require('@easypost/api');

const api = new Easypost(process.env.EASYPOST_PROD_API_KEY);

// Setup timeframe for each report (Must be less than 31 days between start/end)
const startDate = '2019-08-01';
const endDate = '2019-08-24';

// Create Payment Log Report
const paymentLogReport = new api.Report({
  type: 'payment_log',
  start_date: startDate,
  end_date: endDate,
});
paymentLogReport.save().then(console.log).catch(console.log);

// Create Refund Report
const refundReport = new api.Report({
  type: 'refund',
  start_date: startDate,
  end_date: endDate,
});
refundReport.save().then(console.log).catch(console.log);

// Create Shipment Report
const shipmentReport = new api.Report({
  type: 'shipment',
  start_date: startDate,
  end_date: endDate,
});
shipmentReport.save().then(console.log).catch(console.log);

// Create Tracker Report
const trackerReport = new api.Report({
  type: 'tracker',
  start_date: startDate,
  end_date: endDate,
});
trackerReport.save().then(console.log).catch(console.log);

// Create Shipment Invoice Report
const shipmentInvoiceReport = new api.Report({
  type: 'shipment_invoice',
  start_date: startDate,
  end_date: endDate,
});
shipmentInvoiceReport.save().then(console.log).catch(console.log);
