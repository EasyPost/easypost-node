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

  it('deletes', () => {
    const Webhook = webhook(apiStub());
    const id = 1;
    return Webhook.delete(id);
  });

  it('deletes an instance', () => {
    const Webhook = webhook(apiStub());
    const instance = new Webhook({ id: 1 });
    return instance.delete();
  });
});
