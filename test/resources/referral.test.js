/* eslint-disable func-names,jest/no-disabled-tests */
import { expect } from 'chai';

import EasyPost from '../../src/beta/easypost';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('Referral Resource', function () {
  setupPolly.startPolly();

  before(function () {
    const partnerUserProdApiKey = process.env.PARTNER_USER_PROD_API_KEY || '123';
    this.referralUserProdApiKey = process.env.REFERRAL_USER_PROD_API_KEY || '123';
    this.easypost = new EasyPost(partnerUserProdApiKey);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a referral user', async function () {
    const referral = await new this.easypost.Referral({
      name: 'Test Referral',
      email: 'test@example.com',
      phone: '1111111111',
    }).save();

    expect(referral).to.be.an.instanceOf(this.easypost.Referral);
    expect(referral.id).to.match(/^user_/);
    expect(referral.name).to.equal('Test Referral');
  });

  it('retrieves all referral users', async function () {
    const referrals = await this.easypost.Referral.all({ page_size: Fixture.pageSize() });

    const referralsArray = referrals.referral_customers;

    expect(referralsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(referrals.has_more).to.not.be.undefined;
    referralsArray.forEach((referral) => {
      expect(referral).to.be.an.instanceOf(this.easypost.Referral);
    });
  });

  it('updates a referral user', async function () {
    const referrals = await this.easypost.Referral.all({ page_size: Fixture.pageSize() });
    const singleReferral = referrals.referral_customers[0];

    const testEmail = 'me2@email.com';

    const success = await this.easypost.Referral.updateEmail(singleReferral.id, testEmail);

    expect(success).to.eql(true);
  });

  // Skpping because Pollyjs doesn't know what to do with the form encoded data
  it.skip('add a referral user credit card', async function () {
    // TODO: Add support to scrub CC details from the request URL
    const paymentMethod = await this.easypost.Referral.addCreditCard(
      this.referralUserProdApiKey,
      Fixture.creditCardDetails.number,
      Fixture.creditCardDetails.expirationMonth,
      Fixture.creditCardDetails.expirationYear,
      Fixture.creditCardDetails.cvc,
    );

    expect(paymentMethod.id).to.match(/^card_/);
    expect(paymentMethod.last4).to.equal('6170');
  });
});
