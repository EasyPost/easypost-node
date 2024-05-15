import { expect } from 'chai';

import EasyPost, { METHODS } from '../../out/src/easypost';
import MissingParameterError from '../../out/src/errors/general/missing_parameter_error';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';

/* eslint-disable func-names */
describe('EasyPost', function () {
  setupPolly.startPolly();

  let client;

  before(function () {
    client = new EasyPost(process.env.EASYPOST_TEST_API_KEY);
  });

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

    client.addRequestHook(requestHook);
    client.addResponseHook(responseHook);

    await client.Address.create(Fixture.caAddress1());

    expect(requestConfig).to.be.an('object');
    expect(requestConfig.method).to.equal(METHODS.POST);
    expect(requestConfig.path).to.equal('https://api.easypost.com/v2/addresses');
    expect(requestConfig.headers).to.be.an('object');
    expect(requestConfig.headers['Content-Type']).to.equal('application/json');
    expect(requestConfig.requestTimestamp).to.be.a('number');
    expect(requestConfig.requestUUID).to.be.a('string');

    expect(responseConfig).to.be.an('object');
    expect(responseConfig.method).to.equal(METHODS.POST);
    expect(responseConfig.path).to.equal('https://api.easypost.com/v2/addresses');
    expect(responseConfig.requestTimestamp).to.be.a('number');
    expect(responseConfig.requestUUID).to.be.a('string');
    expect(responseConfig.httpStatus).to.be.a('number');
    expect(responseConfig.responseBody).to.be.an('object');
    expect(responseConfig.responseBody.object).to.equal('Address');
    expect(responseConfig.headers).to.be.an('object');
    expect(responseConfig.headers['content-type']).to.contain('application/json');
    expect(responseConfig.responseTimestamp).to.be.a('number');
    expect(responseConfig.responseTimestamp).to.be.greaterThanOrEqual(
      responseConfig.requestTimestamp,
    );
  });

  it('will add more than one request and response hook', async function () {
    let requestConfig1;
    const requestHook1 = (response) => (requestConfig1 = response);
    let requestConfig2;
    const requestHook2 = (response) => (requestConfig2 = response);
    let responseConfig1;
    const responseHook1 = (response) => (responseConfig1 = response);
    let responseConfig2;
    const responseHook2 = (response) => (responseConfig2 = response);

    client.addRequestHook(requestHook1);
    client.addRequestHook(requestHook2);
    client.addResponseHook(responseHook1);
    client.addResponseHook(responseHook2);

    await client.Address.create(Fixture.caAddress1());

    expect(requestConfig1).to.be.an('object');
    expect(requestConfig2).to.be.an('object');
    expect(responseConfig1).to.be.an('object');
    expect(responseConfig2).to.be.an('object');
  });

  it('will unsubscribe from requests and responses', async function () {
    let requestConfig;
    const requestHook = (response) => (requestConfig = response);
    let responseConfig;
    const responseHook = (response) => (responseConfig = response);

    client.addRequestHook(requestHook);
    client.addResponseHook(responseHook);

    await client.Address.create(Fixture.caAddress1());

    expect(requestConfig).to.be.an('object');
    expect(responseConfig).to.be.an('object');

    client.removeRequestHook(requestHook);
    client.removeResponseHook(responseHook);

    requestConfig = null;
    responseConfig = null;

    await client.Address.create(Fixture.caAddress1());

    expect(requestConfig).to.be.null;
    expect(responseConfig).to.be.null;
  });

  it('will clear all request and response hooks', async function () {
    let requestConfig1;
    const requestHook1 = (response) => (requestConfig1 = response);
    let requestConfig2;
    const requestHook2 = (response) => (requestConfig2 = response);
    let responseConfig1;
    const responseHook1 = (response) => (responseConfig1 = response);
    let responseConfig2;
    const responseHook2 = (response) => (responseConfig2 = response);

    client.addRequestHook(requestHook1);
    client.addRequestHook(requestHook2);
    client.addResponseHook(responseHook1);
    client.addResponseHook(responseHook2);

    await client.Address.create(Fixture.caAddress1());

    expect(requestConfig1).to.be.an('object');
    expect(requestConfig2).to.be.an('object');
    expect(responseConfig1).to.be.an('object');
    expect(responseConfig2).to.be.an('object');

    client.clearRequestHooks();
    client.clearResponseHooks();

    requestConfig1 = null;
    requestConfig2 = null;
    responseConfig1 = null;
    responseConfig2 = null;

    await client.Address.create(Fixture.caAddress1());

    expect(requestConfig1).to.be.null;
    expect(requestConfig2).to.be.null;
    expect(responseConfig1).to.be.null;
    expect(responseConfig2).to.be.null;
  });
});
