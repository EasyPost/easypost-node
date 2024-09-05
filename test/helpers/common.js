import 'core-js/stable';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

/* eslint-disable no-console */
process.on('unhandledRejection', (err) => {
  console.error(err, err.stack);
});

chai.should();
chai.use(chaiAsPromised);
chai.config.truncateThreshold = 0;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
