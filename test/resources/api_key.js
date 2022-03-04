import apiStub from '../helpers/api_stub';
import NotImplementedError from '../../src/errors/not_implemented';
import apiKey from '../../src/resources/api_key';


describe('ApiKey Resource', () => {
  let ApiKey;
  let stub;

  beforeEach(() => {
    stub = apiStub();
    ApiKey = apiKey(stub);
  });

  it('exists', () => {
    expect(apiKey).to.not.be.undefined;
    expect(apiKey).to.be.a('function');
  });

  it('throws on delete', () => ApiKey.delete('id').then(() => { }, err => {
    expect(err).to.be.an.instanceOf(NotImplementedError);
  }));

  it('throws on instance delete', () => {
    const instance = new ApiKey({ id: 1 });

    return instance.delete('id').then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
    });
  });

  it('throws on all', () => ApiKey.all().then(() => { }, err => {
    expect(err).to.be.an.instanceOf(NotImplementedError);
  }));

  it('throws on save', () => {
    const cti = new ApiKey();

    return cti.save().then(() => { }, err => {
      expect(err).to.be.an.instanceOf(NotImplementedError);
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
