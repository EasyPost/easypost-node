# EasyPost Node Client Library

## This branch (v3) is a work in progress and should be considered very unstable.

EasyPost is a simple shipping API. You can sign up for an account at https://easypost.com

[![CircleCI](https://circleci.com/gh/EasyPost/easypost-web.svg?style=svg&circle-token=6f1cef70e775021a0e45c9c8bc367943927e9bba)](https://circleci.com/gh/EasyPost/easypost-web)

Installation
---------------

```
npm install node-easypost
```

Example
------------------

```javascript
const apiKey = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';
const EasyPost = require('node-easypost');

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

Note: if you are using `es6`, you can use `import "node-easypost/easypost"` to
avoid loading regenerator-runtime twice. We plan on supporting a node6+ version
at some point as well for native generator support.
