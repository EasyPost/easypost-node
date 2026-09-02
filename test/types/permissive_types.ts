import EasyPostClient from '../../src/easypost';

const client = new EasyPostClient('api-key', {
  requestMiddleware: (request: any) => request,
});

client.addRequestHook((config: { requestBody: unknown }) => {
  const body: unknown = config.requestBody;
  void body;
});

client.addResponseHook((config: { responseBody: unknown }) => {
  const body: unknown = config.responseBody;
  void body;
});

const permissivePayload: Record<string, unknown> = {
  shipment: {
    to_address: {
      city: 'Austin',
      state: 'TX',
      zip: '73301',
      country: 'US',
      custom_provider_field: true,
    },
  },
  custom_top_level_field: {
    source: 'type-test',
  },
};

client.makeApiCall('post', '/shipments', permissivePayload);
