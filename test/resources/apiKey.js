import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';
import apiKey from '../../src/resources/apiKey';

describe('ApiKey Resource', () => {
  it('exists', () => {
    expect(apiKey).to.not.be.undefined;
    expect(apiKey).to.be.a('function');
  });

  it('throws on retrieve', () => {
    const ApiKey = apiKey(apiStub());
    ApiKey.retrieve().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    const ApiKey = apiKey(apiStub());
    ApiKey.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', () => {
    const ApiKey = apiKey(apiStub());
    const cti = new ApiKey();

    cti.save().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });
});
