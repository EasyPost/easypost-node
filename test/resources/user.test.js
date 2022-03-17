/* eslint-disable func-names */
import { expect } from 'chai';
import * as setupPolly from '../setup_polly';
import EasyPost from '../../src/easypost';
import Fixture from '../helpers/fixture';
import NotImplementedError from '../../src/errors/not_implemented';

describe('User Resource', function () {
  setupPolly.startPolly();

  before(function () {
    this.easypost = new EasyPost(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.stripCreds(server);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('creates a child user', async function () {
    // This endpoint returns the child user keys in plain text, do not run this test.
    const user = await new this.easypost.User({
      name: 'Test User',
    }).save();

    expect(user).to.be.an.instanceOf(this.easypost.User);
    expect(user.id).to.match(/^user_/);
    expect(user.name).to.equal('Test User');
  });

  it('retrieves a child user', async function () {
    const user = await this.easypost.User.retrieve(Fixture.childUserId());

    expect(user).to.be.an.instanceOf(this.easypost.User);
    expect(user.id).to.match(/^user_/);
  });

  it('retrieves the authenticated user', async function () {
    const user = await this.easypost.User.retrieveMe();

    expect(user).to.be.an.instanceOf(this.easypost.User);
    expect(user.id).to.match(/^user_/);
  });

  it('updates a user', async function () {
    const user = await this.easypost.User.retrieveMe();

    const testPhone = '5555555555';

    user.phone_number = testPhone;
    await user.save();

    expect(user).to.be.an.instanceOf(this.easypost.User);
    expect(user.id).to.match(/^user_/);
    expect(user.phone_number).to.equal(testPhone);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('deletes a user', async function () {
    // Due to our inability to create child users securely, we must also skip deleting them as we cannot replace the deleted ones easily.
    const user = await this.easypost.User.retrieve('usr_123');

    user.delete();
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
