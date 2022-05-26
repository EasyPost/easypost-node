/* eslint-disable func-names,jest/no-disabled-tests */
import { expect } from 'chai';
import * as setupPolly from '../../helpers/setup_polly';
import EasyPost from '../../../src/beta/easypost';
import Fixture from '../../helpers/fixture';

describe('Referral Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
    this.referralUserProdApiKey = process.env.REFERRAL_USER_PROD_API_KEY || '123';
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
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

  it('add a referral user credit card', async function () {
    const paymentMethod = await this.easypost.Referral.addCreditCard(
      this.referralUserProdApiKey,
      Fixture.creditCardDetails.number,
      Fixture.creditCardDetails.expirationMonth,
      Fixture.creditCardDetails.expirationYear,
      Fixture.creditCardDetails.cvv,
    );

    expect(paymentMethod.id).to.match(/^card_/);
    expect(paymentMethod.last4).to.equal('6170');
  });
});
