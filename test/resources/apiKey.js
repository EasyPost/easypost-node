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

  describe('managing shipments', () => {
    let ApiKey;
    let key;
    let stub;

    beforeEach(() => {
      stub = apiStub();
      ApiKey = apiKey(stub);
      key = new ApiKey({ id: '1' });
    });

    describe('disabling a key', () => {
      it('throws if disable is called and key does not have an id', () => {
        key = new ApiKey();
        expect(() => key.disable()).to.throw(/requires id/);
      });

      it('calls api.post when disable is called and key has an id', () => {
        key.disable();
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith('api_keys/1/disable');
      });
    });

    describe('enabling a key', () => {
      it('throws if enable is called and key does not have an id', () => {
        key = new ApiKey();
        expect(() => key.enable()).to.throw(/requires id/);
      });

      it('calls api.post when enable is called and key has an id', () => {
        key.enable();
        expect(stub.post).to.have.been.called;
        expect(stub.post).to.have.been.calledWith('api_keys/1/enable');
      });
    });
  });
});
