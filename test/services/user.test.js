/* eslint-disable no-param-reassign */
import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import Brand from '../../src/models/brand';
import User from '../../src/models/user';
import * as setupPolly from '../helpers/setup_polly';
import Fixture from '../helpers/fixture';
import EndOfPaginationError from '../../src/errors/general/end_of_pagination_error';

/* eslint-disable func-names */
describe('User Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a child user', async function () {
    const user = await client.User.create({
      name: 'Test User',
    });

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.match(/^user_/);
    expect(user.name).to.equal('Test User');

    await client.User.delete(user.id);
  });

  it('retrieves a user', async function () {
    const authenticatedUser = await client.User.retrieveMe();

    const user = await client.User.retrieve(authenticatedUser.id);

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.match(/^user_/);
  });

  it('retrieves the authenticated user', async function () {
    const user = await client.User.retrieveMe();

    expect(user).to.be.an.instanceOf(User);
    expect(user.id).to.match(/^user_/);
  });

  it('updates a user', async function () {
    const testName = 'Test User';

    return client.User.retrieveMe().then(async (user) => {
      const params = {};
      params.name = testName;
      const updatedUser = await client.User.update(user.id, params);

      expect(updatedUser).to.be.an.instanceOf(User);
      expect(updatedUser.id).to.match(/^user_/);
      expect(updatedUser.name).to.equal(testName);
    });
  });

  it('deletes a user', async function () {
    const user = await client.User.create({
      name: 'Test User',
    });

    await client.User.delete(user.id).then(
      expect(function (result) {
        result.not.to.throw();
      }),
    );
  });

  it("updates the authenticated user's brand", async function () {
    const user = await client.User.retrieveMe();

    const color = '#123456';

    const brand = await client.User.updateBrand(user.id, { color });

    expect(brand).to.be.an.instanceOf(Brand);
    expect(brand.id).to.match(/^brd_/);
    expect(brand.color).to.equal(color);
  });

  it('retrieves a paginated list of children', async function () {
    const response = await client.User.allChildren({ page_size: Fixture.pageSize() });

    const childrenArray = response.children;

    expect(childrenArray.length).to.be.lessThanOrEqual(Fixture.pageSize());
    expect(response.has_more).to.exist;
    childrenArray.forEach((children) => {
      expect(children).to.be.an.instanceOf(User);
    });
  });

  it('retrieves next page of children', async function () {
    try {
      const children = await client.User.allChildren({ page_size: Fixture.pageSize() });
      const nextPage = await client.User.getNextPage(children, Fixture.pageSize());

      const firstIdOfFirstPage = children.children[0].id;
      const firstIdOfSecondPage = nextPage.children[0].id;

      expect(firstIdOfFirstPage).to.not.equal(firstIdOfSecondPage);
    } catch (error) {
      if (!(error instanceof EndOfPaginationError)) {
        throw new Error('Test failed intentionally');
      }
    }
  });
});
