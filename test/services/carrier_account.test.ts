/* eslint-disable no-param-reassign */
import { expect } from 'vitest';

import Constants from '../../src/constants';
import EasyPostClient from '../../src/easypost';
import ApiError from '../../src/errors/api/api_error';
import CarrierAccount from '../../src/models/carrier_account';
import type CarrierAccountServiceFactory from '../../src/services/carrier_account_service';
import Fixture from '../helpers/fixture';
import * as setupPolly from '../helpers/setup_polly';
import { withoutParams } from '../helpers/utils';

type CarrierAccountTestCreateInput = Parameters<ReturnType<typeof CarrierAccountServiceFactory>['create']>[0];

function flattenCustomCarrierRouteMapping() {
  return Object.entries(Constants.CARRIER_ACCOUNT_CREATE_ENDPOINT_TYPES).flatMap(([endpoint, carrierAccountTypes]) =>
    carrierAccountTypes.map((carrierAccountType) => [carrierAccountType, endpoint] as const),
  );
}

function carrierCreatePayloadForEndpoint(endpoint: string): Record<string, unknown> {
  if (endpoint === 'carrier_accounts/open' || endpoint === 'carrier_accounts/register') {
    return { registration_data: {} };
  }

  return {};
}

/* eslint-disable func-names */
describe('CarrierAccount Service', function () {
  const getPolly = setupPolly.setupPollyTests();
  let client: EasyPostClient;

  beforeAll(function () {
    client = new EasyPostClient(process.env.EASYPOST_PROD_API_KEY);
  });

  beforeEach(function () {
    const { server } = getPolly();
    setupPolly.setupCassette(server);
  });

  it('creates a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );

    expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(carrierAccount.id).to.match(/^ca_/);
    expect(carrierAccount.type).to.equal('DhlEcsAccount');

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await client.CarrierAccount.delete(carrierAccount.id);
  });

  for (const [carrierAccountType, expectedEndpoint] of flattenCustomCarrierRouteMapping()) {
    it(`routes create URL correctly for ${carrierAccountType}`, async function () {
      const payload = {
        type: carrierAccountType,
        ...carrierCreatePayloadForEndpoint(expectedEndpoint),
      };
      const capturedRequest: { path?: string; requestBody?: unknown } = {};

      const captureRequestHook = ({ path, requestBody }: { path: string; requestBody: unknown }) => {
        if (!capturedRequest.path && path.includes('/carrier_accounts')) {
          capturedRequest.path = path;
          capturedRequest.requestBody = requestBody;
        }
      };

      client.addRequestHook(captureRequestHook);
      try {
        const carrierAccount = await client.CarrierAccount.create(payload);
        expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
        expect(carrierAccount.id).to.match(/^ca_/);
        await client.CarrierAccount.delete(carrierAccount.id);
      } catch (error: unknown) {
        expect(error).to.be.an.instanceOf(ApiError);
        expect((error as ApiError).statusCode).to.not.be.oneOf([404, 500]);
      } finally {
        client.removeRequestHook(captureRequestHook);
      }

      expect(capturedRequest.path).to.include(`/${expectedEndpoint}`);
      const requestBody = capturedRequest.requestBody as Record<string, unknown>;
      if (expectedEndpoint === 'carrier_accounts/register_oauth') {
        expect(requestBody).to.have.property('carrier_account_oauth_registrations');
      } else {
        expect(requestBody).to.have.property('carrier_account');
      }
    });
  }

  it('retrieves a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );
    const retrievedCarrierAccount = await client.CarrierAccount.retrieve(carrierAccount.id);

    expect(retrievedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(withoutParams(retrievedCarrierAccount)).to.deep.include(withoutParams(carrierAccount));

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('retrieves all carrier accounts', async function () {
    const carrierAccounts = await client.CarrierAccount.all();

    carrierAccounts.forEach((carrierAccount: any) => {
      expect(carrierAccount).to.be.an.instanceOf(CarrierAccount);
    });
  });

  it('updates a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );

    const testDescription = 'My custom description';
    const updateParams = {
      description: testDescription,
    };

    await client.CarrierAccount.update(carrierAccount.id, updateParams);

    const updatedCarrierAccount = await client.CarrierAccount.retrieve(carrierAccount.id);

    expect(updatedCarrierAccount).to.be.an.instanceOf(CarrierAccount);
    expect(updatedCarrierAccount.id).to.match(/^ca_/);
    expect(updatedCarrierAccount.description).to.equal(testDescription);

    // Remove the carrier account once we have tested it so we don't pollute the account with test accounts
    await client.CarrierAccount.delete(carrierAccount.id);
  });

  it('deletes a carrier account', async function () {
    const carrierAccount = await client.CarrierAccount.create(
      Fixture.basicCarrierAccount() as CarrierAccountTestCreateInput,
    );

    await client.CarrierAccount.delete(carrierAccount.id).then(
      expect(function (result: any) {
        result.not.to.throw();
      }),
    );
  });
});
