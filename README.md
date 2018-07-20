# EasyPost Node Client Library

EasyPost is a simple shipping API. You can sign up for an account at https://easypost.com

[![Build Status](https://travis-ci.org/EasyPost/easypost-node.svg?branch=master)](https://travis-ci.org/EasyPost/easypost-node)

Installation
------------

```
npm install --save @easypost/api
```

Note: if you are using a version of Node less than 6.9, you will need to install and
include a polyfill, such as `babel-polyfill`, and include it in your project:

```
npm install --save babel-polyfill
```

In your file:

```
require('babel-polyfill');
const EasyPost = require('@easypost/api');
```

To test out the API, you can run `npm install -g @easypost/api` and run
`easypost`.  you can also clone this repository, `npm install` to install
dependencies, `npm run build` to build the project, and run
`API_KEY=yourkey ./repl.js --local easypost.js` to try out an interactive CLI.
(Replace easypost.js with whatever compatabile version you wish, as defined
below.)

Compatability
-------------

By default, @easypost/api works with Node v6 LTS. To include for other versions
of node, you can use:

* `require('@easypost/api/easypost.8-lts.js')` (Node 8.9+
* `require('@easypost/api/easypost.6-lts.js')` (Node 6.9+)
* `require('@easypost/api/easypost.legacy.js')` (Node 0.10+)

Example
-------

```javascript
const apiKey = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';
const EasyPost = require('@easypost/api');

const api = new EasyPost(apiKey);

// set addresses
const toAddress = new api.Address({
  name: 'Dr. Steve Brule',
  street1: '179 N Harbor Dr',
  city: 'Redondo Beach',
  state: 'CA',
  zip: '90277',
  country: 'US',
  phone: '310-808-5243'
});

const fromAddress = new api.Address({
  name: 'EasyPost',
  street1: '118 2nd Street',
  street2: '4th Floor',
  city: 'San Francisco',
  state: 'CA',
  zip: '94105',
  phone: '415-123-4567'
});

/* es5 with promises: */
fromAddress.save().then(addr => {
  console.log(addr.id);
});

/* es2017 with async/await: */
await fromAddress.save();
console.log(fromAddress.id);
```

Options
-------

You can construct an API instance with certain options:

```
const api = new Api("mykey", {
  timeout: 120000,
  baseUrl: "https://api.easypost.com/v2/",
  useProxy: false,
  superagentMiddleware: s => s,
  requestMiddleware: r => r,
});
```

#### timeout

Time in MS that should fail requests.

#### baseUrl

Change the base URL that the API library uses. Useful if you proxy requests
from a frontend through a server.

#### useProxy

Disable using the API key. Useful if you proxy requests from a frontend through
a server.


#### superagentMiddleware

Function that takes `superagent` and returns `superagent`. Useful if you need
to wrap superagent in a function, such as many superagent libraries do.

```
import superagentLib from 'some-superagent-lib';

const api = new Api("my-key", {
  superagentMiddleware: s => superagentLib(s),
});
```


#### requestMiddleware

Function that takes a superagent `request` and returns that request. Useful if
you need to hook into a request:

```
import superagentLib from 'some-superagent-lib';

const api = new Api("my-key", {
  requestMiddleware: r => {
    r.someLibFunction(SOME_CONFIG_VALUE);
    return r;
  },
});
```


Note on ES6 Usage
-----------------

You can import specific versions of the compiled code if you're using later
verisons of node. `import "@easypost/api/src/easypost"` imports the
un-transformed es6, or you can import `@easypost/api/easypost.6-lts`,
`@easypost/api/easypost.8-lts`, or `@easypost/api/easypost.legacy.js` (v0.10)
to import mininally transformed versions.
