/* eslint-disable func-names */
import {expect} from 'chai';

import EasyPost from '../../src/easypost';
import * as setupPolly from '../helpers/setup_polly';
import {MockMiddleware, MockRequest, MockRequestMatchRule, MockRequestResponseInfo} from "../helpers/mocking";


const middleware = (request) => {
    return new MockMiddleware(request, [
        new MockRequest(
            new MockRequestMatchRule('POST', 'v2\\/bank_accounts\\/\\S*\\/charges$'),
            new MockRequestResponseInfo(200, {})
        ),
        new MockRequest(
            new MockRequestMatchRule('POST', 'v2\\/credit_cards\\/\\S*\\/charges$'),
            new MockRequestResponseInfo(200, {})
        ),
        new MockRequest(
            new MockRequestMatchRule('DELETE', 'v2\\/bank_accounts\\/\\S*$'),
            new MockRequestResponseInfo(200, {})
        ),
        new MockRequest(
            new MockRequestMatchRule('DELETE', 'v2\\/credit_cards\\/\\S*$'),
            new MockRequestResponseInfo(200, {})
        ),
        new MockRequest(
            new MockRequestMatchRule('GET', 'v2\\/payment_methods$'),
            new MockRequestResponseInfo(200, {
                "id": "summary_123",
                "primary_payment_method": {
                    "id": "card_123",
                    "last4": "1234",
                },
                "secondary_payment_method": {
                    "id": "bank_123",
                    "bank_name": "Mock Bank",
                }
            })
        )
    ]);
}

describe('Billing Resource', function () {
    setupPolly.startPolly();

    before(function () {
        this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
    });

    beforeEach(function () {
        const {server} = this.polly;
        setupPolly.setupCassette(server);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it('fund a wallet', async function () {
        this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY, {requestMiddleware: middleware});

        // Skipping due to the lack of an available real payment method in tests
        const fund = await this.easypost.Billing.fundWallet('2000', 'primary');

        expect(fund).to.equal(true);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it('delete a payment method', async function () {
        this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY, {requestMiddleware: middleware});

        // Skipping due to the lack of an available real payment method in tests
        const deletedPaymentMethod = await this.easypost.Billing.deletePaymentMethod('primary');

        expect(deletedPaymentMethod).to.equal(true);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it('retrieves all payment methods', async function () {
        this.easypost = new EasyPost(process.env.EASYPOST_TEST_API_KEY, {requestMiddleware: middleware});

        // Skipping due to the lack of an available real payment method in tests
        const paymentMethods = await this.easypost.Billing.retrievePaymentMethods();

        expect(paymentMethods.primary_payment_method).to.exist;
        expect(paymentMethods.secondary_payment_method).to.exist;
    });
});
