/* eslint-disable no-param-reassign */
import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('User Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a child user', async function () {
    const user = await new this.easypost.User({
      name: 'Test User',
    }).save();

    expect(user).to.be.an.instanceOf(this.easypost.User);
    expect(user.id).to.match(/^user_/);
    expect(user.name).to.equal('Test User');

    await user.delete();
  });

  it('retrieves a user', async function () {
    const authenticatedUser = await this.easypost.User.retrieveMe();

    const user = await this.easypost.User.retrieve(authenticatedUser.id);

    expect(user).to.be.an.instanceOf(this.easypost.User);
    expect(user.id).to.match(/^user_/);
  });

  it('retrieves the authenticated user', async function () {
    const user = await this.easypost.User.retrieveMe();

    expect(user).to.be.an.instanceOf(this.easypost.User);
    expect(user.id).to.match(/^user_/);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('updates a user', async function () {
    // TODO: Skipped because VCR cannot match the cassette properly due
    // to how this library wraps params on PATCH requests, it's sending
    // all the params regardless of only passing in one (eg: name) which
    // is throwing various errors such as `recharge_amount` or `email` validation.
    const testName = 'Test User';

    return this.easypost.User.retrieveMe().then(async (user) => {
      user.name = testName;
      await user.save();

      expect(user).to.be.an.instanceOf(this.easypost.User);
      expect(user.id).to.match(/^user_/);
      expect(user.name).to.equal(testName);
    });
  });

  it('deletes a user', async function () {
    const user = await new this.easypost.User({
      name: 'Test User',
    }).save();

    await user.delete().then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });

  it("updates the authenticated user's brand", async function () {
    const user = await this.easypost.User.retrieveMe();

    const color = '#123456';

    const brand = await user.updateBrand({
      color,
    });

    expect(brand).to.be.an.instanceOf(this.easypost.Brand);
    expect(brand.id).to.match(/^brd_/);
    expect(brand.color).to.equal(color);
  });

  it('throws on all', function () {
    return this.easypost.User.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
