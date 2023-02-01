/* eslint-disable func-names,jest/no-disabled-tests */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import User from '../../src/models/user';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

describe('ReferralCustomer Service', function () {
  setupPolly.startPolly();

  before(function () {
    const partnerUserProdApiKey = process.env.PARTNER_USER_PROD_API_KEY || '123';
    this.referralUserProdApiKey = process.env.REFERRAL_CUSTOMER_PROD_API_KEY || '123';
    this.client = new EasyPost(partnerUserProdApiKey);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a referral user', async function () {
    const referral = await this.client.ReferralCustomer.create({
      name: 'Test Referral',
      email: 'test@example.com',
      phone: '1111111111',
    });

    expect(referral).to.be.an.instanceOf(User);
    expect(referral.id).to.match(/^user_/);
    expect(referral.name).to.equal('Test Referral');
  });

  it('retrieves all referral users', async function () {
    const referrals = await this.client.ReferralCustomer.all({ page_size: Fixture.pageSize() });

    const referralsArray = referrals.referral_customers;

    expect(referralsArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(referrals.has_more).to.exist;
    referralsArray.forEach((referral) => {
      expect(referral).to.be.an.instanceOf(User);
    });
  });

  it('updates a referral user', async function () {
    const referrals = await this.client.ReferralCustomer.all({ page_size: Fixture.pageSize() });
    const singleReferral = referrals.referral_customers[0];

    const testEmail = 'me2@email.com';

    await this.client.ReferralCustomer.updateEmail(singleReferral.id, testEmail).then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });

  it('add a referral user credit card', async function () {
    const creditCardDetails = Fixture.creditCardDetails();

    const paymentMethod = await this.client.ReferralCustomer.addCreditCard(
      this.referralUserProdApiKey,
      creditCardDetails.number,
      creditCardDetails.expiration_month,
      creditCardDetails.expiration_year,
      creditCardDetails.cvc,
    );

    expect(paymentMethod.id).to.match(/^card_/);
    expect(paymentMethod.last4).to.equal('6170');
  });
});
