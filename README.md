# EasyPost Node Client Library

[![CI](https://github.com/EasyPost/easypost-node/workflows/CI/badge.svg)](https://github.com/EasyPost/easypost-node/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/%40easypost%2Fapi.svg)](https://badge.fury.io/js/%40easypost%2Fapi)

EasyPost, the simple shipping solution. You can sign up for an account at https://easypost.com.

This client library is intended to be used in a backend Node service and not in a frontend Javascript project via the browser.

## Install

```bash
npm install --save @easypost/api
```

**NOTE:** If you are using @easypost/api prior to v5 and a version of Node less than 6.9, you will need to install and include a polyfill, such as `babel-polyfill`, and include it in your project:

```bash
npm install --save babel-polyfill
```

```javascript
// Require the polyfill if necessary:
require('babel-polyfill');

// Require the EasyPost library:
const EasyPost = require('@easypost/api');
```

You can alternatively download the various built assets from this project's [releases page](https://github.com/EasyPost/easypost-node/releases).

### Compatability

By default, @easypost/api (prior to v5) works with Node v6 LTS. To include for other versions of node, you can use:

- `require('@easypost/api/easypost.8-lts.js')` (Node 8.9+)
- `require('@easypost/api/easypost.6-lts.js')` (Node 6.9+)
- `require('@easypost/api/easypost.legacy.js')` (Node 0.10+)

If using @easypost/api v5 or later, you can simply require the base project which is built on Node v10+

### Note on ES6 Usage

You can import specific versions of the compiled code if you're using later versions of Node and using @easypost/api prior to v5.

```javascript
// Imports the un-transformed es6
import '@easypost/api/src/easypost';

// Use the following to import mininally transformed versions
import '@easypost/api/easypost.6-lts';
import '@easypost/api/easypost.8-lts';
import '@easypost/api/easypost.legacy.js'; // (v0.10)
```

## Usage

A simple create & buy shipment example:

```javascript
const EasyPost = require('@easypost/api');

const api = new EasyPost(process.env.EASYPOST_API_KEY);

const shipment = new api.Shipment({
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
  to_address: {
    name: 'Dr. Steve Brule',
    street1: '179 N Harbor Dr',
    city: 'Redondo Beach',
    state: 'CA',
    zip: '90277',
    country: 'US',
    phone: '4155559999',
  },
  parcel: {
    length: 8,
    width: 5,
    height: 5,
    weight: 5,
  },
});

shipment.save().then((s) => s.buy(shipment.lowestRate()).then(console.log).catch(console.log));
```

### Options

You can construct an API instance with certain options:

```javascript
const api = new Api('mykey', {
  timeout: 120000,
  baseUrl: 'https://api.easypost.com/v2/',
  useProxy: false,
  superagentMiddleware: (s) => s,
  requestMiddleware: (r) => r,
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

const api = new Api('my-key', {
  superagentMiddleware: (s) => superagentLib(s),
});
```

#### requestMiddleware

Function that takes a superagent `request` and returns that request. Useful if
you need to hook into a request:

```javascript
import superagentLib from 'some-superagent-lib';

const api = new Api('my-key', {
  requestMiddleware: (r) => {
    r.someLibFunction(SOME_CONFIG_VALUE);
    return r;
  },
});
```

### Interactive CLI

Replace `easypost.js` with whatever compatabile version you wish, as defined under `Compatibility`.

```bash
API_KEY=yourkey ./repl.js --local easypost.js
```

## Documentation

API Documentation can be found at: https://easypost.com/docs/api.

Upgrading major versions of this project? Refer to the [Upgrade Guide](UPGRADE_GUIDE.md).

## Development

```bash
# Install dependencies
npm install

# Build the client library
npm run build

# Run tests (these will be transpiled on the fly)
EASYPOST_TEST_API_KEY=123... EASYPOST_PROD_API_KEY=123... npm test

# Run tests with coverage (these will be transpiled on the fly)
EASYPOST_TEST_API_KEY=123... EASYPOST_PROD_API_KEY=123... npm coverage

# Lint the project
npm run lint

# Format with Prettier
npm run format
```

### Testing

The test suite in this project was specifically built to produce consistent results on every run, regardless of when they run or who is running them. This project uses [Pollyjs](https://github.com/Netflix/pollyjs) (AKA: VCR) to record and replay HTTP requests and responses via "cassettes". When the suite is run, the HTTP requests and responses for each test function will be saved to a cassette if they do not exist already and replayed from this saved file if they do, which saves the need to make live API calls on every test run.

If you make an addition to this project, the request/response will get recorded automatically for you. When making changes to this project, you'll need to re-record the associated cassette to force a new live API call for that test which will then record the request/response used on the next run.

The test suite has been populated with various helpful fixtures that are available for use, each completely independent from a particular user **with the exception of the USPS carrier account ID** which has a fallback value to our internal testing user's ID. If you are a non-EasyPost employee and are re-recording cassettes, you may need to provide the `USPS_CARRIER_ACCOUNT_ID` environment variable with the ID associated with your USPS account (which will be associated with your API keys in use) for tests that use this fixture.

**Note on dates:** Some fixtures use hard-coded dates that may need to be incremented if cassettes get re-recorded (such as reports or pickups).
