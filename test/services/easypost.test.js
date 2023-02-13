import { expect } from 'chai';

import EasyPost from '../../src/easypost';

/* eslint-disable func-names */
describe('EasyPost', function () {
  it('throws an error when no API key is provided', async function () {
    expect(() => new EasyPost()).to.throw(
      Error,
      'No API key supplied. Pass in an API key as the first argument.',
    );
  });
});
