const EasyPostClient = require('./dist/cjs');

const client = new EasyPostClient.default('fake-api-key');

client.CarrierMetadata.retrieve()
  .then(function () {
    console.error("Request shouldn't have succeeded");
    process.exit(1);
  })
  .catch(function (error) {
    if (error.message.includes('This api key is no longer active')) {
      console.log('seems to be working properly');
      return;
    }

    console.error('wrong error received');
    process.exit(1);
  });
