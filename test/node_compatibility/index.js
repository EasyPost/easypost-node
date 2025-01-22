const EasyPostClient = require('../../dist/easypost');

const test = async () => {
  const client = new EasyPostClient('apiKey');

  if (!client.baseUrl.match(/^https:\/\/api\.easypost\.com/gm)) {
    process.exit(1);
  }
};

test();
