/* eslint-disable no-param-reassign */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Brand from '../../src/models/brand';
import User from '../../src/models/user';
import * as setupPolly from '../helpers/setup_polly';
import FilteringError from '../../src/errors/general/filtering_error';

/* eslint-disable func-names */
describe('User Service', function () {
  setupPolly.startPolly();

  before(function () {
    this.client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = this.polly;
    setupPolly.setupCassette(server);
  });

  it('creates a child user', async function () {
    const user = await this.client.User.create({
      name: 'Test User',
    });

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.match(/^user_/);
    expect(user.name).to.equal('Test User');

    await this.client.User.delete(user.id);
  });

  it('retrieves a user', async function () {
    const authenticatedUser = await this.client.User.retrieveMe();

    const user = await this.client.User.retrieve(authenticatedUser.id);

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.match(/^user_/);
  });

  it('retrieves the authenticated user', async function () {
    const user = await this.client.User.retrieveMe();

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.match(/^user_/);
  });

  it('updates a user', async function () {
    const testName = 'Test User';

    return this.client.User.retrieveMe().then(async (user) => {
      const params = {};
      params.name = testName;
      const updatedUser = await this.client.User.update(user.id, params);

      expect(updatedUser).to.be.an.instanceOf(User);
      expect(updatedUser.id).to.match(/^user_/);
      expect(updatedUser.name).to.equal(testName);
    });
  });

  it('deletes a user', async function () {
    const user = await this.client.User.create({
      name: 'Test User',
    });

    await this.client.User.delete(user.id).then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });

  it("updates the authenticated user's brand", async function () {
    const user = await this.client.User.retrieveMe();

    const color = '#123456';

    const brand = await this.client.User.updateBrand(user.id, { color });

    expect(brand).to.be.an.instanceOf(Brand);
    expect(brand.id).to.match(/^brd_/);
    expect(brand.color).to.equal(color);
  });

  it("retrieves parent user's API keys", async function () {
    const user = await this.client.User.retrieveMe();
    const keys = await this.client.User.apiKeys(user.id);

    expect(keys).to.be.an.instanceOf(Array);
  });

  it("throws FilteringError when trying to retrieve child user's API keys", async function () {
    const fakeChildId = 'user_blah';

    try {
      await this.client.User.apiKeys(fakeChildId);
      throw new Error('Test did not throw the expected error.');
    } catch (error) {
      expect(error).to.be.an.instanceOf(FilteringError, 'No child found.');
    }
  });
});
