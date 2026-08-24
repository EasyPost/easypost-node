import EasyPostClient from '@easypost/api';

// This file is intended to demo how you could use the EasyPost Typescript definitions.
(async () => {
  const client = new EasyPostClient(process.env.EASYPOST_TEST_API_KEY || '');

  const customsInfo = await client.CustomsInfo.retrieve('cstinfo_...');

  console.log(customsInfo);
})();
