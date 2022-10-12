/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';

describe('Billing Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('fund a wallet', async function () {
    // Skipping due to the lack of an available real payment method in tests
    const fund = await this.easypost.Billing.fundWallet('2000', 'primary');

    expect(fund).to.equal(true);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('delete a payment method', async function () {
    // Skipping due to the lack of an available real payment method in tests
    const deletedPaymentMethod = await this.easypost.Billing.deletePaymentMethod('primary');

    expect(deletedPaymentMethod).to.equal(true);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('retrieves all payment methods', async function () {
    // Skipping due to the lack of an available real payment method in tests
    const paymentMethods = await this.easypost.Billing.retrievePaymentMethods();

    expect(paymentMethods.primary_payment_method).to.exist;
    expect(paymentMethods.secondary_payment_method).to.exist;
  });
});
