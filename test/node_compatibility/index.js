const dotenv = require('dotenv');

dotenv.config();

const EasyPostClient = require('../..');

const test = async () => {
  const apiKey = process.env.EASYPOST_TEST_API_KEY;
  const client = new EasyPostClient(apiKey);

  if (!client.baseUrl.includes('easypost.com')) {
    process.exit(1);
  }
};

test();
