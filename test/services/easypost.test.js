import { expect } from 'chai';

import EasyPost, { METHODS } from '../../src/easypost';
import MissingParameterError from '../../src/errors/general/missing_parameter_error';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('EasyPost', function () {
  setupPolly.startPolly();

  it('throws an error when no API key is provided', async function () {
    expect(() => new EasyPost()).to.throw(
      MissingParameterError,
      'Missing required parameter: API Key.',
    );
  });

  it('will log the appropriate values when a request and response hooks are provided', async function () {
    let requestConfig;
    const requestHook = (response) => (requestConfig = response);
    let responseConfig;
    const responseHook = (response) => (responseConfig = response);

    const client = new EasyPost(process.env.EASYPOST_TEST_API_KEY, {
      requestHook,
      responseHook,
    });

    await client.Address.create(Fixture.caAddress1());

    expect(requestConfig).to.be.an('object');
    expect(requestConfig.method).to.equal(METHODS.POST);
    expect(requestConfig.path).to.equal('https://api.easypost.com/v2/addresses');
    expect(requestConfig.requestHeaders).to.be.an('object');
    expect(requestConfig.requestHeaders['Content-Type']).to.equal('application/json');
    expect(requestConfig.requestTimestamp).to.be.a('number');
    expect(requestConfig.requestUUID).to.be.a('string');

    expect(responseConfig).to.be.an('object');
    expect(responseConfig.method).to.equal(METHODS.POST);
    expect(responseConfig.path).to.equal('https://api.easypost.com/v2/addresses');
    expect(responseConfig.requestHeaders).to.be.an('object');
    expect(responseConfig.requestHeaders['Content-Type']).to.equal('application/json');
    expect(responseConfig.requestTimestamp).to.be.a('number');
    expect(responseConfig.requestUUID).to.be.a('string');
    expect(responseConfig.httpStatus).to.be.a('number');
    expect(responseConfig.responseBody).to.be.an('object');
    expect(responseConfig.responseBody.object).to.equal('Address');
    expect(responseConfig.responseHeaders).to.be.an('object');
    expect(responseConfig.responseHeaders['content-type']).to.contain('application/json');
    expect(responseConfig.responseTimestamp).to.be.a('number');
    expect(responseConfig.responseTimestamp).to.be.greaterThanOrEqual(
      responseConfig.requestTimestamp,
    );
  });
});
