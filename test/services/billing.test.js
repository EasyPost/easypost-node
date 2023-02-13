/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import {
  MockMiddleware,
  MockRequest,
  MockRequestMatchRule,
  MockRequestResponseInfo,
} from '../helpers/mocking';

const middleware = (request) => {
  return new MockMiddleware(request, [
    new MockRequest(
      new MockRequestMatchRule('POST', 'v2\\/bank_accounts\\/\\S*\\/charges$'),
      new MockRequestResponseInfo(200, {}),
    ),
    new MockRequest(
      new MockRequestMatchRule('POST', 'v2\\/credit_cards\\/\\S*\\/charges$'),
      new MockRequestResponseInfo(200, {}),
    ),
    new MockRequest(
      new MockRequestMatchRule('DELETE', 'v2\\/bank_accounts\\/\\S*$'),
      new MockRequestResponseInfo(200, {}),
    ),
    new MockRequest(
      new MockRequestMatchRule('DELETE', 'v2\\/credit_cards\\/\\S*$'),
      new MockRequestResponseInfo(200, {}),
    ),
    new MockRequest(
      new MockRequestMatchRule('GET', 'v2\\/payment_methods$'),
      new MockRequestResponseInfo(200, {
        id: 'summary_123',
        primary_payment_method: {
          id: 'card_123',
          last4: '1234',
        },
        secondary_payment_method: {
          id: 'bank_123',
          bank_name: 'Mock Bank',
        },
      }),
    ),
  ]);
};

describe('Billing Service', function () {
  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY, {
      requestMiddleware: middleware,
    });
  });

  it('fund a wallet', async function () {
    expect(async () => {
      await this.client.Billing.fundWallet('2000', 'primary');
    }).not.to.throw();
  });

  it('delete a payment method', async function () {
    expect(async () => {
      await this.client.Billing.deletePaymentMethod('primary');
    }).not.to.throw();
  });

  it('retrieves all payment methods', async function () {
    const paymentMethods = await this.client.Billing.retrievePaymentMethods();

    expect(paymentMethods.primary_payment_method).to.exist;
    expect(paymentMethods.secondary_payment_method).to.exist;
  });

  it('throws on create', function () {
    return this.client.Billing.create().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on retrieve', function () {
    return this.client.Billing.retrieve().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on all', function () {
    return this.client.Billing.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
