/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';

describe('Referral Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY, { baseUrl: "https://api.easypost.com/beta/" });
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  // TODO: Skip unit test once confirmed that this function works
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('creates a referral user', async function () {
    // This endpoint returns the referral user keys in plain text, do not run this test.
    const referral = await new this.easypost.Referral({
      name: 'Test Referral',
    }).save();

    expect(referral).to.be.an.instanceOf(this.easypost.Referral);
    expect(referral.id).to.match(/^user_/);
    expect(referral.name).to.equal('Test Referral');
  });

  it('updates a referral user', async function () {
    const referral = await new this.easypost.Referral({
      name: 'Test Referral',
    }).save();

    const testPhone = '5555555555';

    referral.phone_number = testPhone;
    await referral.save();

    expect(referral).to.be.an.instanceOf(this.easypost.Referral);
    expect(referral.id).to.match(/^user_/);
    expect(referral.phone_number).to.equal(testPhone);
  });

  it('throws on retrieve', async function () {
    return this.easypost.Referral.retrieve("something", "something2").catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on retrieveMe', async function () {
    return this.easypost.Referral.retrieveMe().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on all', function () {
    return this.easypost.Referral.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  // TODO: Failing because creating a referral user is not yet working
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('throws on updateBrand', async function () {
    const referral = await new this.easypost.Referral({
      name: 'Test Referral',
    }).save();

    return referral.updateBrand({ color: "#123456" }).catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
