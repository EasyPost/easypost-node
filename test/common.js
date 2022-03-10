/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/stable';
import chai from 'chai';

process.on('unhandledRejection', (err) => {
  console.error(err, err.stack);
});

chai.should();

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;
