import apiStub from '../helpers/apiStub';
import NotImplementedError from '../../src/errors/notImplemented';
import apiKey from '../../src/resources/apiKey';

describe('ApiKey Resource', () => {
  let ApiKey;
  let key;
  let stub;

  beforeEach(() => {
    stub = apiStub();
    ApiKey = apiKey(stub);
    key = new ApiKey({ id: '1' });
  });

  it('exists', () => {
    expect(apiKey).to.not.be.undefined;
    expect(apiKey).to.be.a('function');
  });

  it('throws on retrieve', () => {
    return ApiKey.retrieve().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on delete', () => {
    return ApiKey.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on instance delete', () => {
    const ApiKey = apiKey(apiStub());
    const instance = new ApiKey({ id: 1 });

    return instance.delete('id').then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on all', () => {
    return ApiKey.all().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on save', () => {
    const cti = new ApiKey();

    return cti.save().then(() => {}, (err) => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  describe('managing shipments', () => {
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

  describe('converting keys', () => {
    let data;

    beforeEach(() => {
      data = { keys: [], id: 1 };
    });

    it('returns a map of key to user id', () => {
      data.keys = [{ a: '1' }];
      expect(ApiKey.convertKeyMap(data)).to.deep.equal([{ ...data.keys[0], user_id: data.id }]);
    });

    it('returns a map of key to user id with children recursively', () => {
      data = {
        id: 1,
        keys: [{ a: '1' }],

        children: [{
          id: 2,
          keys: [{ b: '2' }],

          children: [{
            id: 3,
            keys: [{ c: '3' }],
          }],
        }],
      };

      expect(ApiKey.convertKeyMap(data)).to.deep.equal([
        { ...data.keys[0], user_id: data.id },
        { ...data.children[0].keys[0], user_id: data.children[0].id },
        { ...data.children[0].children[0].keys[0], user_id: data.children[0].children[0].id },
      ]);
    });
  });
});
