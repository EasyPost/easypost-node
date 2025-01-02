const EasyPostClient = require('../..');

const test = async () => {
  const client = new EasyPostClient('apiKey');

  if (!client.baseUrl.match(/^(http|https):\/\/api.easypost.com/gm)) {
    process.exit(1);
  }
};

test();
