import { expect } from 'chai';

import EasyPost from '../../src/easypost';
import MissingParameterError from '../../src/exceptions/General/missing_parameter_error';

/* eslint-disable func-names */
describe('EasyPost', function () {
  it('throws an error when no API key is provided', async function () {
    expect(() => new EasyPost()).to.throw(
      MissingParameterError,
      'Missing required parameter: API Key.',
    );
  });
});
