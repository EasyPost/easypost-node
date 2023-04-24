/* eslint-disable func-names,jest/no-disabled-tests */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';

describe('BetaReferralCustomerService', function () {
  setupPolly.startPolly();

  before(function () {
    this.referralCustomerProdApiKey = process.env.REFERRAL_CUSTOMER_PROD_API_KEY || '123';
    this.client = new EasyPostClient(this.referralCustomerProdApiKey);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('add payment method to a referral customer account', async function () {
    await this.client.BetaReferralCustomer.addPaymentMethod('cus_123', 'ba_123').catch((error) => {
      expect(error.statusCode).to.equal(422);
      expect(error.code).to.equal('BILLING.INVALID_PAYMENT_GATEWAY_REFERENCE');
      expect(error.message).to.equal('Invalid Payment Gateway Reference.');
    });
  });

  it('Refund by amount for a recent payment', async function () {
    await this.client.BetaReferralCustomer.refundByAmount(2000).catch((error) => {
      expect(error.statusCode).to.equal(422);
      expect(error.code).to.equal('TRANSACTION.AMOUNT_INVALID');
      expect(error.message).to.equal(
        'Refund amount is invalid. Please use a valid amount or escalate to finance.',
      );
    });
  });

  it('Refund a payment by a payment log ID', async function () {
    await this.client.BetaReferralCustomer.refundByPaymentLog('paylog_...').catch((error) => {
      expect(error.statusCode).to.equal(422);
      expect(error.code).to.equal('TRANSACTION.DOES_NOT_EXIST');
      expect(error.message).to.equal('We could not find a transaction with that id.');
    });
  });
});
