import { expect } from 'vitest';
import { createRequire } from 'module';

const require = createRequire(__filename);

describe('Package export compatibility', function () {
  it('supports CommonJS require', function () {
    const EasyPostClient = require('../' + '..');

    expect(EasyPostClient).to.be.a('function');

    const client = new EasyPostClient('apiKey');
    expect(client).to.be.an('object');
  });

  it('supports ESM import default', async function () {
    const module = await import('../' + '..');
    const EasyPostClient = module.default as any;

    expect(EasyPostClient).to.be.a('function');

    const client = new EasyPostClient('apiKey');
    expect(client).to.be.an('object');
  });
});
