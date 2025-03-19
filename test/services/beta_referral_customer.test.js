import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';

describe('BetaReferralCustomerService', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    const referralCustomerProdApiKey = process.env.REFERRAL_CUSTOMER_PROD_API_KEY || '123';
    client = new EasyPostClient(referralCustomerProdApiKey);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('add payment method to a referral customer account', async function () {
    await client.BetaReferralCustomer.addPaymentMethod('cus_123', 'ba_123').catch((error) => {
      expect(error.statusCode).to.equal(422);
      expect(error.code).to.equal('BILLING.INVALID_PAYMENT_GATEWAY_REFERENCE');
      expect(error.message).to.equal('Invalid connect integration.');
    });
  });

  it('Refund by amount for a recent payment', async function () {
    await client.BetaReferralCustomer.refundByAmount(2000).catch((error) => {
      expect(error.statusCode).to.equal(422);
      expect(error.code).to.equal('TRANSACTION.AMOUNT_INVALID');
      expect(error.message).to.equal(
        'Refund amount is invalid. Please use a valid amount or escalate to finance.',
      );
    });
  });

  it('Refund a payment by a payment log ID', async function () {
    await client.BetaReferralCustomer.refundByPaymentLog('paylog_...').catch((error) => {
      expect(error.statusCode).to.equal(422);
      expect(error.code).to.equal('TRANSACTION.DOES_NOT_EXIST');
      expect(error.message).to.equal('We could not find a transaction with that id.');
    });
  });

  it('returns a client secret for credit cards', async function () {
    const response = await client.BetaReferralCustomer.createCreditCardClientSecret();

    expect(response.client_secret).to.match(/^seti_/);
  });

  it('returns a client secret for bank accounts', async function () {
    const response = await client.BetaReferralCustomer.createBankAccountClientSecret();

    expect(response.client_secret).to.match(/^fcsess_client_secret_/);
  });
});
