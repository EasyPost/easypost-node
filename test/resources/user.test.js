/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../helpers/setup_polly';
import EasyPost from '../../src/easypost';
import NotImplementedError from '../../src/errors/not_implemented';

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

  // TODO: Skipped because VCR cannot match the cassette properly
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('updates a user', async function () {
    const testName = 'Test User';

    return this.easypost.User.retrieveMe().then(async (user) => {
      // eslint-disable-next-line no-param-reassign
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

    const deletedUser = await user.delete();

    expect(deletedUser).to.be.an.instanceOf(this.easypost.User);
  });

  it("updates the authenticated user's brand", async function () {
    const user = await this.easypost.User.retrieveMe();

    const color = '#123456';

    const brand = await user.updateBrand({
      color,
    });

    // TODO: This response isn't deserializing to an instance of Brand
    // expect(brand).to.be.an.instanceOf(this.easypost.Brand);
    expect(brand.id).to.match(/^brd_/);
    expect(brand.color).to.equal(color);
  });

  it('throws on all', function () {
    return this.easypost.User.all().catch((err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
