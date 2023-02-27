import EasyPost from '@easypost/api';

// This file is intended to demo how you could use the EasyPost Typescript definitions.
(async () => {
  const client = new EasyPost(process.env.EASYPOST_TEST_API_KEY);

  const customs = await client.CustomsInfo.retrieve('cstinfo_...');

  console.log(customs);
})();
