import { expect } from 'chai';

import EasyPostClient from '../../src/easypost';
import {
  MockMiddleware,
  MockRequest,
  MockRequestMatchRule,
  MockRequestResponseInfo,
} from '../helpers/mocking';

/* eslint-disable func-names */
describe('FedExRegistrationService', function () {
  it('registers a billing address', async function () {
    const fedexAccountNumber = '123456789';
    const addressValidation = {
      name: 'BILLING NAME',
      street1: '1234 BILLING STREET',
      city: 'BILLINGCITY',
      state: 'ST',
      postal_code: '12345',
      country_code: 'US',
    };

    const easypostDetails = {
      carrier_account_id: 'ca_123',
    };

    const params = {
      address_validation: addressValidation,
      easypost_details: easypostDetails,
    };

    const mockResponse = {
      email_address: null,
      options: ['SMS', 'CALL', 'INVOICE'],
      phone_number: '***-***-9721',
    };

    const middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('POST', `v2\\/fedex_registrations\\/${fedexAccountNumber}\\/address`),
          new MockRequestResponseInfo(200, mockResponse),
        ),
      ]);
    };

    const client = new EasyPostClient('test_api_key', {
      requestMiddleware: middleware,
    });

    const response = await client.FedExRegistration.registerAddress(fedexAccountNumber, params);

    expect(response.email_address).to.be.null;
    expect(response.options).to.include('SMS');
    expect(response.options).to.include('CALL');
    expect(response.options).to.include('INVOICE');
    expect(response.phone_number).to.equal('***-***-9721');
  });

  it('requests a pin', async function () {
    const fedexAccountNumber = '123456789';

    const mockResponse = {
      message: 'sent secured Pin',
    };

    const middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('POST', `v2\\/fedex_registrations\\/${fedexAccountNumber}\\/pin`),
          new MockRequestResponseInfo(200, mockResponse),
        ),
      ]);
    };

    const client = new EasyPostClient('test_api_key', {
      requestMiddleware: middleware,
    });

    const response = await client.FedExRegistration.requestPin(fedexAccountNumber, 'SMS');

    expect(response.message).to.equal('sent secured Pin');
  });

  it('validates a pin', async function () {
    const fedexAccountNumber = '123456789';
    const pinValidation = {
      pin_code: '123456',
      name: 'BILLING NAME',
    };

    const easypostDetails = {
      carrier_account_id: 'ca_123',
    };

    const params = {
      pin_validation: pinValidation,
      easypost_details: easypostDetails,
    };

    const mockResponse = {
      id: 'ca_123',
      object: 'CarrierAccount',
      type: 'FedexAccount',
      credentials: {
        account_number: '123456789',
        mfa_key: '123456789-XXXXX',
      },
    };

    const middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule(
            'POST',
            `v2\\/fedex_registrations\\/${fedexAccountNumber}\\/pin\\/validate`,
          ),
          new MockRequestResponseInfo(200, mockResponse),
        ),
      ]);
    };

    const client = new EasyPostClient('test_api_key', {
      requestMiddleware: middleware,
    });

    const response = await client.FedExRegistration.validatePin(fedexAccountNumber, params);

    expect(response.id).to.equal('ca_123');
    expect(response.object).to.equal('CarrierAccount');
    expect(response.type).to.equal('FedexAccount');
    expect(response.credentials.account_number).to.equal('123456789');
    expect(response.credentials.mfa_key).to.equal('123456789-XXXXX');
  });

  it('submits details about an invoice', async function () {
    const fedexAccountNumber = '123456789';
    const invoiceValidation = {
      name: 'BILLING NAME',
      invoice_number: 'INV-12345',
      invoice_date: '2025-12-08',
      invoice_amount: '100.00',
      invoice_currency: 'USD',
    };

    const easypostDetails = {
      carrier_account_id: 'ca_123',
    };

    const params = {
      invoice_validation: invoiceValidation,
      easypost_details: easypostDetails,
    };

    const mockResponse = {
      id: 'ca_123',
      object: 'CarrierAccount',
      type: 'FedexAccount',
      credentials: {
        account_number: '123456789',
        mfa_key: '123456789-XXXXX',
      },
    };

    const middleware = (request) => {
      return new MockMiddleware(request, [
        new MockRequest(
          new MockRequestMatchRule('POST', `v2\\/fedex_registrations\\/${fedexAccountNumber}\\/invoice`),
          new MockRequestResponseInfo(200, mockResponse),
        ),
      ]);
    };

    const client = new EasyPostClient('test_api_key', {
      requestMiddleware: middleware,
    });

    const response = await client.FedExRegistration.submitInvoice(fedexAccountNumber, params);

    expect(response.id).to.equal('ca_123');
    expect(response.object).to.equal('CarrierAccount');
    expect(response.type).to.equal('FedexAccount');
    expect(response.credentials.account_number).to.equal('123456789');
    expect(response.credentials.mfa_key).to.equal('123456789-XXXXX');
  });
});
