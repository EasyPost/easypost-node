import apiStub from '../helpers/apiStub';

import webhook from '../../src/resources/webhook';

describe('Webhook Resource', () => {
  it('exists', () => {
    expect(webhook).to.not.be.undefined;
    expect(webhook).to.be.a('function');
  });

  it('unwraps array responses', () => {
    const Webhook = webhook(apiStub());
    const data = [new Webhook()];
    expect(Webhook.unwrapAll({ webhooks: data })).to.deep.equal(data);
  });
});
