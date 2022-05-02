/* eslint-disable func-names,jest/no-disabled-tests */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/beta/easypost';
import Fixture from '../helpers/fixture';

describe('Referral Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  async function createTestReferral() {
    // Note: this returns API keys in plaintext, so do not record a test using this function
    const referral = await new this.easypost.Referral({
      name: 'Test Referral',
      email: 'me@email.com',
      phone: '1111111111',
    }).save();
    return referral;
  }

  async function retrieveTestReferral() {
    const referrals = await this.easypost.Referral.all({ page_size: Fixture.pageSize() });

    const referralsArray = referrals.referral_customers;

    return referralsArray[0];
  }

  it.skip('creates a referral user', async function () {
    // skip due to exposed API keys
    // E2E test
    const referral = await createTestReferral.call(this);

    expect(referral).to.be.an.instanceOf(this.easypost.Referral);
    expect(referral.id).to.match(/^user_/);
    expect(referral.name).to.equal('Test Referral');
  });

  it('retrieves all referral users', async function () {
    const referrals = await this.easypost.Referral.all({ page_size: Fixture.pageSize() });

    const referralsArray = referrals.referral_customers;

    expect(referralsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(referralsArray.has_more).to.not.be.null;
    referralsArray.forEach((referral) => {
      expect(referral).to.be.an.instanceOf(this.easypost.Referral);
    });
  });

  it('updates a referral user', async function () {
    const referral = await retrieveTestReferral.call(this);

    const testEmail = 'me2@email.com';

    const success = await this.easypost.Referral.updateEmail(referral.id, testEmail);

    expect(success).to.eql(true);
  });

  it.skip('add a referral user credit card', async function () {
    // skip due to exposed API keys, exposed tokens, and fake credit card details
    // E2E test with real data
    // this.timeout(10000); // 10 seconds, since there are multiple API calls

    const referral = await createTestReferral.call(this);

    const referralProdApiKey = referral.api_keys[1].key;

    const creditCardDetails = {
      number: '1234123412341234', // fake credit card number, Stripe will reject if you re-record with this number
      expirationMonth: '04',
      expirationYear: '2028',
      cvv: '015',
    };
    const paymentMethod = await this.easypost.Referral.addCreditCard(
      referralProdApiKey,
      creditCardDetails,
      'primary',
    );

    expect(paymentMethod).to.not.be.null;
    expect(paymentMethod.id).to.match(/^card_/);
    expect(paymentMethod.object).to.equal('CreditCard');
    expect(paymentMethod.last4).to.equal('1234');
  });
});
