/* eslint-disable func-names */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
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
          id: 'pm_123',
          last4: '1234',
          object: 'CreditCard',
        },
        secondary_payment_method: {
          id: 'pm_123',
          bank_name: 'Mock Bank',
          object: 'BankAccount',
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

  it('get payment info', async function () {
    const paymentInfo = await this.client.Billing._getPaymentInfo('primary');

    expect(paymentInfo).to.deep.equal(['credit_cards', 'pm_123']);

    const paymentInfo2 = await this.client.Billing._getPaymentInfo('secondary');

    expect(paymentInfo2).to.deep.equal(['bank_accounts', 'pm_123']);
  });

  it('get payment info with legacy prefix', async function () {
    this.client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY, {
      requestMiddleware: (request) => {
        return new MockMiddleware(request, [
          new MockRequest(
            new MockRequestMatchRule('GET', 'v2\\/payment_methods$'),
            new MockRequestResponseInfo(200, {
              id: 'summary_123',
              primary_payment_method: {
                id: 'card_123',
                last4: '1234',
                // No object field, force use of id prefix to determine type
              },
              secondary_payment_method: {
                id: 'bank_123',
                bank_name: 'Mock Bank',
                // No object field, force use of id prefix to determine type
              },
            }),
          ),
        ]);
      },
    });

    const paymentInfo = await this.client.Billing._getPaymentInfo('primary');

    expect(paymentInfo).to.deep.equal(['credit_cards', 'card_123']);

    const paymentInfo2 = await this.client.Billing._getPaymentInfo('secondary');

    expect(paymentInfo2).to.deep.equal(['bank_accounts', 'bank_123']);
  });
});
