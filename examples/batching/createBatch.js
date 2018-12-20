require('@easypost/api/easypost.8-lts.js');

const EasyPost = require('@easypost/api');
const apiKey = '<YOUR-TEST-PROD-API-KEY>';
const api = new EasyPost(apiKey);

batch = new api.Batch({
    /* Shipments and other batch child objects can either be
     * an array instances or an array of ids. */
    shipments: ['shp_..']
});

batch.save().then(console.log);