//This example is specifically created around the 'please manifest or void' emails that some EasyPost users get when they
// have an unmanifested shipments. Often times the user only has the tracking number for the shipments that they need to manifest,
// but in order to manifest you need to pass in the shipment ID number, so here we are going to retrieve shipments using the
// tracking number and console.log tracking numbers with their associated shipment ID 
const Easypost = require('@easypost/api');
const api = new Easypost('<YOUR-TEST-PROD-API-KEY>'); // or your EasyPost API key would go here in quotes

api.Shipment.retrieve('1234...').then(function (response) {
    console.log(response.tracker.tracking_code, response.tracker.shipment_id);// if you want the entire response just console.log(response)
})

