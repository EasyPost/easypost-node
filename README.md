# EasyPost Node Client Library

EasyPost is a simple shipping API. You can sign up for an account at https://easypost.com.

[![CI](https://github.com/EasyPost/easypost-node/workflows/CI/badge.svg)](https://github.com/EasyPost/easypost-node/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/%40easypost%2Fapi.svg)](https://badge.fury.io/js/%40easypost%2Fapi)

## Installation

```bash
npm install --save @easypost/api
```

**Note:** if you are using a version of Node less than 6.9, you will need to install and
include a polyfill, such as `babel-polyfill`, and include it in your project:

```bash
npm install --save babel-polyfill
```

In your file:

```javascript
require('babel-polyfill');
const EasyPost = require('@easypost/api');
```

You can alternatively download the various built assets from this project's [releases page](https://github.com/EasyPost/easypost-node/releases).

## Compatability

By default, @easypost/api works with Node v6 LTS. To include for other versions
of node, you can use:

* `require('@easypost/api/easypost.8-lts.js')` (Node 8.9+)
* `require('@easypost/api/easypost.6-lts.js')` (Node 6.9+)
* `require('@easypost/api/easypost.legacy.js')` (Node 0.10+)

## Example

```javascript
const EasyPost = require('@easypost/api');

const api = new EasyPost('API_KEY');

const shipment = new api.Shipment({
  to_address: {
    name: 'Dr. Steve Brule',
    street1: '179 N Harbor Dr',
    city: 'Redondo Beach',
    state: 'CA',
    zip: '90277',
    country: 'US',
    phone: '4155559999',
  },
  from_address: {
    street1: '417 MONTGOMERY ST',
    street2: 'FLOOR 5',
    city: 'SAN FRANCISCO',
    state: 'CA',
    zip: '94104',
    country: 'US',
    company: 'EasyPost',
    phone: '415-123-4567',
  },
  parcel: {
    length: 8,
    width: 5,
    height: 5,
    weight: 5
  },
  customs_info: {
    eel_pfc: 'NOEEI 30.37(a)',
    customs_certify: true,
    customs_signer: 'Steve Brule',
    contents_type: 'merchandise',
    contents_explanation: '',
    restriction_type: 'none',
    restriction_comments: '',
    non_delivery_option: 'abandon',
    declaration: 'Here is a bunch of information...',

    customs_items: [
      new api.CustomsItem({
        'description': 'Sweet shirts 1',
        'quantity': 2,
        'weight': 11,
        'value': 23,
        'hs_tariff_number': '654321',
        'origin_country': 'US',
        'code': '123'
      }),
    ]
  }
});

shipment.save().then(s => s.buy(shipment.lowestRate()).then(console.log).catch(console.log))
```

### Options

You can construct an API instance with certain options:

```javascript
const api = new Api("mykey", {
  timeout: 120000,
  baseUrl: "https://api.easypost.com/v2/",
  useProxy: false,
  superagentMiddleware: s => s,
  requestMiddleware: r => r,
});
```

#### timeout

Time in milliseconds that should fail requests.

#### baseUrl

Change the base URL that the API library uses. Useful if you proxy requests
from a frontend through a server.

#### useProxy

Disable using the API key. Useful if you proxy requests from a frontend through
a server.

#### superagentMiddleware

Function that takes `superagent` and returns `superagent`. Useful if you need
to wrap superagent in a function, such as many superagent libraries do.

```javascript
import superagentLib from 'some-superagent-lib';

const api = new Api("my-key", {
  superagentMiddleware: s => superagentLib(s),
});
```

#### requestMiddleware

Function that takes a superagent `request` and returns that request. Useful if
you need to hook into a request:

```javascript
import superagentLib from 'some-superagent-lib';

const api = new Api("my-key", {
  requestMiddleware: r => {
    r.someLibFunction(SOME_CONFIG_VALUE);
    return r;
  },
});
```

## Development

To test out the API, you can run the following:

```bash
npm install -g @easypost/api
easypost
```

### Install Dependencies

```bash
npm install
```

### Build

Build the various versions of the client library by running the following:

```bash
npm run build
```

### Testing

Run unit tests by running the following:

```bash
npm test
```

### Interactive CLI

Replace `easypost.js` with whatever compatabile version you wish, as defined
under `Compatibility`.

```bash
API_KEY=yourkey ./repl.js --local easypost.js
```

## Releasing

1. Update the version in the `package.json` file
1. Update the `CHANGELOG` file
1. Tag the release on GitHub
1. Upload the built assets from `npm run build` to the new GitHub release (eg: `easypost.js`, `easypost.6-lts.js`, etc)
1. Publish the npm package with `npm publish` (this will build the project and run tests as a part of the process)

## Note on ES6 Usage

You can import specific versions of the compiled code if you're using later
versions of Node. 

```javascript
// Imports the un-transformed es6
import "@easypost/api/src/easypost"

// Use the following to import mininally transformed versions
import "@easypost/api/easypost.6-lts"
import "@easypost/api/easypost.8-lts"
import "@easypost/api/easypost.legacy.js" // (v0.10)
```
