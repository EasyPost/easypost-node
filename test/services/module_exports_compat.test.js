import { expect } from 'chai';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

describe('Package export compatibility', function () {
  it('supports CommonJS require', function () {
    const EasyPostClient = require('../..');

    expect(EasyPostClient).to.be.a('function');

    const client = new EasyPostClient('apiKey');
    expect(client).to.be.an('object');
  });

  it('supports ESM import default', async function () {
    const module = await import('../..');
    const EasyPostClient = module.default;

    expect(EasyPostClient).to.be.a('function');

    const client = new EasyPostClient('apiKey');
    expect(client).to.be.an('object');
  });
});
