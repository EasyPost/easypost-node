import { assert, expect } from 'chai';

import EasyPost from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names,jest/no-disabled-tests */
describe('Error Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('pulls out error properties of an API error', async function () {
    await new this.easypost.Shipment().save().catch((error) => {
      expect(error.status).to.equal(422);
      // TODO: `error.message` is useless in this lib and doesn't follow the documented pattern for what this should be
      expect(error.message).to.equal('Status 422 returned from API request to shipments');
      expect(error.detail).to.equal('Missing required parameter.'); // TODO: This should really be error.message
      assert.deepEqual(error.errors[0], { field: 'shipment', message: 'cannot be blank' });
    });
  });
});
