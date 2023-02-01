import { assert, expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names,jest/no-disabled-tests */
describe('Error Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('pulls out error properties of an API error', async function () {
    await this.client.Shipment.create().catch((error) => {
      expect(error.status).to.equal(422);
      // TODO: `error.message` is useless in this lib and doesn't follow the documented pattern for what this should be
      expect(error.message).to.equal('Status 422 returned from API request to shipments');
      expect(error.detail).to.equal('Missing required parameter.'); // TODO: This should really be error.message
      assert.deepEqual(error.errors[0], { field: 'shipment', message: 'cannot be blank' });
    });
  });
});
