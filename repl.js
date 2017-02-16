#!/usr/bin/env node

'use strict';

require('source-map-support').install();
require('babel-polyfill');

const repl = require('repl');

process.on('unhandledRejection', (err) => {
  console.log(err, err.stack);
});


const packageInfo = require('./package.json');

console.log(`Starting ${packageInfo.name} v${packageInfo.version} repl`);
console.log('Enter `help()` for information.');

const API = require('./index');

let api;

if (process.env.API_KEY) {
  api = new API(process.env.API_KEY);
} else {
  console.log([
    'Create an instance by using `api = new API(apikey)`, or restart',
    'the repl with an API_KEY environment variable.',
  ].join(' '));
}

const local = repl.start('$> ');

function help () {
  const helpText = [
    'To try out the API, use the available instance of `api` to make requests.',
    'For example, try writing: `api.Address.all();`',
    'Sample data is also available: toAddress, fromAddress.',
  ].join(' ');

  console.log(helpText);
}

local.context.toAddress = {
  name: 'Dr. Steve Brule',
  street1: '179 N Harbor Dr',
  city: 'Redondo Beach',
  state: 'CA',
  zip: '90277',
  country: 'US',
  phone: '310-808-5243',
};

local.context.fromAddress = {
  name: 'EasyPost',
  street1: '118 2nd Street',
  street2: '4th Floor',
  city: 'San Francisco',
  state: 'CA',
  zip: '94105',
  phone: '415-123-4567',
};

local.context.badAddress = {
  verify: ['delivery'],
  street1: 'UNDELIVERABLE ST',
  city: 'SAN FRANCISCO',
  state: 'CA',
  zip: '94104',
  country: 'US',
  company: 'EasyPost',
  phone: '415-123-4567',
};

local.context.API = API;
local.context.api = api;
local.context.help = help;
