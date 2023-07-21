# EasyPost Node Client Library

[![CI](https://github.com/EasyPost/easypost-node/workflows/CI/badge.svg)](https://github.com/EasyPost/easypost-node/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/EasyPost/easypost-node/badge.svg?branch=master)](https://coveralls.io/github/EasyPost/easypost-node?branch=master)
[![npm version](https://badge.fury.io/js/%40easypost%2Fapi.svg)](https://badge.fury.io/js/%40easypost%2Fapi)

EasyPost, the simple shipping solution. You can sign up for an account at <https://easypost.com>.

NOTE: This library is intended to be used in a backend Node service and not in a frontend Javascript project via the browser.

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

### Compatibility

#### v4 and Earlier

- `require('@easypost/api/easypost.8-lts.js')` (Node 8.9+)
- `require('@easypost/api/easypost.6-lts.js')` (Node 6.9+)
- `require('@easypost/api/easypost.legacy.js')` (Node 0.10+)

#### v5

If using @easypost/api v5, you can require the base project which is built on Node v10 - v16

#### v6

If using @easypost/api v6, you can require the base project which is built on Node v12+

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
const EasyPostClient = require('@easypost/api');

const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

const shipment = await client.Shipment.create({
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

const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate());

console.log(boughtShipment);
```

### Options

You can construct an API instance with certain options:

```javascript
const client = new EasyPostClient(process.env.EASYPOST_API_KEY, {
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

const client = new EasyPostClient('my-key', {
  superagentMiddleware: (s) => superagentLib(s),
});
```

#### requestMiddleware

Function that takes a superagent `request` and returns that request. Useful if
you need to hook into a request:

```javascript
import superagentLib from 'some-superagent-lib';

const client = new EasyPostClient('my-key', {
  requestMiddleware: (r) => {
    r.someLibFunction(SOME_CONFIG_VALUE);
    return r;
  },
});
```

### Interactive CLI

Replace `easypost.js` with whatever compatible version you wish, as defined under `Compatibility`.

```bash
API_KEY=yourkey ./repl.js --local easypost.js
```

### HTTP Hooks

If you would need or want to view what requests are being made to the EasyPost API behind the scenes, you can provide functions to listen for the request and/or responses. This can be done with helper functions on the created client.

```javascript
const client = new EasyPostClient('my-key');

const logOutgoingRequest = (request) => console.log("Outgoing:", request);
const logResponse = (response) => console.log("Response:", response)

// optionally add your hook to listen for outgoing requests
client.addRequestHook(logOutgoingRequest);
// and optionally the hook for the response
client.addResponseHook(logResponse)

// ...do other stuff

// remove that request hook
client.removeRequestHook(logOutgoingRequest);
// and the response one
client.removeResponseHook(logResponse);
// or clear all the hooks at once
client.clearRequestHooks();
client.clearResponseHooks();
```

**Note:** You cannot edit or otherwise affect the requests using these hooks. They are purely for debugging or logging purposes.

## Documentation

API documentation can be found at: <https://easypost.com/docs/api>.

Library documentation can be found on the web at: <https://easypost.github.io/easypost-node/> or by building them locally via the `make docs` command.

Upgrading major versions of this project? Refer to the [Upgrade Guide](UPGRADE_GUIDE.md).

## Support

New features and bug fixes are released on the latest major release of this library. If you are on an older major release of this library, we recommend upgrading to the most recent release to take advantage of new features, bug fixes, and security patches. Older versions of this library will continue to work and be available as long as the API version they are tied to remains active; however, they will not receive updates and are considered EOL.

For additional support, see our [org-wide support policy](https://github.com/EasyPost/.github/blob/main/SUPPORT.md).

## Development

```bash
# Install dependencies
make install

# Install style guides (Unix only)
make install-styleguide

# Update dependencies
make update

# Build the project
make build

# Lint the project
make lint
make lint-fix

# Run tests (these will be transpiled on the fly)
EASYPOST_TEST_API_KEY=123... EASYPOST_PROD_API_KEY=123... make test
EASYPOST_TEST_API_KEY=123... EASYPOST_PROD_API_KEY=123... make coverage

# Run security analysis
make scan

# Generate library documentation
make docs

# Update submodules
make update-examples-submodule
```

### Typescript Definitions

Starting with `v5.3.0`, this project has Typescript definitions included.

#### Typescript Exclusions

- We do not provide a DefinitelyTyped version of these definitions at this time
- Predefined packages (see [Carrier Metadata](https://www.easypost.com/docs/api#carrier-metadata) in our docs for more details)
- Carrier service levels (see [Carrier Metadata](https://www.easypost.com/docs/api#carrier-metadata) in our docs for more details)
- Carrier list (see [Carrier Types](https://www.easypost.com/docs/api#carrier-types) in our docs for more details)

### Testing

The test suite in this project was specifically built to produce consistent results on every run, regardless of when they run or who is running them. This project uses [Pollyjs](https://github.com/Netflix/pollyjs) (AKA: VCR) to record and replay HTTP requests and responses via "cassettes". When the suite is run, the HTTP requests and responses for each test function will be saved to a cassette if they do not exist already and replayed from this saved file if they do, which saves the need to make live API calls on every test run. If you receive errors about a cassette expiring, delete and re-record the cassette to ensure the data is up-to-date.

**Sensitive Data:** We've made every attempt to include scrubbers for sensitive data when recording cassettes so that PII or sensitive info does not persist in version control; however, please ensure when recording or re-recording cassettes that prior to committing your changes, no PII or sensitive information gets persisted by inspecting the cassette.

**Making Changes:** If you make an addition to this project, the request/response will get recorded automatically for you. When making changes to this project, you'll need to re-record the associated cassette to force a new live API call for that test which will then record the request/response used on the next run.

**Test Data:** The test suite has been populated with various helpful fixtures that are available for use, each completely independent from a particular user **with the exception of the USPS carrier account ID** (see [Unit Test API Keys](#unit-test-api-keys) for more information) which has a fallback value of our internal testing user's ID. Some fixtures use hard-coded dates that may need to be incremented if cassettes get re-recorded (such as reports or pickups).

#### Unit Test API Keys

The following are required on every test run:

- `EASYPOST_TEST_API_KEY`
- `EASYPOST_PROD_API_KEY`

Some tests may require an EasyPost user with a particular set of enabled features such as a `Partner` user when creating referrals. We have attempted to call out these functions in their respective docstrings. The following are required when you need to re-record cassettes for applicable tests:

- `USPS_CARRIER_ACCOUNT_ID` (eg: one-call buying a shipment for non-EasyPost employees)
- `PARTNER_USER_PROD_API_KEY` (eg: creating a referral user)
- `REFERRAL_CUSTOMER_PROD_API_KEY` (eg: adding a credit card to a referral user)
