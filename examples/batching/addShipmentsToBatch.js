const Easypost = require('@easypost/api');
const api = '<YOUR-TEST-PROD-API-KEY>';
require('@easypost/api/easypost.8-lts.js');

const batch = api.Batch.retrieve('batch_...');

/* Batch will return whether or not the batch operation was
 * created - not the shipments itself. You will need to
 * listen to a webhook event to confirm once the shipments
 * are associated. */
batch.addShipments(['shp_..., shp_...']).then(console.log);